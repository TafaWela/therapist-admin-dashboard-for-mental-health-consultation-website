import React, { useState } from 'react';

function AddPatientModal({ isOpen, onClose }) {
  const [saveStatus, setSaveStatus] = useState('idle');

  if (!isOpen) return null;

  const handleAddPatient = () => {
    setSaveStatus('loading');
    // محاكاة لعملية الإضافة (ممكن هنا تبعتي الداتا للسيرفر بعدين)
    setTimeout(() => {
      setSaveStatus('saved');
      setTimeout(() => {
        setSaveStatus('idle');
        onClose(); // يقفل المودال بعد الحفظ
      }, 1000);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* الخلفية الضبابية */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-[fadeIn_0.3s_ease-out]" 
        onClick={onClose}
      ></div>
      
      {/* محتوى المودال */}
      <div className="relative w-full max-w-xl bg-white rounded-[24px] p-8 shadow-2xl animate-[slideUp_0.4s_cubic-bezier(0.16,1,0.3,1)] flex flex-col z-10">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center text-[#5C2D91]">
              <i className="ph-bold ph-user-plus text-xl"></i>
            </div>
            <h3 className="text-[20px] font-extrabold text-[#1E1E2A]">Add New Patient</h3>
          </div>
          <button onClick={onClose} className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors">
            <i className="ph-bold ph-x text-sm"></i>
          </button>
        </div>
        
        <p className="text-[13px] text-gray-500 mb-6">
          Register a new patient into the Neurea system. They will receive an email invitation to download the app.
        </p>
        
        {/* الفورم (Grid) */}
        <div className="grid grid-cols-2 gap-5 mb-8">
          <div className="col-span-1">
            <label className="block text-[12px] font-bold text-gray-500 uppercase tracking-wide mb-2">First Name</label>
            <input type="text" placeholder="e.g. Ahmed" className="w-full bg-gray-50 border border-gray-200 rounded-[14px] px-4 py-3.5 text-[14px] font-medium text-[#1E1E2A] focus:outline-none focus:border-[#5C2D91] focus:bg-white transition-colors" />
          </div>
          <div className="col-span-1">
            <label className="block text-[12px] font-bold text-gray-500 uppercase tracking-wide mb-2">Last Name</label>
            <input type="text" placeholder="e.g. Hassan" className="w-full bg-gray-50 border border-gray-200 rounded-[14px] px-4 py-3.5 text-[14px] font-medium text-[#1E1E2A] focus:outline-none focus:border-[#5C2D91] focus:bg-white transition-colors" />
          </div>
          <div className="col-span-2">
            <label className="block text-[12px] font-bold text-gray-500 uppercase tracking-wide mb-2">Email Address</label>
            <div className="relative">
              <i className="ph-bold ph-envelope-simple absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg"></i>
              <input type="email" placeholder="patient@example.com" className="w-full bg-gray-50 border border-gray-200 rounded-[14px] pl-11 pr-4 py-3.5 text-[14px] font-medium text-[#1E1E2A] focus:outline-none focus:border-[#5C2D91] focus:bg-white transition-colors" />
            </div>
          </div>
          <div className="col-span-1">
            <label className="block text-[12px] font-bold text-gray-500 uppercase tracking-wide mb-2">Date of Birth</label>
            <div className="relative">
              <i className="ph-bold ph-calendar-blank absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg"></i>
              <input type="date" className="w-full bg-gray-50 border border-gray-200 rounded-[14px] pl-11 pr-4 py-3.5 text-[14px] font-medium text-[#1E1E2A] focus:outline-none focus:border-[#5C2D91] focus:bg-white transition-colors" />
            </div>
          </div>
          <div className="col-span-1">
            <label className="block text-[12px] font-bold text-gray-500 uppercase tracking-wide mb-2">Phone Number</label>
            <div className="relative">
              <i className="ph-bold ph-phone absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg"></i>
              <input type="tel" placeholder="+20 100 000 0000" className="w-full bg-gray-50 border border-gray-200 rounded-[14px] pl-11 pr-4 py-3.5 text-[14px] font-medium text-[#1E1E2A] focus:outline-none focus:border-[#5C2D91] focus:bg-white transition-colors" />
            </div>
          </div>
          <div className="col-span-2">
            <label className="block text-[12px] font-bold text-gray-500 uppercase tracking-wide mb-2">Plan Status</label>
            <div className="relative">
              <i className="ph-bold ph-star absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg"></i>
              <select className="w-full bg-gray-50 border border-gray-200 rounded-[14px] pl-11 pr-4 py-3.5 text-[14px] font-medium text-[#1E1E2A] focus:outline-none focus:border-[#5C2D91] focus:bg-white transition-colors appearance-none">
                <option value="standard">Standard Plan</option>
                <option value="pro">Neurea Pro Plan</option>
              </select>
              <i className="ph-bold ph-caret-down absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"></i>
            </div>
          </div>
        </div>
        
        {/* Footer Actions */}
        <div className="flex justify-end gap-3 border-t border-gray-100 pt-6">
          <button onClick={onClose} className="px-6 py-3.5 bg-white border border-gray-200 text-gray-600 rounded-[14px] text-[13px] font-bold hover:bg-gray-50 transition-colors shadow-sm">
            Cancel
          </button>
          <button 
            onClick={handleAddPatient} 
            disabled={saveStatus !== 'idle'}
            className={`px-6 py-3.5 text-white rounded-[14px] text-[14px] font-bold transition-all flex items-center justify-center min-w-[180px] gap-2 ${saveStatus === 'saved' ? 'bg-emerald-500 shadow-emerald-900/20' : 'bg-[#5C2D91] hover:bg-purple-800 shadow-purple-900/20'} ${saveStatus !== 'idle' ? 'pointer-events-none' : ''}`}
          >
            {saveStatus === 'idle' && 'Register Patient'}
            {saveStatus === 'loading' && <i className="ph-bold ph-spinner-gap animate-spin text-lg"></i>}
            {saveStatus === 'saved' && <><i className="ph-bold ph-check text-lg"></i> Registered</>}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddPatientModal;