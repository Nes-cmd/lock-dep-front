import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from "../../utils/auth";

export default function CustomerSidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen p-4 flex flex-col justify-between">
      <div className="space-y-4">
        <h2 className="text-xl font-bold px-2">BirrBazaar</h2>
        <nav className="space-y-1">
          <a href="/customer/shop" className="block px-3 py-2 rounded-lg hover:bg-slate-800">Shop</a>
          <a href="/customer/wallet" className="block px-3 py-2 rounded-lg hover:bg-slate-800">Wallet</a>
          <a href="/customer/orders" className="block px-3 py-2 rounded-lg hover:bg-slate-800">Orders</a>
        </nav>
      </div>

      <button 
        onClick={handleLogout}
        className="w-full text-left px-3 py-2 text-red-400 hover:bg-slate-800 rounded-lg text-sm font-semibold"
      >
        🚪 Log Out
      </button>
    </aside>
  );
}