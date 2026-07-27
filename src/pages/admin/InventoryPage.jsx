import { useState } from 'react';

const CATEGORIES = ['Gaming', 'Gift Cards'];

const initialItems = [
  { id: '1', name: 'PUBG Mobile 660 UC', category: 'Gaming', stock: 45, price: 1200, provider: 'Garena Direct', status: 'In Stock' },
  { id: '2', name: 'Steam $20 Gift Card', category: 'Gift Cards', stock: 12, price: 2800, provider: 'Valve Partners', status: 'Low Stock' },
  { id: '3', name: 'iTunes $10 Gift Card', category: 'Gift Cards', stock: 0, price: 1400, provider: 'Apple Distribution', status: 'Out of Stock' },
  { id: '4', name: 'Free Fire 1080 Diamonds', category: 'Gaming', stock: 80, price: 950, provider: 'Garena Direct', status: 'In Stock' },
];

const emptyFormData = {
  name: '',
  category: '',
  stock: '',
  price: '',
  provider: '',
};

function getStatus(stock) {
  const numericStock = Number(stock);
  if (numericStock === 0) return 'Out of Stock';
  if (numericStock < 20) return 'Low Stock';
  return 'In Stock';
}

function formatPrice(price) {
  const numericPrice = Number(price);
  return `${numericPrice.toLocaleString()} ETB`;
}

