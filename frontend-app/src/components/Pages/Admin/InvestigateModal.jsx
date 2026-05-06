function InvestigateModal({ onClose }) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        
        <div 
          className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in" 
          onClick={onClose}
        ></div>
  
        <div className="relative w-full max-w-2xl bg-white rounded-[24px] p-8 shadow-2xl animate-pop-in flex flex-col">
          <div className="flex justify-between items-start mb-6 border-b border-gray-100 pb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-purple-50 text-[#5C2D91] flex items-center justify-center font-bold text-xl shadow-sm">
                <i className="ph-bold ph-magnifying-glass"></i>
              </div>
              <div>
                <h3 className="text-[20px] font-extrabold text-gray-900">Investigate Incident</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[13px] text-gray-500 font-medium">Ticket ID:</span>
                  <span className="text-[12px] font-bold text-[#5C2D91] bg-purple-50 px-2 py-0.5 rounded-md tracking-wider">#REP-092</span>
                </div>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors"
            >
              <i className="ph-bold ph-x text-sm"></i>
            </button>
          </div>
  
          <div className="grid grid-cols-2 gap-y-4 gap-x-8 mb-6 p-4 bg-gray-50 rounded-[16px] border border-gray-100">
            <div className="col-span-1">
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Reported By</p>
              <p className="text-[14px] font-bold text-gray-900">Sarah Ahmed <span className="text-[12px] font-normal text-gray-500 ml-1">(Patient)</span></p>
            </div>
            <div className="col-span-1">
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Reported Entity</p>
              <p className="text-[14px] font-bold text-[#5C2D91]">Dr. Mike Bruce <span className="text-[12px] font-normal text-gray-500 ml-1">(Therapist)</span></p>
            </div>
            <div className="col-span-2 mt-2">
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Primary Issue</p>
              <span className="inline-flex items-center px-2.5 py-1 bg-red-50 text-red-700 rounded-md text-[12px] font-bold border border-red-100 mt-1">
                Unprofessional Behavior
              </span>
            </div>
          </div>
  
          <div className="flex flex-col gap-5 mb-8">
            <div>
              <label className="block text-[12px] font-bold text-gray-600 uppercase tracking-wide mb-2">Determine Resolution Action</label>
              <div className="relative">
                <i className="ph-bold ph-gavel absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg"></i>
                <select defaultValue="" className="w-full bg-white border border-gray-200 rounded-[14px] pl-11 pr-4 py-3.5 text-[14px] font-medium text-gray-900 focus:outline-none focus:border-[#5C2D91] focus:ring-1 focus:ring-[#5C2D91] appearance-none transition-colors">
                  <option value="" disabled>Select an official action...</option>
                  <option value="warning">Issue Official Warning to Therapist</option>
                  <option value="suspend">Temporarily Suspend Therapist Account</option>
                  <option value="dismiss">Dismiss Report (No Violation Found)</option>
                </select>
                <i className="ph-bold ph-caret-down absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"></i>
              </div>
            </div>
            <div>
              <label className="block text-[12px] font-bold text-gray-600 uppercase tracking-wide mb-2">Admin Investigation Notes</label>
              <textarea rows="4" placeholder="Detail your findings, evidence reviewed, and justification for this action. These notes remain internal." className="w-full bg-gray-50 border border-gray-200 rounded-[14px] px-4 py-3.5 text-[14px] font-medium text-gray-900 focus:outline-none focus:border-[#5C2D91] focus:bg-white transition-colors resize-none"></textarea>
            </div>
          </div>
  
          <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
            <button 
              onClick={onClose}
              className="px-6 py-3.5 bg-white border border-gray-200 text-gray-600 rounded-[14px] text-[13px] font-bold hover:bg-gray-50 transition-colors shadow-sm"
            >
              Cancel
            </button>
            <button 
              onClick={onClose}
              className="px-6 py-3.5 bg-[#5C2D91] text-white rounded-[14px] text-[14px] font-bold hover:bg-[#4a2474] shadow-lg shadow-purple-900/20 transition-all flex items-center justify-center min-w-[200px]"
            >
              Submit Final Resolution
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  export default InvestigateModal;