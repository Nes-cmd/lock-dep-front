import { useState } from 'react';

const CATEGORIES = ['Gaming', 'Gift Cards'];

const initialPriceData = [
  { id: '1', name: 'PUBG Mobile 660 UC', category: 'Gaming', providerCost: 1050, retailPrice: 1200, lastUpdated: '2026-07-20' },
  { id: '2', name: 'Steam $20 Gift Card', category: 'Gift Cards', providerCost: 2500, retailPrice: 2800, lastUpdated: '2026-07-22' },
  { id: '3', name: 'iTunes $10 Gift Card', category: 'Gift Cards', providerCost: 1250, retailPrice: 1400, lastUpdated: '2026-07-18' },
  { id: '4', name: 'Free Fire 1080 Diamonds', category: 'Gaming', providerCost: 820, retailPrice: 950, lastUpdated: '2026-07-25' },
];

const emptyFormData = {
  name: '',
  category: '',
  providerCost: '',
  retailPrice: '',
};

function formatPrice(amount) {
  const numericAmount = Number(amount) || 0;
  return `${numericAmount.toLocaleString()} ETB`;
}

function calculateProfit(retail, cost) {
  return Number(retail) - Number(cost);
}

function calculateMargin(retail, cost) {
  const r = Number(retail);
  const c = Number(cost);
  if (!r || r <= 0) return 0;
  return (((r - c) / r) * 100).toFixed(1);
}

export default function PricesPage() {
  const [priceList, setPriceList] = useState(initialPriceData);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [formData, setFormData] = useState(emptyFormData);
  const [errors, setErrors] = useState({});

  // Filter items safely
  const filteredItems = priceList.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.trim().toLowerCase());
    const matchesCategory =
      categoryFilter === 'all' ||
      (item.category && item.category.trim().toLowerCase() === categoryFilter.trim().toLowerCase());
    return matchesSearch && matchesCategory;
  });

  function openEditModal(item) {
    setSelectedItem(item);
    setFormData({
      name: item.name,
      category: item.category,
      providerCost: String(item.providerCost),
      retailPrice: String(item.retailPrice),
    });
    setErrors({});
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setSelectedItem(null);
    setFormData(emptyFormData);
    setErrors({});
  }

  function handleFormChange(field, value) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  function validateForm(data) {
    const newErrors = {};

    if (data.providerCost === '' || data.providerCost === null || data.providerCost === undefined) {
      newErrors.providerCost = 'Provider cost is required.';
    } else if (Number(data.providerCost) < 0) {
      newErrors.providerCost = 'Cost cannot be negative.';
    }

    if (data.retailPrice === '' || data.retailPrice === null || data.retailPrice === undefined) {
      newErrors.retailPrice = 'Retail price is required.';
    } else if (Number(data.retailPrice) < Number(data.providerCost)) {
      newErrors.retailPrice = 'Retail price should be higher than cost.';
    }

    return newErrors;
  }

  function handleSubmit(e) {
    e.preventDefault();

    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    const today = new Date().toISOString().split('T')[0];

    setPriceList((prevList) =>
      prevList.map((item) =>
        item.id === selectedItem.id
          ? {
              ...item,
              providerCost: Number(formData.providerCost),
              retailPrice: Number(formData.retailPrice),
              lastUpdated: today,
            }
          : item
      )
    );

    closeModal();
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Price & Margin Management</h1>
          <p className="text-sm text-gray-500">Adjust retail prices, review provider costs, and monitor profit margins.</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="Search items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-sm border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="all">All Categories</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-200">
            <tr>
              <th className="px-6 py-3">Item Name</th>
              <th className="px-6 py-3">Category</th>
              <th className="px-6 py-3">Provider Cost</th>
              <th className="px-6 py-3">Retail Price</th>
              <th className="px-6 py-3">Est. Profit</th>
              <th className="px-6 py-3">Margin</th>
              <th className="px-6 py-3">Last Updated</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredItems.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-6 py-8 text-center text-gray-400">
                  No pricing records found.
                </td>
              </tr>
            ) : (
              filteredItems.map((item) => {
                const profit = calculateProfit(item.retailPrice, item.providerCost);
                const margin = calculateMargin(item.retailPrice, item.providerCost);

                return (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900">{item.name}</td>
                    <td className="px-6 py-4">{item.category}</td>
                    <td className="px-6 py-4 text-gray-600">{formatPrice(item.providerCost)}</td>
                    <td className="px-6 py-4 font-medium text-slate-900">{formatPrice(item.retailPrice)}</td>
                    <td className="px-6 py-4 font-medium text-emerald-600">+{formatPrice(profit)}</td>
                    <td className="px-6 py-4">
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700">
                        {margin}%
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-400 text-xs">{item.lastUpdated}</td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => openEditModal(item)}
                        className="text-indigo-600 hover:text-indigo-900 font-medium text-xs"
                      >
                        Adjust Price
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Price Modal */}
      {isModalOpen && selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white rounded-xl border border-gray-200 shadow-lg w-full max-w-md p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Adjust Price</h2>
                <p className="text-xs text-gray-500">{formData.name}</p>
              </div>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 text-sm" aria-label="Close">
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              {/* Provider Cost */}
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Provider Cost (ETB)</label>
                <input
                  type="number"
                  value={formData.providerCost}
                  onChange={(e) => handleFormChange('providerCost', e.target.value)}
                  className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 ${
                    errors.providerCost ? 'border-red-400 focus:ring-red-400' : 'border-gray-300 focus:ring-indigo-500'
                  }`}
                />
                {errors.providerCost && <p className="mt-1 text-xs text-red-600">{errors.providerCost}</p>}
              </div>

              {/* Retail Price */}
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Retail Selling Price (ETB)</label>
                <input
                  type="number"
                  value={formData.retailPrice}
                  onChange={(e) => handleFormChange('retailPrice', e.target.value)}
                  className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 ${
                    errors.retailPrice ? 'border-red-400 focus:ring-red-400' : 'border-gray-300 focus:ring-indigo-500'
                  }`}
                />
                {errors.retailPrice && <p className="mt-1 text-xs text-red-600">{errors.retailPrice}</p>}
              </div>

              {/* Live Preview Card */}
              {formData.providerCost && formData.retailPrice && (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-xs space-y-1">
                  <div className="flex justify-between text-gray-600">
                    <span>Projected Profit:</span>
                    <span className="font-semibold text-emerald-600">
                      {formatPrice(calculateProfit(formData.retailPrice, formData.providerCost))}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Profit Margin:</span>
                    <span className="font-semibold text-indigo-600">
                      {calculateMargin(formData.retailPrice, formData.providerCost)}%
                    </span>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2 rounded-lg text-sm transition-colors"
                >
                  Save Rates
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}