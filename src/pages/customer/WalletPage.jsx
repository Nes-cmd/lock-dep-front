import React, { useState, useEffect } from 'react';
import API from '../../services/api';

export default function WalletPage() {
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState('');
  const [ledger, setLedger] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Get current user ID from localStorage or JWT token
  const getUserId = () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      return user?.id || user?.user_id || 1; // Fallback for dev/testing
    } catch {
      return 1;
    }
  };

  const userId = getUserId();

  // 1. Fetch User Balance & Ledger History
  const fetchWalletData = async () => {
    setLoading(true);
    try {
      const [balanceRes, ledgerRes] = await Promise.all([
        API.get(`/balance/${userId}`).catch(() => ({ data: { balance: 0 } })),
        API.get('/transaction').catch(() => ({ data: [] }))
      ]);

      // Match backend response shape: { success: true, balance: user.balance }
      if (balanceRes.data && balanceRes.data.balance !== undefined) {
        setBalance(Number(balanceRes.data.balance));
      }

      // Filter transactions for this user if returned as a list
      if (Array.isArray(ledgerRes.data)) {
        const userLedger = ledgerRes.data.filter(
          item => String(item.user_id) === String(userId)
        );
        setLedger(userLedger.length > 0 ? userLedger : ledgerRes.data);
      }
    } catch (err) {
      console.error('Failed to load wallet data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWalletData();
  }, []);

  // 2. Handle Deposit Submission
  const handleDeposit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    const numericAmount = parseFloat(amount);

    // Frontend validation before hitting backend
    if (isNaN(numericAmount) || numericAmount <= 0) {
      setErrorMsg('Please enter a valid deposit amount greater than 0.');
      return;
    }

    setSubmitting(true);
    try {
      // Send payload matching backend expectations: { user_id, amount }
      const res = await API.post('/deposit', {
        user_id: userId,
        amount: numericAmount
      });

      setSuccessMsg(res.data?.message || `Successfully deposited $${numericAmount.toFixed(2)}!`);
      setAmount('');
      
      // Auto refetch balance & ledger history
      await fetchWalletData();
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Deposit failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-8 space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Financial Wallet</h1>
        <p className="text-sm text-slate-500">Manage your balance and track transaction history.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Available Balance Card */}
        <div className="rounded-2xl bg-gradient-to-br from-indigo-600 to-indigo-800 p-6 text-white shadow-xl flex flex-col justify-between">
          <div>
            <p className="text-xs uppercase tracking-wider text-indigo-200 font-semibold">Available Balance</p>
            <h2 className="text-4xl font-extrabold mt-2">
              ${loading ? '...' : balance.toFixed(2)}
            </h2>
          </div>
          <p className="text-xs text-indigo-200 mt-6">Updated in real-time</p>
        </div>

        {/* Deposit Portal */}
        <div className="lg:col-span-2 rounded-2xl bg-white p-6 border border-slate-100 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-900">Deposit Funds</h3>

          {errorMsg && (
            <div className="p-3 text-xs bg-red-50 text-red-600 rounded-lg border border-red-100">
              {errorMsg}
            </div>
          )}
          {successMsg && (
            <div className="p-3 text-xs bg-emerald-50 text-emerald-600 rounded-lg border border-emerald-100">
              {successMsg}
            </div>
          )}

          <form onSubmit={handleDeposit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Deposit Amount ($)
              </label>
              <input
                type="number"
                step="0.01"
                min="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount (e.g. 50.00)"
                className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white hover:bg-indigo-700 transition-all shadow-md shadow-indigo-600/20 disabled:opacity-50"
            >
              {submitting ? 'Processing Deposit...' : 'Confirm Deposit'}
            </button>
          </form>
        </div>
      </div>

      {/* Transaction History Ledger */}
      <div className="rounded-2xl bg-white p-6 border border-slate-100 shadow-sm space-y-4">
        <h3 className="text-lg font-bold text-slate-900">Transaction History</h3>

        {ledger.length === 0 ? (
          <p className="text-sm text-slate-400 py-4">No recent deposit records found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                <tr>
                  <th className="p-3 rounded-l-lg">Date</th>
                  <th className="p-3">Type</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3 rounded-r-lg">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {ledger.map((item, idx) => (
                  <tr key={item.id || idx}>
                    <td className="p-3 text-slate-600">
                      {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'Just now'}
                    </td>
                    <td className="p-3 font-medium text-slate-800 capitalize">
                      {item.type || 'deposit'}
                    </td>
                    <td className="p-3 text-emerald-600 font-semibold">
                      +${parseFloat(item.amount || 0).toFixed(2)}
                    </td>
                    <td className="p-3">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 capitalize">
                        {item.status || 'completed'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}