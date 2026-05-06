import React, { useState } from 'react';

function TherapistProfileSettings() {
  const [saveStatus, setSaveStatus] = useState('idle'); // 'idle' | 'loading' | 'saved'

  const handleSave = () => {
    setSaveStatus('loading');
    setTimeout(() => {
      setSaveStatus('saved');
      setTimeout(() => {
        setSaveStatus('idle');
      }, 1500);
    }, 800);
  };

  return (
    <div className="p-8 animate-[fadeIn_0.4s_ease-out_forwards]">
      <div className="border-b border-gray-100 pb-5 mb-8">
        <h3 className="text-[18px] font-bold text-[#1E1E2A]">Personal Profile</h3>
        <p className="text-[13px] text-gray-500 mt-1">Update your photo and personal details here.</p>
      </div>

      <div className="flex items-center gap-6 mb-8">
        <img src="https://i.pravatar.cc/150?u=drmike" alt="User" className="w-20 h-20 rounded-full object-cover border-2 border-purple-100 shadow-sm" />
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-[#5C2D91] text-white rounded-lg text-[13px] font-bold hover:bg-purple-800 transition-colors shadow-sm">
            Upload new picture
          </button>
          <button className="px-4 py-2 bg-white border border-gray-200 text-gray-600 rounded-lg text-[13px] font-bold hover:bg-gray-50 transition-colors">
            Remove
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="col-span-1">
          <label className="block text-[12px] font-bold text-gray-500 uppercase tracking-wide mb-2">First Name</label>
          <input type="text" defaultValue="Mike" className="w-full bg-gray-50 border border-gray-200 rounded-[12px] px-4 py-3 text-[14px] font-medium text-[#1E1E2A] focus:outline-none focus:border-[#5C2D91] focus:bg-white transition-colors" />
        </div>
        <div className="col-span-1">
          <label className="block text-[12px] font-bold text-gray-500 uppercase tracking-wide mb-2">Last Name</label>
          <input type="text" defaultValue="Bruce" className="w-full bg-gray-50 border border-gray-200 rounded-[12px] px-4 py-3 text-[14px] font-medium text-[#1E1E2A] focus:outline-none focus:border-[#5C2D91] focus:bg-white transition-colors" />
        </div>
        <div className="col-span-1">
          <label className="block text-[12px] font-bold text-gray-500 uppercase tracking-wide mb-2">Email Address</label>
          <input type="email" defaultValue="dr.bruce@neurea.com" readOnly className="w-full bg-gray-100 border border-gray-200 rounded-[12px] px-4 py-3 text-[14px] font-medium text-gray-500 cursor-not-allowed focus:outline-none transition-colors" />
        </div>
        <div className="col-span-1">
          <label className="block text-[12px] font-bold text-gray-500 uppercase tracking-wide mb-2">Phone Number</label>
          <input type="tel" defaultValue="+1 (555) 123-4567" className="w-full bg-gray-50 border border-gray-200 rounded-[12px] px-4 py-3 text-[14px] font-medium text-[#1E1E2A] focus:outline-none focus:border-[#5C2D91] focus:bg-white transition-colors" />
        </div>
        <div className="col-span-1">
          <label className="block text-[12px] font-bold text-gray-500 uppercase tracking-wide mb-2">Professional Title</label>
          <input type="text" defaultValue="Clinical Psychologist" className="w-full bg-gray-50 border border-gray-200 rounded-[12px] px-4 py-3 text-[14px] font-medium text-[#1E1E2A] focus:outline-none focus:border-[#5C2D91] focus:bg-white transition-colors" />
        </div>
        <div className="col-span-1">
          <label className="block text-[12px] font-bold text-gray-500 uppercase tracking-wide mb-2">Years of Experience</label>
          <input type="number" defaultValue="12" className="w-full bg-gray-50 border border-gray-200 rounded-[12px] px-4 py-3 text-[14px] font-medium text-[#1E1E2A] focus:outline-none focus:border-[#5C2D91] focus:bg-white transition-colors" />
        </div>
        <div className="col-span-2">
          <label className="block text-[12px] font-bold text-gray-500 uppercase tracking-wide mb-2">Location / Clinic Address</label>
          <div className="relative">
            <i className="ph-bold ph-map-pin absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg"></i>
            <input type="text" defaultValue="12 Wellness Street, October Gardens, Giza" className="w-full bg-gray-50 border border-gray-200 rounded-[12px] pl-11 pr-4 py-3 text-[14px] font-medium text-[#1E1E2A] focus:outline-none focus:border-[#5C2D91] focus:bg-white transition-colors" />
          </div>
        </div>
        <div className="col-span-2">
          <label className="block text-[12px] font-bold text-gray-500 uppercase tracking-wide mb-2">Bio / About Me</label>
          <textarea rows={4} defaultValue="Certified clinical psychologist specializing in Trauma & PTSD. I use a combination of CBT and mindfulness techniques to help patients regain control of their lives." className="w-full bg-gray-50 border border-gray-200 rounded-[12px] px-4 py-3 text-[14px] font-medium text-[#1E1E2A] focus:outline-none focus:border-[#5C2D91] focus:bg-white transition-colors resize-none"></textarea>
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <button 
          onClick={handleSave}
          disabled={saveStatus !== 'idle'}
          className={`px-6 py-3 text-white rounded-[12px] text-[14px] font-bold transition-all shadow-md active:scale-95 w-40 flex justify-center items-center gap-2 ${saveStatus === 'saved' ? 'bg-emerald-500' : 'bg-[#5C2D91] hover:bg-purple-800'} ${saveStatus !== 'idle' ? 'pointer-events-none' : ''}`}
        >
          {saveStatus === 'idle' && 'Save Changes'}
          {saveStatus === 'loading' && <i className="ph-bold ph-spinner-gap animate-spin text-lg"></i>}
          {saveStatus === 'saved' && <><i className="ph-bold ph-check text-lg"></i> Saved</>}
        </button>
      </div>
    </div>
  );
}

export default TherapistProfileSettings;