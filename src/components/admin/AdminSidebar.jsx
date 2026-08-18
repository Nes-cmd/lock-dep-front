import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserRole, logout } from "../../utils/auth";

export default function AdminSidebar() {
  const navigate = useNavigate();
  const role = getUserRole(); // Checks 'admin' vs 'customer'

  const handleLogout = () => {
    logout(); // Clears localStorage
    navigate('/login');
  };

  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen p-4 flex flex-col justify-between">
      <div className="space-y-4">
        <h2 className="text-xl font-bold px-2">BirrBazaar Admin</h2>
        
        {/* Navigation Items */}
        <nav className="space-y-1">
          {/* Show admin links if role is admin */}
          {role === 'admin' && (
            <>
              <a href="/admin/inventory" className="block px-3 py-2 rounded-lg hover:bg-slate-800">Inventory</a>
              <a href="/admin/providers" className="block px-3 py-2 rounded-lg hover:bg-slate-800">Providers</a>
              <a href="/admin/prices" className="block px-3 py-2 rounded-lg hover:bg-slate-800">Prices</a>
            </>
          )}
        </nav>
      </div>

      {/* Logout Button */}
      <button 
        onClick={handleLogout}
        className="w-full text-left px-3 py-2 text-red-400 hover:bg-slate-800 rounded-lg text-sm font-semibold"
      >
        🚪 Log Out
      </button>
    </aside>
  );
}