import { useState, useEffect } from 'react';
import API from '../../services/api';
import ProductCard from '../../components/customer/ProductCard';
import { getUserId } from '../../utils/auth';

// ASSUMPTION — NOT YET CONFIRMED WITH BACKEND:
// GET  /api/items            -> list of catalog items
// POST /api/orders           -> { user_id, items: [{ item_id, quantity }] }
// These follow the same REST pattern as the confirmed /api/providers endpoint,
// but the backend team has not confirmed these route names or response shapes.
// If they differ, only the two request calls below need to change.

export default function ShopPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');

  const [balance, setBalance] = useState(null);
  const [cart, setCart] = useState([]); // [{ item_id, name, price, quantity, stock }]

  const [checkoutError, setCheckoutError] = useState('');
  const [checkoutSuccess, setCheckoutSuccess] = useState('');
  const [checkingOut, setCheckingOut] = useState(false);

  const userId = getUserId();

  const loadCatalog = async () => {
    setLoading(true);
    setLoadError('');
    try {
      const res = await API.get('/items');
      setItems(Array.isArray(res.data) ? res.data : res.data?.items || []);
    } catch (err) {
      // Do NOT fabricate catalog data — show the real failure instead.
      setLoadError(
        err.response?.status === 404
          ? "Catalog endpoint (/api/items) doesn't exist yet on the backend — confirm the route name with the backend team."
          : err.message || 'Could not load catalog.'
      );
    } finally {
      setLoading(false);
    }
  };

  const loadBalance = async () => {
    try {
      const res = await API.get(`/balance/${userId}`);
      if (res.data?.balance !== undefined) setBalance(Number(res.data.balance));
    } catch {
      setBalance(null); // unknown balance — checkout button will require confirmation instead of blocking blindly
    }
  };

  useEffect(() => {
    loadCatalog();
    loadBalance();
  }, []);

  const cartTotal = cart.reduce((sum, c) => sum + c.price * c.quantity, 0);

  const addToCart = (item) => {
    if (item.stock === 0) return; // guard: out of stock
    setCart((prev) => {
      const existing = prev.find((c) => c.item_id === item.id);
      if (existing) {
        if (existing.quantity >= item.stock) return prev; // guard: can't exceed stock
        return prev.map((c) =>
          c.item_id === item.id ? { ...c, quantity: c.quantity + 1 } : c
        );
      }
      return [...prev, { item_id: item.id, name: item.name, price: Number(item.price), quantity: 1, stock: item.stock }];
    });
  };

  const removeFromCart = (item_id) => {
    setCart((prev) => prev.filter((c) => c.item_id !== item_id));
  };

  const insufficientBalance = balance !== null && cartTotal > balance;

  const handleCheckout = async () => {
    setCheckoutError('');
    setCheckoutSuccess('');

    if (cart.length === 0) {
      setCheckoutError('Your cart is empty.');
      return;
    }
    if (insufficientBalance) {
      setCheckoutError('Insufficient wallet balance for this order.');
      return;
    }

    setCheckingOut(true);
    try {
      const res = await API.post('/orders', {
        user_id: userId,
        items: cart.map((c) => ({ item_id: c.item_id, quantity: c.quantity })),
      });
      setCheckoutSuccess(`Order placed successfully (Order #${res.data?.order_id ?? '—'}).`);
      setCart([]);
      loadBalance();
      loadCatalog();
    } catch (err) {
      setCheckoutError(err.response?.data?.message || err.message || 'Checkout failed.');
    } finally {
      setCheckingOut(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Shop</h1>
        <p className="text-gray-500 mt-1">Browse the catalog and check out with your wallet balance.</p>
      </div>

      {loadError && (
        <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm rounded-r-md flex items-center justify-between">
          <span>{loadError}</span>
          <button onClick={loadCatalog} className="text-xs font-semibold underline shrink-0 ml-4">Retry</button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Catalog */}
        <div className="lg:col-span-2">
          {loading ? (
            <p className="text-sm text-gray-400">Loading catalog...</p>
          ) : items.length === 0 && !loadError ? (
            <p className="text-sm text-gray-400">No items available.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {items.map((item) => (
                <ProductCard
                  key={item.id}
                  title={item.name}
                  category={item.category}
                  price={`${Number(item.price).toLocaleString()} ETB`}
                  onBuy={() => addToCart(item)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Cart / Checkout */}
        <div className="rounded-2xl bg-white p-6 border border-slate-100 shadow-sm space-y-4 h-fit">
          <h3 className="text-lg font-bold text-slate-900">Your Cart</h3>

          {balance !== null && (
            <p className="text-xs text-gray-500">Wallet balance: <span className="font-semibold text-slate-800">{balance.toLocaleString()} ETB</span></p>
          )}

          {cart.length === 0 ? (
            <p className="text-sm text-slate-400">Cart is empty.</p>
          ) : (
            <div className="space-y-2">
              {cart.map((c) => (
                <div key={c.item_id} className="flex justify-between items-center text-sm">
                  <span>{c.name} × {c.quantity}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{(c.price * c.quantity).toLocaleString()} ETB</span>
                    <button onClick={() => removeFromCart(c.item_id)} className="text-red-500 text-xs">✕</button>
                  </div>
                </div>
              ))}
              <div className="border-t pt-2 flex justify-between font-bold text-slate-900">
                <span>Total</span>
                <span>{cartTotal.toLocaleString()} ETB</span>
              </div>
            </div>
          )}

          {checkoutError && (
            <div className="p-3 text-xs bg-red-50 text-red-600 rounded-lg border border-red-100">{checkoutError}</div>
          )}
          {checkoutSuccess && (
            <div className="p-3 text-xs bg-emerald-50 text-emerald-600 rounded-lg border border-emerald-100">{checkoutSuccess}</div>
          )}

          <button
            onClick={handleCheckout}
            disabled={checkingOut || cart.length === 0 || insufficientBalance}
            className="w-full rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white hover:bg-indigo-700 transition-all disabled:opacity-50"
          >
            {checkingOut ? 'Placing Order...' : 'Checkout'}
          </button>
        </div>
      </div>
    </div>
  );
}
