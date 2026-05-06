import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
// @ts-ignore
import logo from './LOGO.png'; 

import TherapistProfileSettings from './Th_setting/TherapistProfileSettings';
import TherapistSecuritySettings from './Th_setting/TherapistSecuritySettings';

function TherapistSettings() {
  const [activeTab, setActiveTab] = useState('profile');
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="w-full h-screen flex flex-col bg-gray-100 font-sans text-[#1E1E2A] absolute top-0 left-0">
      {/* Header */}
      <header className="h-[72px] bg-white border-b border-gray-200 flex items-center justify-between px-8 shrink-0 shadow-sm z-20">
        <div className="h-20 flex items-center px-6 border-b border-gray-100">
          <img src={logo} alt="Neurea Logo" className="h-14 w-auto object-contain" />
          <span className="text-gray-400 font-bold text-[11px] uppercase tracking-widest ml-3 mt-1 opacity-80">therapist</span>
        </div>

        <div className="flex items-center gap-5">
          <button 
            onClick={() => setIsNotifOpen(true)}
            className="relative text-gray-500 hover:text-[#5C2D91] transition-colors"
          >
            <i className="ph-bold ph-bell text-[22px]"></i>
            <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
          <div className="flex items-center gap-3 pl-6 border-l border-gray-200 cursor-pointer">
            <div className="flex flex-col items-end">
              <span className="text-[14px] font-bold text-[#1E1E2A] leading-tight">Dr. Mike Bruce</span>
              <span className="text-[11px] font-medium text-[#7E7E8C]">Clinical Psychologist</span>
            </div>
            <img src="https://i.pravatar.cc/150?u=drmike" alt="Dr. Mike" className="w-10 h-10 rounded-full object-cover border border-gray-200 hover:ring-2 hover:ring-[#5C2D91]/20 transition-transform hover:scale-105 active:scale-95" />
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex-1 overflow-hidden flex max-w-6xl w-full mx-auto p-8 gap-8 relative">
        
        {/* Sidebar */}
        <aside className="w-64 shrink-0 flex flex-col gap-1">
          <button onClick={() => navigate('/therapist')} className="flex items-center gap-2.5 px-4 py-2.5 mb-2 text-[16px] font-bold text-[#5C2D91] hover:text-purple-800 transition-all group w-full text-left">
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

        {/* Content Area */}
        <main className="flex-1 bg-white rounded-[24px] shadow-sm border border-gray-100 overflow-y-auto no-scrollbar relative">
          {activeTab === 'profile' && <TherapistProfileSettings />}
          {activeTab === 'security' && <TherapistSecuritySettings />}
        </main>
      </div>

      {/* --- Notification Sidebar Logic --- */}
      <div 
        onClick={() => setIsNotifOpen(false)} 
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] transition-opacity duration-300 ${isNotifOpen ? 'opacity-100 block' : 'opacity-0 hidden pointer-events-none'}`}
      ></div>

      <div className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white shadow-2xl z-[70] transform transition-transform duration-300 ease-in-out flex flex-col ${isNotifOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-white shrink-0">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center text-[#5C2D91]">
              <i className="ph-bold ph-bell-ringing text-[20px]"></i>
            </div>
            <div>
              <h3 className="text-[18px] font-extrabold text-gray-900">Notifications</h3>
              <p className="text-[12px] text-gray-500 font-medium">2 unread alerts</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="text-[11px] font-bold text-[#5C2D91] hover:bg-purple-50 px-3 py-1.5 rounded-[8px] transition-colors">
              Mark all read
            </button>
            <button onClick={() => setIsNotifOpen(false)} className="w-8 h-8 flex items-center justify-center bg-gray-50 hover:bg-gray-200 text-gray-600 rounded-full transition-colors">
              <i className="ph-bold ph-x text-sm"></i>
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 bg-[#F8F9FA]">
          {/* Notification Items */}
          <div className="p-5 bg-white border border-purple-100 rounded-[16px] shadow-sm flex gap-3 transition-colors relative overflow-hidden group hover:border-[#5C2D91]">
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#5C2D91]"></div>
            <div className="w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center text-[#5C2D91] shrink-0 ml-1">
              <i className="ph-bold ph-calendar-plus text-lg"></i>
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start mb-1">
                <h4 className="text-[14px] font-bold text-gray-900">New Session Booked</h4>
                <span className="text-[10px] font-bold text-[#5C2D91] bg-purple-50 px-2 py-1 rounded-md">Just now</span>
              </div>
              <p className="text-[13px] text-gray-600 leading-relaxed mt-1">
                New patient <span className="font-bold text-gray-900">Ahmed Ali</span> has scheduled a <span className="font-semibold text-[#5C2D91]">Live Chat</span> session for <span className="font-bold text-gray-900">Mon at 1:00 PM</span>.
              </p>
            </div>
          </div>
          {/* ضيفي بقية الـ Notifications براحتك هنا */}
        </div>
      </div>

    </div>
  );
}

export default TherapistSettings;