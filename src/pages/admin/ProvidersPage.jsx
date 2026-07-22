export default function ProvidersPage() {
  const providers = [
    { id: 1, name: 'SEAGM Direct', type: 'API Integration', status: 'Connected', balance: '$450.00', lastSync: '10 mins ago' },
    { id: 2, name: 'Reloadly Hub', type: 'API Integration', status: 'Connected', balance: '$1,200.50', lastSync: '2 mins ago' },
    { id: 3, name: 'Local Supplier A', type: 'Manual Code Upload', status: 'Inactive', balance: 'N/A', lastSync: '3 days ago' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">API & Code Providers</h1>
          <p className="text-sm text-gray-500">Manage external suppliers and API integrations.</p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2 rounded-lg text-sm transition-colors self-start sm:self-auto">
          + Connect Provider
        </button>
      </div>

      {/* Providers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {providers.map((prov) => (
          <div key={prov.id} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm flex flex-col justify-between space-y-4">
            <div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">{prov.name}</h3>
                  <p className="text-xs text-gray-400 mt-0.5">{prov.type}</p>
                </div>
                <span
                  className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                    prov.status === 'Connected' ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {prov.status}
                </span>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">API Balance:</span>
                  <span className="font-bold text-slate-800">{prov.balance}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Last Synced:</span>
                  <span className="text-gray-700">{prov.lastSync}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 pt-2">
              <button className="text-xs text-indigo-600 font-semibold hover:underline">Sync API</button>
              <button className="text-xs text-gray-600 font-semibold hover:underline">Configure</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}