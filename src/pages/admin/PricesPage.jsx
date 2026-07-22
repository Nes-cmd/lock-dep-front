export default function PricesPage() {
  const priceRules = [
    { id: 1, category: 'Gaming Vouchers', baseCost: '$1.00 USD', exchangeRate: '125 ETB', margin: '10%', finalPrice: '137.50 ETB' },
    { id: 2, category: 'Apple / Steam Cards', baseCost: '$10.00 USD', exchangeRate: '125 ETB', margin: '8%', finalPrice: '1,350.00 ETB' },
    { id: 3, category: 'Telecom Top-ups', baseCost: '100 ETB', exchangeRate: '1.0 (Flat)', margin: '5%', finalPrice: '105.00 ETB' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Pricing Rules & Margins</h1>
          <p className="text-sm text-gray-500">Configure global profit margins and exchange rate multipliers.</p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2 rounded-lg text-sm transition-colors self-start sm:self-auto">
          + Add Pricing Rule
        </button>
      </div>

      {/* Global Rate Settings */}
      <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Base Exchange Rate (USD to ETB)</label>
          <input
            type="number"
            defaultValue={125}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Default Profit Margin (%)</label>
          <input
            type="number"
            defaultValue={8}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="flex items-end">
          <button className="w-full bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold py-2 px-4 rounded-lg transition-colors">
            Update Global Settings
          </button>
        </div>
      </div>

      {/* Rules Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm text-gray-600">
          <thead className="bg-gray-50 text-xs text-gray-500 uppercase border-b border-gray-200">
            <tr>
              <th className="px-6 py-3">Category / Product Group</th>
              <th className="px-6 py-3">Base Cost</th>
              <th className="px-6 py-3">Exchange Multiplier</th>
              <th className="px-6 py-3">Profit Margin</th>
              <th className="px-6 py-3">Calculated Price</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {priceRules.map((rule) => (
              <tr key={rule.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-semibold text-slate-900">{rule.category}</td>
                <td className="px-6 py-4">{rule.baseCost}</td>
                <td className="px-6 py-4">{rule.exchangeRate}</td>
                <td className="px-6 py-4 font-medium text-indigo-600">{rule.margin}</td>
                <td className="px-6 py-4 font-bold text-slate-900">{rule.finalPrice}</td>
                <td className="px-6 py-4 text-right">
                  <button className="text-indigo-600 hover:text-indigo-900 font-medium text-xs">Edit Rule</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}