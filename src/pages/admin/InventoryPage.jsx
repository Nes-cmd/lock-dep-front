import { useState } from 'react';

export default function InventoryPage() {
  const [searchTerm, setSearchTerm] = useState('');

  // Sample mock inventory data
  const mockItems = [
    { id: 1, name: 'PUBG Mobile 660 UC', category: 'Gaming', stock: 45, price: '1,200 ETB', status: 'In Stock' },
    { id: 2, name: 'Steam $20 Gift Card', category: 'Gift Cards', stock: 12, price: '2,800 ETB', status: 'Low Stock' },
    { id: 3, name: 'iTunes $10 Gift Card', category: 'Gift Cards', stock: 0, price: '1,400 ETB', status: 'Out of Stock' },
    { id: 4, name: 'Free Fire 1080 Diamonds', category: 'Gaming', stock: 80, price: '950 ETB', status: 'In Stock' },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Inventory Management</h1>
          <p className="text-sm text-gray-500">View and manage available digital stock and gift cards.</p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2 rounded-lg text-sm transition-colors self-start sm:self-auto">
          + Add New Item
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 flex items-center justify-between gap-4">
        <input
          type="text"
          placeholder="Search items by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-sm border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500">
          <option value="all">All Categories</option>
          <option value="gaming">Gaming</option>
          <option value="giftcards">Gift Cards</option>
        </select>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm text-gray-600">
          <thead className="bg-gray-50 text-xs text-gray-500 uppercase border-b border-gray-200">
            <tr>
              <th className="px-6 py-3">Item Name</th>
              <th className="px-6 py-3">Category</th>
              <th className="px-6 py-3">Stock Level</th>
              <th className="px-6 py-3">Retail Price</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {mockItems.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-semibold text-slate-900">{item.name}</td>
                <td className="px-6 py-4">{item.category}</td>
                <td className="px-6 py-4">{item.stock} units</td>
                <td className="px-6 py-4 font-medium text-slate-800">{item.price}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                      item.status === 'In Stock'
                        ? 'bg-emerald-50 text-emerald-700'
                        : item.status === 'Low Stock'
                        ? 'bg-amber-50 text-amber-700'
                        : 'bg-red-50 text-red-700'
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button className="text-indigo-600 hover:text-indigo-900 font-medium text-xs">Edit</button>
                  <button className="text-red-600 hover:text-red-900 font-medium text-xs">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}