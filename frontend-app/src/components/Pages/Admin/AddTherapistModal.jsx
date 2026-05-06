function AddTherapistModal({ onClose }) {
    return (
      // هنا استخدمنا fixed عشان المودال يغطي الشاشة كلها
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        
        {/* الخلفية السودة الشفافة (لما ندوس عليها هتقفل المودال) */}
        <div 
          className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in" 
          onClick={onClose}
        ></div>
  
        {/* محتوى المودال */}
        <div className="relative w-full max-w-xl bg-white rounded-[24px] p-8 shadow-2xl animate-pop-in flex flex-col">
          <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center text-neurea-primary">
                <i className="ph-bold ph-user-plus text-xl"></i>
              </div>
              <h3 className="text-[20px] font-extrabold text-neurea-textDark">Add New Therapist</h3>
            </div>
            {/* زرار الـ X للإغلاق */}
            <button 
              onClick={onClose}
              className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors"
            >
              <i className="ph-bold ph-x text-sm"></i>
            </button>
          </div>
  
          <p className="text-[13px] text-gray-500 mb-6">
            Create a new account for a verified clinical professional. They will receive an email to complete their profile setup.
          </p>
  
          {/* الفورمة بتاعت إضافة دكتور جديد */}
          <div className="grid grid-cols-2 gap-5 mb-8">
            <div className="col-span-1">
              <label className="block text-[12px] font-bold text-gray-500 uppercase tracking-wide mb-2">First Name</label>
              <input 
                type="text" 
                placeholder="e.g. Sarah"
                className="w-full bg-gray-50 border border-gray-200 rounded-[14px] px-4 py-3.5 text-[14px] font-medium text-neurea-textDark focus:outline-none focus:border-neurea-primary focus:bg-white transition-colors"
              />
            </div>
            <div className="col-span-1">
              <label className="block text-[12px] font-bold text-gray-500 uppercase tracking-wide mb-2">Last Name</label>
              <input 
                type="text" 
                placeholder="e.g. Connor"
                className="w-full bg-gray-50 border border-gray-200 rounded-[14px] px-4 py-3.5 text-[14px] font-medium text-neurea-textDark focus:outline-none focus:border-neurea-primary focus:bg-white transition-colors"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-[12px] font-bold text-gray-500 uppercase tracking-wide mb-2">Work Email Address</label>
              <div className="relative">
                <i className="ph-bold ph-envelope-simple absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg"></i>
                <input 
                  type="email" 
                  placeholder="dr.name@neurea.com"
                  className="w-full bg-gray-50 border border-gray-200 rounded-[14px] pl-11 pr-4 py-3.5 text-[14px] font-medium text-neurea-textDark focus:outline-none focus:border-neurea-primary focus:bg-white transition-colors"
                />
              </div>
            </div>
            <div className="col-span-2">
              <label className="block text-[12px] font-bold text-gray-500 uppercase tracking-wide mb-2">Temporary Password</label>
              <div className="relative">
                <i className="ph-bold ph-lock-key absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg"></i>
                <input 
                  type="text" 
                  defaultValue="WelcomeToNeurea123!"
                  className="w-full bg-gray-50 border border-gray-200 rounded-[14px] pl-11 pr-4 py-3.5 text-[14px] font-medium text-neurea-textDark focus:outline-none focus:border-neurea-primary focus:bg-white transition-colors"
                />
              </div>
            </div>
            <div className="col-span-2">
              <label className="block text-[12px] font-bold text-gray-500 uppercase tracking-wide mb-2">Specialist / Title</label>
              <div className="relative">
                <i className="ph-bold ph-briefcase absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg"></i>
                <input 
                  type="text" 
                  placeholder="e.g. Clinical Psychologist, Trauma Specialist"
                  className="w-full bg-gray-50 border border-gray-200 rounded-[14px] pl-11 pr-4 py-3.5 text-[14px] font-medium text-neurea-textDark focus:outline-none focus:border-neurea-primary focus:bg-white transition-colors"
                />
              </div>
            </div>
          </div>
  
          <div className="flex justify-end gap-3 border-t border-gray-100 pt-6">
            <button 
              onClick={onClose}
              className="px-6 py-3.5 bg-white border border-gray-200 text-gray-600 rounded-[14px] text-[13px] font-bold hover:bg-gray-50 transition-colors shadow-sm"
            >
              Cancel
            </button>
            <button 
              onClick={onClose}
              className="px-6 py-3.5 bg-purple-800 text-white rounded-[14px] text-[14px] font-bold hover:bg-purple-800 shadow-lg shadow-purple-900/20 transition-all flex items-center justify-center min-w-[180px]"
            >
              Add Therapist
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  export default AddTherapistModal;