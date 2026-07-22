import { Link, useLocation } from 'react-router-dom';

export default function CustomerSidebar() {
  const location = useLocation();

  const navItems = [
    { label: 'Shop', path: '/customer/shop' },
    { label: 'Wallet', path: '/customer/wallet' },
    { label: 'Orders', path: '/customer/orders' },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen p-4 flex flex-col">
      <div className="text-xl font-bold p-4 border-b border-slate-700">
        BirrBazaar
      </div>
      
      <nav className="flex-1 mt-6 space-y-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`block px-4 py-2.5 rounded-lg transition-colors ${
                isActive
                  ? 'bg-indigo-600 text-white font-medium'
                  : 'text-gray-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Quick Wallet Widget at bottom of Sidebar */}
      <div className="p-4 bg-slate-800 rounded-xl mt-auto">
        <p className="text-xs text-gray-400 uppercase font-semibold">Wallet Balance</p>
        <p className="text-lg font-bold text-indigo-400 mt-1">2,500 ETB</p>
      </div>
    </aside>
  );
}