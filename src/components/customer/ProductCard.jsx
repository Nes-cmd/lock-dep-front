export default function ProductCard({
  title = "PUBG Mobile 660 UC",
  category = "Gaming",
  price = "1,200 ETB",
  image = "",
  onBuy = () => {}
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between overflow-hidden">
      <div>
        {/* Card Thumbnail Container */}
        <div className="h-40 bg-slate-100 flex items-center justify-center text-gray-400 font-medium overflow-hidden">
          {image ? (
            <img src={image} alt={title} className="w-full h-full object-cover" />
          ) : (
            <span className="text-sm text-gray-400">🎁 Item Image</span>
          )}
        </div>

        {/* Details */}
        <div className="p-4">
          <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
            {category}
          </span>
          <h3 className="text-base font-bold text-slate-900 mt-2 line-clamp-1">{title}</h3>
        </div>
      </div>

      {/* Footer Price & Action */}
      <div className="p-4 pt-0 flex items-center justify-between border-t border-gray-50 mt-2">
        <div>
          <p className="text-[10px] uppercase text-gray-400">Price</p>
          <p className="text-base font-extrabold text-slate-900">{price}</p>
        </div>
        <button
          onClick={onBuy}
          className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}