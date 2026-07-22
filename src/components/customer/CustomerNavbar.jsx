import { Link, useLocation } from 'react-router-dom';

export default function CustomerNavbar() {
  const location = useLocation();

  const navLinks = [
    { name: 'Shop', path: '/customer/shop' },
    { name: 'Wallet', path: '/customer/wallet' },
    { name: 'Orders', path: '/customer/orders' },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Brand Logo & Links */}
          <div className="flex items-center space-x-8">
            <Link to="/customer/shop" className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Birr<span className="text-indigo-600">Bazaar</span>
            </Link>

            <div className="hidden md:flex space-x-2">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-indigo-50 text-indigo-600 font-semibold'
                        : 'text-gray-600 hover:text-slate-900 hover:bg-gray-50'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Wallet Badge & Quick Profile Actions */}
          <div className="flex items-center space-x-4">
            <Link
              to="/customer/wallet"
              className="flex items-center space-x-2 bg-indigo-50 border border-indigo-100 text-indigo-700 px-3.5 py-1.5 rounded-full text-xs font-semibold hover:bg-indigo-100 transition-colors"
            >
              <span className="text-indigo-400">💳</span>
              <span>2,500 ETB</span>
            </Link>

            <button
              onClick={() => console.log('Logout clicked')}
              className="text-xs font-semibold text-gray-500 hover:text-red-600 transition-colors"
            >
              Logout
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
}