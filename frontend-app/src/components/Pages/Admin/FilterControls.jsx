import { useState } from 'react';

function FilterControls({ tempFilters, setTempFilters, onApply, onClear }) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleApply = () => {
    onApply();
    setIsFilterOpen(false);
  };

  const handleClear = () => {
    onClear();
    setIsFilterOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsFilterOpen(!isFilterOpen)}
        className="px-4 py-2.5 bg-white border border-gray-200 text-gray-600 text-[13px] font-semibold rounded-xl shadow-sm flex items-center gap-2 hover:bg-gray-50 transition-colors"
      >
        <i className="ph-bold ph-funnel"></i> Filter
      </button>

      {isFilterOpen && (
        <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-[16px] shadow-xl border border-gray-100 animate-fade-in origin-top-right z-30">
          <div className="p-4 border-b border-gray-50">
            <h4 className="text-[13px] font-bold text-gray-900 tracking-wide flex items-center gap-2">
              <i className="ph-bold ph-sliders-horizontal text-neurea-primary"></i> Filter Patients
            </h4>
          </div>
          <div className="p-4 flex flex-col gap-4">
            <div>
              <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wide mb-2">Subscription Plan</label>
              <div className="relative">
                <select
                  value={tempFilters.plan}
                  onChange={(e) => setTempFilters({ ...tempFilters, plan: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-[10px] pl-3 pr-8 py-2 text-[13px] font-medium text-gray-700 focus:outline-none focus:border-[#5C2D91] appearance-none transition-colors"
                >
                  <option value="all">All Plans</option>
                  <option value="pro">Neurea Pro</option>
                  <option value="standard">Standard</option>
                </select>
                <i className="ph-bold ph-caret-down absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"></i>
              </div>
            </div>
            <div>
              <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wide mb-2">Account Status</label>
              <div className="relative">
                <select
                  value={tempFilters.status}
                  onChange={(e) => setTempFilters({ ...tempFilters, status: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-[10px] pl-3 pr-8 py-2 text-[13px] font-medium text-gray-700 focus:outline-none focus:border-[#5C2D91] appearance-none transition-colors"
                >
                  <option value="all">All Statuses</option>
                  <option value="active">Active</option>
                  <option value="suspended">Suspended</option>
                </select>
                <i className="ph-bold ph-caret-down absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"></i>
              </div>
            </div>
          </div>
          <div className="p-4 border-t border-gray-50 flex justify-between items-center bg-gray-50/50 rounded-b-[16px]">
            <button onClick={handleClear} className="text-[12px] font-bold text-gray-500 hover:text-gray-800 transition-colors">Clear All</button>
            <button onClick={handleApply} className="px-4 py-2 bg-[#5C2D91] text-white rounded-[8px] text-[12px] font-bold hover:bg-purple-800 shadow-sm transition-all flex items-center justify-center min-w-[80px]">Apply</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default FilterControls;