import { useState, useEffect } from 'react';
import API from '../../services/api';
import { getUserId } from '../../utils/auth';

// ASSUMPTION — NOT YET CONFIRMED WITH BACKEND:
// GET /api/orders/:userId  -> list of this user's past orders
// Confirm route name/shape with backend team; only fetchOrders() needs to change if it differs.

const PAGE_SIZE = 5;

export default function OrderHistoryPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);

  const userId = getUserId();

  const fetchOrders = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await API.get(`/orders/${userId}`);
      setOrders(Array.isArray(res.data) ? res.data : res.data?.orders || []);
    } catch (err) {
      setError(
        err.response?.status === 404
          ? "Orders endpoint (/api/orders/:userId) doesn't exist yet on the backend — confirm the route name with the backend team."
          : err.message || 'Could not load order history.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const totalPages = Math.max(1, Math.ceil(orders.length / PAGE_SIZE));
  const pageOrders = orders.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const statusColor = (status) => {
    switch ((status || '').toLowerCase()) {
      case 'completed': return 'bg-emerald-100 text-emerald-800';
      case 'pending': return 'bg-amber-100 text-amber-800';
      case 'withdrawn': return 'bg-red-100 text-red-800';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Order History</h1>
        <p className="text-gray-500 mt-1">Your past purchases.</p>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm rounded-r-md flex items-center justify-between">
          <span>{error}</span>
          <button onClick={fetchOrders} className="text-xs font-semibold underline shrink-0 ml-4">Retry</button>
        </div>
      )}

      {loading ? (
        <p className="text-sm text-gray-400">Loading orders...</p>
      ) : orders.length === 0 && !error ? (
        <p className="text-sm text-gray-400">No orders yet.</p>
      ) : (
        <>
          <div className="rounded-2xl bg-white p-6 border border-slate-100 shadow-sm overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                <tr>
                  <th className="p-3 rounded-l-lg">Order #</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Items</th>
                  <th className="p-3">Total</th>
                  <th className="p-3 rounded-r-lg">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {pageOrders.map((order) => (
                  <tr key={order.id || order.order_id}>
                    <td className="p-3 font-medium text-slate-800">#{order.id || order.order_id}</td>
                    <td className="p-3 text-slate-600">
                      {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : '—'}
                    </td>
                    <td className="p-3 text-slate-600">{order.items?.length ?? order.item_count ?? '—'}</td>
                    <td className="p-3 font-semibold text-slate-800">
                      {order.total !== undefined ? `${Number(order.total).toLocaleString()} ETB` : '—'}
                    </td>
                    <td className="p-3">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${statusColor(order.status)}`}>
                        {order.status || 'unknown'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500">Page {page} of {totalPages}</span>
            <div className="flex gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-1.5 rounded-lg border border-slate-200 disabled:opacity-40"
              >
                Previous
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-3 py-1.5 rounded-lg border border-slate-200 disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
