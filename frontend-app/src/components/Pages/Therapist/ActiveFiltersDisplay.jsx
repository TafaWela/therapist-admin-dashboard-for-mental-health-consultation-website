function ActiveFiltersDisplay({ activeFilters, onRemoveFilter, onClearAll }) {
  if (activeFilters.plan === 'all' && activeFilters.mood === 'all') {
    return null;
  }

  return (
    <div className="px-6 py-3 bg-purple-50/50 border-b border-purple-100 flex items-center gap-2 flex-wrap">
      <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wide">Active Filters:</span>
      {activeFilters.plan !== 'all' && (
        <span className="flex items-center gap-1 bg-white border border-purple-200 text-[#5C2D91] px-2.5 py-1 rounded-full text-[11px] font-bold">
          {activeFilters.plan === 'pro' ? 'Neurea Pro' : 'Standard'}
          <button onClick={() => onRemoveFilter('plan')} className="hover:text-red-500 transition-colors ml-0.5"><i className="ph-bold ph-x text-[10px]"></i></button>
        </span>
      )}
      {activeFilters.mood !== 'all' && (
        <span className="flex items-center gap-1 bg-white border border-purple-200 text-[#5C2D91] px-2.5 py-1 rounded-full text-[11px] font-bold">
          {activeFilters.mood.charAt(0).toUpperCase() + activeFilters.mood.slice(1)}
          <button onClick={() => onRemoveFilter('mood')} className="hover:text-red-500 transition-colors ml-0.5"><i className="ph-bold ph-x text-[10px]"></i></button>
        </span>
      )}
      <button onClick={onClearAll} className="text-[11px] font-bold text-red-500 hover:text-red-700 transition-colors ml-2">Clear all</button>
    </div>
  );
}

export default ActiveFiltersDisplay;