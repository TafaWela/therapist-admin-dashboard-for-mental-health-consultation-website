import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // اتأكدي من مسار الـ Auth
// @ts-ignore
import logo from './LOGO.png'; 

import ProfileSettings from './Ad_setting/ProfileSettings';
import SecuritySettings from './Ad_setting/SecuritySettings';

function Settings() {
  const [activeTab, setActiveTab] = useState('profile');
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="w-full h-screen flex flex-col bg-[#F4F5F9] font-sans text-[#1E1E2A]">
      {/* Header */}
      <header className="h-[72px] bg-white border-b border-gray-200 flex items-center justify-between px-8 shrink-0 shadow-sm z-20">
        <div className="h-20 flex items-center px-6">
          <img src={logo} alt="Neurea Logo" className="h-14 w-auto object-contain" />
          <span className="text-gray-400 font-bold text-[11px] uppercase tracking-widest ml-3 mt-1 opacity-80">Admin</span>
        </div>

        <div className="flex items-center gap-5">
          <button className="relative text-gray-500 hover:text-[#5C2D91] transition-colors">
            <i className="ph-bold ph-bell text-[22px]"></i>
            <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
          <div className="flex items-center gap-3 pl-6 border-l border-gray-200">
            <div className="flex flex-col items-end">
              <span className="text-[14px] font-bold text-[#1E1E2A] leading-tight">Yousef Mohamed</span>
              <span className="text-[11px] font-medium text-gray-400">Super Admin</span>
            </div>
            <img src="https://i.pravatar.cc/150?u=drmike" alt="User Avatar" className="w-10 h-10 rounded-full object-cover border border-gray-200 hover:ring-2 hover:ring-purple-500/20 cursor-pointer" />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden flex max-w-6xl w-full mx-auto p-8 gap-8">
        
        {/* Settings Sidebar */}
        <aside className="w-64 shrink-0 flex flex-col gap-1">
          <button onClick={() => navigate('/admin')} className="flex items-center gap-2.5 px-4 py-2.5 mb-2 text-[16px] font-bold text-[#5C2D91] hover:text-purple-800 transition-all group w-full text-left">
            <i className="ph-bold ph-arrow-left text-lg transition-transform group-hover:-translate-x-1"></i>
            Back to Dashboard
          </button>
          
          <h2 className="text-[20px] font-extrabold text-[#1E1E2A] mb-4 pl-2">Settings</h2>

          <button 
            onClick={() => setActiveTab('profile')} 
            className={`flex items-center gap-3 px-4 py-3 text-[14px] rounded-r-lg transition-all text-left w-full border-l-4 ${activeTab === 'profile' ? 'bg-[#F5EBFF] text-[#5C2D91] font-bold border-[#5C2D91]' : 'text-gray-600 hover:bg-gray-50 border-transparent'}`}
          >
            <i className="ph-bold ph-user-circle text-lg"></i> Personal Profile
          </button>

          <button 
            onClick={() => setActiveTab('security')} 
            className={`flex items-center gap-3 px-4 py-3 text-[14px] rounded-r-lg transition-all text-left w-full border-l-4 ${activeTab === 'security' ? 'bg-[#F5EBFF] text-[#5C2D91] font-bold border-[#5C2D91]' : 'text-gray-600 hover:bg-gray-50 border-transparent'}`}
          >
            <i className="ph-bold ph-lock-key text-lg"></i> Security & Password
          </button>

          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 text-[14px] text-red-500 hover:bg-red-50 rounded-lg transition-all text-left w-full mt-auto mb-4 border-l-4 border-transparent">
            <i className="ph-bold ph-sign-out text-lg"></i> Log out
          </button>
        </aside>

        {/* Dynamic Content */}
        <main className="flex-1 bg-white rounded-[24px] shadow-sm border border-gray-100 overflow-y-auto no-scrollbar relative">
          {activeTab === 'profile' && <ProfileSettings />}
          {activeTab === 'security' && <SecuritySettings />}
        </main>

      </div>
    </div>
  );
}

export default Settings;