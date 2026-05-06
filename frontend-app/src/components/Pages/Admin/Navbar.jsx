import { useState } from 'react';
import NotificationSidebar from './NotificationSidebar';
import { useNavigate } from 'react-router-dom';
function Navbar({ activeTab }) {
  const navigate = useNavigate();
  // 1. الـ State اللي بيتحكم في ظهور واختفاء قائمة الإشعارات
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  // اللمسة السحرية: تغيير عنوان الصفحة بناءً على التابة اللي اليوزر دايس عليها
  const getTitle = () => {
    switch (activeTab) {
      case 'dashboard': return 'System Overview';
      case 'reports': return 'Trust & Safety';
      case 'therapists': return 'Therapists Management';
      case 'patients': return 'Patients Database';
      case 'support': return 'Help Center Inbox';
      case 'notifications': return 'Notifications';
      default: return 'System Overview';
    }
  };

  return (
    // استخدمنا <> و </> عشان نجمع الهيدر وقائمة الإشعارات مع بعض
    <>
      <header className="h-[88px] bg-white border-b border-gray-200 flex items-center justify-between px-8 z-10 shrink-0">
        <div className="flex flex-col">
          <span id="header-date" className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
            Tuesday, March 18
          </span>
          <h2 id="header-title" className="text-[22px] font-extrabold text-[#111827]">
            {getTitle()}
          </h2>
        </div>

        <div className="flex items-center gap-6">
          <div className="relative hidden md:block">
            <i className="ph-bold ph-magnifying-glass absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg"></i>
            <input
              type="text"
              placeholder="Search users or reports..."
              className="bg-gray-50 border border-gray-200 rounded-full pl-11 pr-4 py-2.5 text-[13px] font-medium text-gray-700 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors w-72"
            />
          </div>

          {/* 2. ربطنا زرار الجرس بفتح القائمة */}
          <button
            onClick={() => setIsNotifOpen(true)}
            className="relative text-gray-500 hover:text-blue-500 transition-colors"
          >
            <i className="ph-bold ph-bell text-[22px]"></i>
            {/* النقطة الحمرا بتاعة الإشعارات */}
            <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
          </button>

          <div className="flex items-center gap-3 pl-6 border-l border-gray-200 cursor-pointer">
            <div className="flex flex-col items-end">
              <span className="text-[14px] font-bold text-[#111827] leading-tight">Yousef Mohamed</span>
              <span className="text-[11px] font-medium text-gray-400">Super Admin</span>
            </div>
            <a href="#profile" className="block transition-transform hover:scale-105 active:scale-95">
              <img
                onClick={() => navigate('/settings')}
                src="https://i.pravatar.cc/150?u=drmike"
                alt="Admin Profile"
                className="w-10 h-10 rounded-full object-cover border border-gray-200 hover:ring-2 hover:ring-blue-500/20 cursor-pointer transition-transform hover:scale-105 active:scale-95"
              />
            </a>
          </div>
        </div>
      </header>

      {/* 3. استدعاء الكومبوننت بتاع القائمة الجانبية */}
      <NotificationSidebar isOpen={isNotifOpen} onClose={() => setIsNotifOpen(false)} />
    </>
  );
}

export default Navbar;