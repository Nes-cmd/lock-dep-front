export default function WalletCard({
  balance = "2,500.00",
  currency = "ETB",
  onTopUp = () => {}
}) {
  return (
    <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-slate-950 text-white p-6 rounded-2xl shadow-xl relative overflow-hidden">
      {/* Decorative Blur Accent */}
      <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-indigo-500/20 rounded-full blur-2xl pointer-events-none" />

      <div className="flex flex-col justify-between h-44 relative z-10">
        <div>
          <div className="flex justify-between items-center">
            <p className="text-xs uppercase tracking-widest text-indigo-300 font-semibold">
              Digital Wallet
            </p>
            <span className="text-xs font-bold text-slate-400">BirrBazaar</span>
          </div>

          <div className="flex items-baseline space-x-2 mt-4">
            <span className="text-3xl md:text-4xl font-black tracking-tight">
              {balance}
            </span>
            <span className="text-sm font-bold text-indigo-300">{currency}</span>
          </div>
        </div>

        {/* Footer info & button */}
        <div className="flex items-center justify-between border-t border-white/10 pt-4">
          <div>
            <p className="text-[10px] uppercase text-gray-400">Account Status</p>
            <p className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse"></span>
              Active
            </p>
          </div>

          <button
            onClick={onTopUp}
            className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-4 py-2 rounded-lg shadow transition-colors"
          >
            + Top Up
          </button>
        </div>
      </div>
    </div>
  );
}