import React, { useState } from 'react';

function TherapistSecuritySettings() {
  const [saveStatus, setSaveStatus] = useState('idle');

  const handleSave = () => {
    setSaveStatus('loading');
    setTimeout(() => {
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 1500);
    }, 800);
  };

  return (
    <div className="p-8 animate-[fadeIn_0.4s_ease-out_forwards]">
      <div className="border-b border-gray-100 pb-5 mb-8">
        <h3 className="text-[18px] font-bold text-[#1E1E2A]">Security & Password</h3>
        <p className="text-[13px] text-gray-500 mt-1">Manage your password and multi-factor authentication.</p>
      </div>

      <div className="flex flex-col gap-6 max-w-lg">
        <div>
          <label className="block text-[12px] font-bold text-gray-500 uppercase tracking-wide mb-2">Current Password</label>
          <input type="password" placeholder="Enter current password" className="w-full bg-gray-50 border border-gray-200 rounded-[12px] px-4 py-3 text-[14px] font-medium text-[#1E1E2A] focus:outline-none focus:border-[#5C2D91] focus:bg-white transition-colors" />
        </div>
        <div>
          <label className="block text-[12px] font-bold text-gray-500 uppercase tracking-wide mb-2">New Password</label>
          <input type="password" placeholder="Create new password" className="w-full bg-gray-50 border border-gray-200 rounded-[12px] px-4 py-3 text-[14px] font-medium text-[#1E1E2A] focus:outline-none focus:border-[#5C2D91] focus:bg-white transition-colors" />
        </div>
        <div>
          <label className="block text-[12px] font-bold text-gray-500 uppercase tracking-wide mb-2">Confirm New Password</label>
          <input type="password" placeholder="Confirm new password" className="w-full bg-gray-50 border border-gray-200 rounded-[12px] px-4 py-3 text-[14px] font-medium text-[#1E1E2A] focus:outline-none focus:border-[#5C2D91] focus:bg-white transition-colors" />
        </div>

        <div className="mt-2">
          <button 
            onClick={handleSave}
            disabled={saveStatus !== 'idle'}
            className={`px-6 py-3 text-white rounded-[12px] text-[14px] font-bold transition-all shadow-md active:scale-95 w-48 flex justify-center items-center gap-2 ${saveStatus === 'saved' ? 'bg-emerald-500' : 'bg-[#5C2D91] hover:bg-purple-800'} ${saveStatus !== 'idle' ? 'pointer-events-none' : ''}`}
          >
            {saveStatus === 'idle' && 'Update Password'}
            {saveStatus === 'loading' && <i className="ph-bold ph-spinner-gap animate-spin text-lg"></i>}
            {saveStatus === 'saved' && <><i className="ph-bold ph-check text-lg"></i> Saved</>}
          </button>
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <h4 className="text-[15px] font-bold text-[#1E1E2A] mb-1">Two-Factor Authentication (2FA)</h4>
            <p className="text-[13px] text-gray-500">Adds an extra layer of security to your account.</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" defaultChecked className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#10B981]"></div>
          </label>
        </div>
      </div>
    </div>
  );
}

export default TherapistSecuritySettings;