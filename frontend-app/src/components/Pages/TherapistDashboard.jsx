import React, { useState } from 'react';

// استيراد القوائم والشريط الجانبي
import TherapistSidebar from './Therapist/Sidebar';
import TherapistNavbar from './Therapist/Navbar';
import NotificationSidebar from './Therapist/NotificationSidebar'; // ضفنا الاستيراد ده

// استيراد الشاشات
import Overview from './Therapist/Overview';
import Schedule from './Therapist/Schedule';
import Patients from './Therapist/Patients';
import ChatSessions from './Therapist/ChatSessions';
import Medications from './Therapist/Medications';
import Earnings from './Therapist/Earnings';

function TherapistDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isNotifOpen, setIsNotifOpen] = useState(false); // الحالة المسؤولة عن فتح وقفل الإشعارات

  return (
    <div className="flex h-screen bg-[#F4F5F9] font-sans text-[#1E1E2A] overflow-hidden relative">
      
      {/* 1. القائمة الجانبية الأساسية */}
      <TherapistSidebar activeTab={activeTab} setActiveTab={setActiveTab} onOpenNotifications={() => setIsNotifOpen(true)} />
      
      {/* منطقة المحتوى الرئيسية */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* 2. الهيدر العلوي */}
        <TherapistNavbar activeTab={activeTab} setIsNotifOpen={setIsNotifOpen} />
        
        {/* 3. الشاشات المتغيرة */}
        <main className="flex-1 p-8 overflow-y-auto relative no-scrollbar">
          {activeTab === 'dashboard' && <Overview setActiveTab={setActiveTab} />}
          {activeTab === 'schedule' && <Schedule />}
          {activeTab === 'patients' && <Patients setActiveTab={setActiveTab} />}
          {activeTab === 'chat' && <ChatSessions />}
          {activeTab === 'medications' && <Medications />}
          {activeTab === 'earnings' && <Earnings />}
        </main>
      </div>

      {/* 4. شريط الإشعارات الجانبي */}
      <NotificationSidebar 
        isOpen={isNotifOpen} 
        onClose={() => setIsNotifOpen(false)} 
        setActiveTab={setActiveTab} 
      />

    </div>
  );
}

export default TherapistDashboard;