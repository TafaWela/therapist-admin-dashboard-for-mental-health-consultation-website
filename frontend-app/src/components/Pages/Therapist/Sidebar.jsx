import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import logo from '../LOGO.png'; // اللوجو اتظبط هنا

function Sidebar({ activeTab, setActiveTab, onOpenNotifications }) {
  const navigate = useNavigate();
  const { logout } = useAuth();

  // دالة لتسجيل الخروج
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // دالة سحرية بتحدد شكل التابة (لو هي اللي متداس عليها هتنور موف، لو لأ هتبقى رمادي)
  const getTabClass = (tabName) => {
    const isActive = activeTab === tabName;
    return `flex items-center gap-3 px-6 py-3 text-[14px] transition-all text-left w-full focus:outline-none border-l-4 ${
      isActive 
        ? 'bg-purple-50/50 text-[#5C2D91] border-[#5C2D91] font-bold' 
        : 'text-gray-600 hover:bg-gray-50 border-transparent'
    }`;
  };

  // دالة مخصوصة لتابة الـ Schedule عشان فيها Badge (رقم)
  const getScheduleTabClass = () => {
    const isActive = activeTab === 'schedule';
    return `flex items-center justify-between px-6 py-3 text-[14px] transition-all text-left w-full focus:outline-none border-l-4 ${
      isActive 
        ? 'bg-purple-50/50 text-[#5C2D91] border-[#5C2D91] font-bold' 
        : 'text-gray-600 hover:bg-gray-50 border-transparent'
    }`;
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col flex-shrink-0 z-20">
      {/* منطقة اللوجو */}
      <div className="h-20 flex items-center px-6 border-b border-gray-100">
        <img src={logo} alt="Neurea Logo" className="h-14 w-auto object-contain" />
        <span className="text-gray-400 font-bold text-[11px] uppercase tracking-widest ml-3 mt-1 opacity-80">
          Therapist
        </span>
      </div>

      {/* الروابط (Navigation) */}
      <nav className="flex-1 py-6 flex flex-col gap-2 overflow-y-auto">
        <p className="px-6 text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Main Menu</p>

        <button 
          onClick={() => setActiveTab('dashboard')} 
          className={getTabClass('dashboard')}
        >
          <i className="ph-bold ph-squares-four text-lg"></i> Overview
        </button>

        <button 
          onClick={() => setActiveTab('schedule')} 
          className={getScheduleTabClass()}
        >
          <div className="flex items-center gap-3">
            <i className="ph-bold ph-calendar-blank text-lg"></i> Schedule
          </div>
          <span className="bg-red-100 text-red-600 py-0.5 px-2 rounded-full text-[10px] font-bold">2 Req</span>
        </button>

        <button 
          onClick={() => setActiveTab('patients')} 
          className={getTabClass('patients')}
        >
          <i className="ph-bold ph-users text-lg"></i> Patients Directory
        </button>

        <button 
          onClick={() => setActiveTab('chat')} 
          className={getTabClass('chat')}
        >
          <i className="ph-bold ph-chat-teardrop-text text-lg"></i> Chat Sessions
        </button>

        <button 
          onClick={() => setActiveTab('medications')} 
          className={getTabClass('medications')}
        >
          <i className="ph-bold ph-pill text-lg"></i> Medications
        </button>

        <p className="px-6 text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2 mt-6">Finance</p>

        <button 
          onClick={() => setActiveTab('earnings')} 
          className={getTabClass('earnings')}
        >
          <i className="ph-bold ph-wallet text-lg"></i> Earnings & Wallet
        </button>
        
        {/* زرار الإشعارات (بيفتح القائمة الجانبية) */}
        <button 
          onClick={onOpenNotifications} 
          className="flex items-center gap-3 px-6 py-3.5 text-[14px] text-gray-600 hover:bg-gray-50 transition-all text-left w-full focus:outline-none border-l-4 border-transparent"
        >
          <div className="relative">
            <i className="ph-bold ph-bell text-lg"></i>
          </div>
          Notifications
        </button>
      </nav>

      {/* زرار تسجيل الخروج */}
      <div className="p-4 border-t border-gray-100">
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 w-full p-2 hover:bg-red-50 rounded-xl transition-colors text-gray-600 hover:text-red-600 text-left"
        >
          <i className="ph-bold ph-sign-out text-lg"></i>
          <span className="text-[14px] font-semibold">Log out</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;