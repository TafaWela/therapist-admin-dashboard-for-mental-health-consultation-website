import React from 'react';
import { useNavigate } from 'react-router-dom';

function TherapistNavbar({ activeTab, setIsNotifOpen }) {
  const navigate = useNavigate();

  // 1. دالة ذكية عشان تغير عنوان الـ Navbar حسب هو واقف في أي صفحة
  const getTitle = () => {
    switch (activeTab) {
      case 'dashboard':
        return 'Overview Dashboard';
      case 'patients':
        return 'My Patients';
      case 'sessions':
        return 'Live Sessions';
      case 'messages':
        return 'Messages';
      default:
        return 'Dashboard';
    }
  };

  // 2. كود بيجيب تاريخ النهاردة بشكل حقيقي
  const todayDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8 z-10 shrink-0">
      
      {/* الجزء الخاص بالعنوان والتاريخ */}
      <div className="flex flex-col">
        <span id="header-date" className="text-[12px] font-bold text-[#7E7E8C] uppercase tracking-wide">
          {todayDate}
        </span>
        <h2 id="header-title" className="text-[20px] font-extrabold text-[#1E1E2A]">
          {getTitle()}
        </h2>
      </div>

      {/* الجزء الخاص بالبحث والبروفايل */}
      <div className="flex items-center gap-6">
        
        {/* شريط البحث */}
        <div className="relative hidden md:block">
          <i className="ph-bold ph-magnifying-glass absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
          <input 
            type="text" 
            placeholder="Search patients..."
            className="bg-gray-50 border border-gray-200 rounded-full pl-10 pr-4 py-2 text-[13px] focus:outline-none focus:border-[#5C2D91] focus:bg-white transition-colors w-64"
          />
        </div>

        {/* زرار الإشعارات */}
        <button 
          onClick={() => setIsNotifOpen(true)}
          className="relative text-gray-500 hover:text-[#5C2D91] transition-colors"
        >
          <i className="ph-bold ph-bell text-[22px]"></i>
          <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        {/* بروفايل الدكتور */}
        <div className="flex items-center gap-3 pl-6 border-l border-gray-200">
          <div className="flex flex-col items-end">
            <span className="text-[14px] font-bold text-[#1E1E2A] leading-tight">Dr. Mike Bruce</span>
            <span className="text-[11px] font-medium text-[#7E7E8C]">Clinical Psychologist</span>
          </div>

          <img 
            onClick={() => navigate('/therapist-settings')}
            src="https://i.pravatar.cc/150?u=drmike" 
            alt="Dr. Mike"
            className="w-10 h-10 rounded-full object-cover border border-gray-200 hover:ring-2 hover:ring-[#5C2D91]/20 cursor-pointer transition-transform hover:scale-105 active:scale-95"
          />
        </div>
      </div>
    </header>
  );
}

export default TherapistNavbar;