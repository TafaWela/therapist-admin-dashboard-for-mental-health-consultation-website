function TherapistProfileModal({ onClose }) {
    return (
      // استخدام fixed عشان يغطي الشاشة كلها
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        
        {/* الخلفية السودة الشفافة */}
        <div 
          className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in" 
          onClick={onClose}
        ></div>
  
        {/* محتوى المودال */}
        <div className="relative w-full max-w-2xl bg-white rounded-[24px] p-8 shadow-2xl animate-pop-in flex flex-col">
          
          {/* الهيدر وصورة الدكتور */}
          <div className="flex justify-between items-start mb-6 border-b border-gray-100 pb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gray-100 border-2 border-white shadow-sm overflow-hidden flex items-center justify-center text-gray-400">
                <i className="ph-fill ph-user text-3xl"></i>
              </div>
              <div>
                <h3 className="text-[22px] font-extrabold text-gray-900">Dr. Mike Bruce</h3>
                <p className="text-[14px] text-[#5C2D91] font-bold mt-1">Trauma Specialist</p>
              </div>
            </div>
            {/* زرار الإغلاق */}
            <button 
              onClick={onClose} 
              className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors"
            >
              <i className="ph-bold ph-x text-sm"></i>
            </button>
          </div>
  
          {/* بيانات الدكتور */}
          <div className="grid grid-cols-2 gap-y-6 gap-x-8 mb-4">
            <div className="col-span-1">
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Email Address</p>
              <p className="text-[14px] font-semibold text-gray-800 flex items-center gap-2">
                <i className="ph-fill ph-envelope-simple text-gray-400"></i> dr.bruce@neurea.com
              </p>
            </div>
  
            <div className="col-span-1">
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Phone Number</p>
              <p className="text-[14px] font-semibold text-gray-800 flex items-center gap-2">
                <i className="ph-fill ph-phone text-gray-400"></i> +20 100 222 3333
              </p>
            </div>
  
            <div className="col-span-1">
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">License Number</p>
              <p className="text-[14px] font-semibold text-gray-800">#MED-84920-EG</p>
            </div>
  
            <div className="col-span-1">
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Account Status</p>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-green-50 text-green-600 rounded-md text-[12px] font-bold mt-1">
                <div className="w-2 h-2 rounded-full bg-green-500"></div> Active
              </div>
            </div>
            
            {/* بلوك الإحصائيات الرمادي */}
            <div className="col-span-2 bg-[#F8F9FA] rounded-[16px] p-5 border border-gray-100 flex justify-around mt-2">
              <div className="text-center">
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Active Patients</p>
                <p className="text-[24px] font-extrabold text-[#5C2D91] mt-1">42</p>
              </div>
              <div className="w-px bg-gray-200"></div>
              <div className="text-center">
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Avg Rating</p>
                <p className="text-[24px] font-extrabold text-amber-500 flex items-center justify-center gap-1 mt-1">
                  4.9 <i className="ph-fill ph-star text-[20px]"></i>
                </p>
              </div>
              <div className="w-px bg-gray-200"></div>
              <div className="text-center">
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Total Sessions</p>
                <p className="text-[24px] font-extrabold text-gray-800 mt-1">315</p>
              </div>
            </div>
          </div>
  
          {/* الفوتر وزرار الـ Close */}
          <div className="flex justify-end items-center border-t border-gray-100 pt-6 mt-2">
            <button 
              onClick={onClose} 
              className="px-6 py-2.5 bg-white border border-gray-200 text-gray-600 rounded-[10px] text-[13px] font-bold hover:bg-gray-50 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  export default TherapistProfileModal;