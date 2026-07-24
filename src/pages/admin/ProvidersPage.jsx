import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProviderModal from '../../components/admin/ProviderModal';

// Adjust base API URL if needed (e.g., http://localhost:5000/api/providers)
const API_URL = 'http://localhost:5000/api/providers';

const MOCK_PROVIDERS = [
  { id: 1, name: 'SEAGM Direct', email: 'api@seagm.com', phone: '+1 800 555 0199', address: 'Main Gateway HQ' },
  { id: 2, name: 'Reloadly Hub', email: 'support@reloadly.com', phone: '+1 800 555 0122', address: 'API Hub North' },
  { id: 3, name: 'Local Supplier A', email: 'supplier@local.et', phone: '+251 91 123 4567', address: 'Bole, Addis Ababa' }
];

export default function ProvidersPage() {
  const [providers, setProviders] = useState(MOCK_PROVIDERS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch providers on load
  const fetchProviders = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL);
      if (response.data && Array.isArray(response.data)) {
        setProviders(response.data);
      }
    } catch (error) {
      console.warn('Backend unavailable, using mock data:', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProviders();
  }, []);

  const handleOpenAddModal = () => {
    setSelectedProvider(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (provider) => {
    setSelectedProvider(provider);
    setIsModalOpen(true);
  };

  // CREATE / UPDATE
  const handleSaveProvider = async (formData) => {
    if (selectedProvider) {
      // UPDATE (PUT /:id)
      try {
        const res = await axios.put(`${API_URL}/${selectedProvider.id}`, formData);
        setProviders(prev => prev.map(p => p.id === selectedProvider.id ? res.data : p));
      } catch (err) {
        console.warn('Backend error on update, updating locally:', err.message);
        setProviders(prev => prev.map(p => p.id === selectedProvider.id ? { ...p, ...formData } : p));
      }
    } else {
      // CREATE (POST /)
      try {
        const res = await axios.post(API_URL, formData);
        setProviders(prev => [...prev, res.data]);
      } catch (err) {
        console.warn('Backend error on create, adding locally:', err.message);
        setProviders(prev => [...prev, { id: Date.now(), ...formData }]);
      }
    }
  };

  // DELETE
  const handleDeleteProvider = async (id) => {
    if (!window.confirm('Are you sure you want to delete this provider?')) return;

    try {
      await axios.delete(`${API_URL}/${id}`);
      setProviders(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      console.warn('Backend error on delete, removing locally:', err.message);
      setProviders(prev => prev.filter(p => p.id !== id));
    }
  };

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">API & Code Providers</h1>
          <p className="text-sm text-slate-500">Manage external suppliers and API integrations.</p>
        </div>
        <button
          onClick={handleOpenAddModal}
          className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 transition-all shadow-md shadow-indigo-600/20"
        >
          + Connect Provider
        </button>
      </div>

      {/* Grid of Provider Cards */}
      {loading ? (
        <div className="text-slate-500 text-sm py-8">Loading providers...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {providers.map((provider) => (
            <div
              key={provider.id}
              className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-bold text-slate-900">{provider.name}</h3>
                  <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-600 border border-emerald-100">
                    Active
                  </span>
                </div>

                <div className="space-y-1.5 text-xs text-slate-500 my-4">
                  <p><span className="font-semibold text-slate-700">Email:</span> {provider.email}</p>
                  <p><span className="font-semibold text-slate-700">Phone:</span> {provider.phone}</p>
                  <p><span className="font-semibold text-slate-700">Address:</span> {provider.address}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end space-x-4 pt-4 border-t border-slate-100 text-xs font-semibold">
                <button
                  onClick={() => handleOpenEditModal(provider)}
                  className="text-slate-500 hover:text-indigo-600 transition-colors"
                >
                  Configure
                </button>
                <button
                  onClick={() => handleDeleteProvider(provider.id)}
                  className="text-slate-400 hover:text-red-600 transition-colors"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      <ProviderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveProvider}
        initialData={selectedProvider}
      />
    </div>
  );
}