export default function InventoryPage() {
  const [items, setItems] = useState(initialItems);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [formData, setFormData] = useState(emptyFormData);
  const [errors, setErrors] = useState({});

  // Filter items by search term and category safely
  const filteredItems = items.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.trim().toLowerCase());
    const matchesCategory =
      categoryFilter === 'all' ||
      (item.category && item.category.trim().toLowerCase() === categoryFilter.trim().toLowerCase());
    return matchesSearch && matchesCategory;
  });

  function openAddModal() {
    setIsEditMode(false);
    setSelectedItem(null);
    setFormData(emptyFormData);
    setErrors({});
    setIsModalOpen(true);
  }

  function openEditModal(item) {
    setIsEditMode(true);
    setSelectedItem(item);
    setFormData({
      name: item.name,
      category: item.category,
      stock: String(item.stock),
      price: String(item.price),
      provider: item.provider,
    });
    setErrors({});
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setIsEditMode(false);
    setSelectedItem(null);
    setFormData(emptyFormData);
    setErrors({});
  }

  function handleFormChange(field, value) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  function validateForm(data) {
    const newErrors = {};

    if (!data.name || !data.name.trim()) {
      newErrors.name = 'Item name is required.';
    }

    if (!data.category || !data.category.trim()) {
      newErrors.category = 'Category is required.';
    }

    if (!data.provider || !data.provider.trim()) {
      newErrors.provider = 'Linked provider is required.';
    }

    if (data.stock === '' || data.stock === null || data.stock === undefined) {
      newErrors.stock = 'Stock is required.';
    } else if (Number(data.stock) < 0) {
      newErrors.stock = 'Stock cannot be negative.';
    }

    if (data.price === '' || data.price === null || data.price === undefined) {
      newErrors.price = 'Price is required.';
    } else if (Number(data.price) < 0) {
      newErrors.price = 'Price cannot be negative.';
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

    const status = getStatus(formData.stock);

    if (isEditMode && selectedItem) {
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === selectedItem.id
            ? {
                ...item,
                name: formData.name.trim(),
                category: formData.category,
                stock: Number(formData.stock),
                price: Number(formData.price),
                provider: formData.provider.trim(),
                status,
              }
            : item
        )
      );
    } else {
      const newItem = {
        id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
        name: formData.name.trim(),
        category: formData.category,
        stock: Number(formData.stock),
        price: Number(formData.price),
        provider: formData.provider.trim(),
        status,
      };
      setItems((prevItems) => [...prevItems, newItem]);
    }

    closeModal();
  }

  function handleDelete(item) {
    const confirmed = window.confirm(`Are you sure you want to delete "${item.name}"?`);
    if (confirmed) {
      setItems((prevItems) => prevItems.filter((i) => i.id !== item.id));
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Inventory Management</h1>
          <p className="text-sm text-gray-500">View and manage available digital stock and gift cards.</p>
        </div>
        <button
          onClick={openAddModal}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2 rounded-lg text-sm transition-colors self-start sm:self-auto"
        >
          + Add New Item
        </button>
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
              <th className="px-6 py-3">Stock Level</th>
              <th className="px-6 py-3">Retail Price</th>
              <th className="px-6 py-3">Provider</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredItems.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-8 text-center text-gray-400">
                  No items found.
                </td>
              </tr>
            ) : (
              filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-slate-900">{item.name}</td>
                  <td className="px-6 py-4">{item.category}</td>
                  <td className="px-6 py-4">{item.stock} units</td>
                  <td className="px-6 py-4 font-medium text-slate-800">{formatPrice(item.price)}</td>
                  <td className="px-6 py-4">{item.provider}</td>
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
                    <button
                      onClick={() => openEditModal(item)}
                      className="text-indigo-600 hover:text-indigo-900 font-medium text-xs"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item)}
                      className="text-red-600 hover:text-red-900 font-medium text-xs"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white rounded-xl border border-gray-200 shadow-lg w-full max-w-md p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">
                {isEditMode ? 'Edit Item' : 'Add New Item'}
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 text-sm"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              {/* Item Name */}
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Item Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleFormChange('name', e.target.value)}
                  className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 ${
                    errors.name
                      ? 'border-red-400 focus:ring-red-400'
                      : 'border-gray-300 focus:ring-indigo-500'
                  }`}
                  placeholder="e.g. Steam $20 Gift Card"
                />
                {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
              </div>

              {/* Category */}
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => handleFormChange('category', e.target.value)}
                  className={`w-full border rounded-lg px-3 py-2 text-sm text-gray-600 focus:outline-none focus:ring-2 ${
                    errors.category
                      ? 'border-red-400 focus:ring-red-400'
                      : 'border-gray-300 focus:ring-indigo-500'
                  }`}
                >
                  <option value="">Select a category</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                {errors.category && <p className="mt-1 text-xs text-red-600">{errors.category}</p>}
              </div>

              {/* Stock */}
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Stock</label>
                <input
                  type="number"
                  value={formData.stock}
                  onChange={(e) => handleFormChange('stock', e.target.value)}
                  className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 ${
                    errors.stock
                      ? 'border-red-400 focus:ring-red-400'
                      : 'border-gray-300 focus:ring-indigo-500'
                  }`}
                  placeholder="0"
                />
                {errors.stock && <p className="mt-1 text-xs text-red-600">{errors.stock}</p>}
              </div>

              {/* Price */}
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Price (ETB)</label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => handleFormChange('price', e.target.value)}
                  className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 ${
                    errors.price
                      ? 'border-red-400 focus:ring-red-400'
                      : 'border-gray-300 focus:ring-indigo-500'
                  }`}
                  placeholder="0"
                />
                {errors.price && <p className="mt-1 text-xs text-red-600">{errors.price}</p>}
              </div>

              {/* Linked Provider */}
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Linked Provider</label>
                <input
                  type="text"
                  value={formData.provider}
                  onChange={(e) => handleFormChange('provider', e.target.value)}
                  className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 ${
                    errors.provider
                      ? 'border-red-400 focus:ring-red-400'
                      : 'border-gray-300 focus:ring-indigo-500'
                  }`}
                  placeholder="e.g. Valve Partners"
                />
                {errors.provider && <p className="mt-1 text-xs text-red-600">{errors.provider}</p>}
              </div>

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
                  {isEditMode ? 'Save Changes' : 'Add Item'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}