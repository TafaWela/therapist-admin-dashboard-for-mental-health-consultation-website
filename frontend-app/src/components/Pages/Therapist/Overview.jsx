import React, { useState } from 'react';
import AppointmentDetailsModal from './AppointmentDetailsModal';

function Overview({ setActiveTab }) {
  // حالة (State) لفتح وقفل المودال
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  
  // حالة لتخزين بيانات الموعد اللي دوسنا عليه
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  // دالة بتفتح المودال وتاخد بيانات المريض
  const openDetails = (patientData) => {
    setSelectedAppointment(patientData);
    setIsDetailsModalOpen(true);
  };

  return (
    <div className="animate-[fadeIn_0.4s_ease-out_forwards] flex flex-col gap-6 relative">
      
      {/* الترحيب */}
      <div>
        <h3 className="text-[24px] font-extrabold text-[#1E1E2A]">Good morning, Dr. Mike!</h3>
        <p className="text-[14px] text-[#7E7E8C]">
          You have <span className="font-bold text-[#5C2D91]">4 chat sessions</span> scheduled for today.
        </p>
      </div>

      {/* الإحصائيات (Stats) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-[20px] p-6 shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-[12px] font-bold text-gray-400 uppercase tracking-wider mb-1">Active Patients</p>
            <h4 className="text-[28px] font-extrabold text-[#1E1E2A]">142</h4>
            <p className="text-[11px] font-semibold text-emerald-500 mt-1">
              <i className="ph-bold ph-trend-up"></i> +3 this week
            </p>
          </div>
          <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
            <i className="ph-fill ph-users text-2xl"></i>
          </div>
        </div>

        <div className="bg-white rounded-[20px] p-6 shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-[12px] font-bold text-gray-400 uppercase tracking-wider mb-1">Hours Completed</p>
            <h4 className="text-[28px] font-extrabold text-[#1E1E2A]">18.0 <span className="text-lg text-gray-400">hrs</span></h4>
            <p className="text-[11px] font-semibold text-[#7E7E8C] mt-1">This week</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center text-[#5C2D91]">
            <i className="ph-fill ph-clock text-2xl"></i>
          </div>
        </div>

        <div className="bg-white rounded-[20px] p-6 shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-[12px] font-bold text-gray-400 uppercase tracking-wider mb-1">Upcoming Earnings</p>
            <h4 className="text-[28px] font-extrabold text-[#1E1E2A]">$1,250</h4>
            <p className="text-[11px] font-semibold text-gray-400 mt-1">Pending payout</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500">
            <i className="ph-fill ph-wallet text-2xl"></i>
          </div>
        </div>
      </div>

      {/* المواعيد ومؤشرات الذكاء الاصطناعي */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-2">
        
        {/* مواعيد اليوم */}
        <div className="lg:col-span-2 bg-white rounded-[20px] shadow-sm border border-gray-100 p-6 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-[16px] font-bold text-[#1E1E2A]">Today's Appointments</h4>
            <button onClick={() => setActiveTab('schedule')} className="text-[13px] font-bold text-[#5C2D91] hover:underline">
              View Schedule
            </button>
          </div>

          <div className="flex flex-col gap-4">
            
            {/* موعد 1: سارة أحمد */}
            <div className="flex items-center justify-between p-4 bg-purple-50 rounded-[16px] border border-purple-100">
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-center justify-center w-14 h-14 bg-white rounded-[12px] shadow-sm">
                  <span className="text-[16px] font-extrabold text-[#5C2D91] leading-none">10:00</span>
                  <span className="text-[10px] font-bold text-gray-400 uppercase">AM</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[15px] font-bold text-[#1E1E2A]">Sarah Ahmed</span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-md">
                      <i className="ph-fill ph-chat-text"></i> Live Chat
                    </span>
                    <span className="text-[11px] font-medium text-gray-500">Anxiety Assessment</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setActiveTab('chat')} 
                className="px-5 py-2.5 bg-[#5C2D91] hover:bg-purple-800 text-white text-[13px] font-bold rounded-[10px] transition-colors shadow-md"
              >
                Open Chat
              </button>
            </div>

            {/* موعد 2: محمد علي (مع زرار Details بيفتح المودال) */}
            <div className="flex items-center justify-between p-4 bg-white hover:bg-gray-50 rounded-[16px] border border-gray-100 transition-colors">
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-center justify-center w-14 h-14 bg-gray-50 rounded-[12px]">
                  <span className="text-[16px] font-extrabold text-[#1E1E2A] leading-none">1:00</span>
                  <span className="text-[10px] font-bold text-gray-400 uppercase">PM</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[15px] font-bold text-[#1E1E2A]">Mohamed Ali</span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-md">
                      <i className="ph-fill ph-chat-text"></i> Live Chat
                    </span>
                    <span className="text-[11px] font-medium text-gray-500">Follow-up Session</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => openDetails({
                  initials: 'MA',
                  name: 'Mohamed Ali',
                  id: '#P-3921',
                  time: 'Today, 1:00 PM',
                  type: 'Live Chat',
                  topic: 'Follow-up Session',
                  colorBg: 'bg-green-50',
                  colorText: 'text-green-600'
                })}
                className="px-5 py-2.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 text-[13px] font-bold rounded-[10px] transition-colors"
              >
                Details
              </button>
            </div>

            {/* موعد 3: إيما واتسون (مع زرار Details بيفتح المودال) */}
            <div className="flex items-center justify-between p-4 bg-white hover:bg-gray-50 rounded-[16px] border border-gray-100 transition-colors">
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-center justify-center w-14 h-14 bg-gray-50 rounded-[12px]">
                  <span className="text-[16px] font-extrabold text-[#1E1E2A] leading-none">3:00</span>
                  <span className="text-[10px] font-bold text-gray-400 uppercase">PM</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[15px] font-bold text-[#1E1E2A]">Emma Watson</span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-md">
                      <i className="ph-fill ph-chat-text"></i> Live Chat
                    </span>
                    <span className="text-[11px] font-medium text-gray-500">CBT Exercises</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => openDetails({
                  initials: 'EW',
                  name: 'Emma Watson',
                  id: '#P-2287',
                  time: 'Today, 3:00 PM',
                  type: 'Live Chat',
                  topic: 'CBT Exercises',
                  colorBg: 'bg-orange-50',
                  colorText: 'text-orange-600'
                })}
                className="px-5 py-2.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 text-[13px] font-bold rounded-[10px] transition-colors"
              >
                Details
              </button>
            </div>

          </div>
        </div>

        {/* مؤشرات الذكاء الاصطناعي */}
        <div className="bg-white rounded-[20px] shadow-sm border border-gray-100 p-6 flex flex-col">
          <div className="flex items-center justify-between mb-5">
            <h4 className="text-[16px] font-bold text-[#1E1E2A] flex items-center gap-2">
              <i className="ph-fill ph-sparkle text-[#5C2D91]"></i> Patient AI Insights
            </h4>
          </div>
          <p className="text-[12px] text-gray-500 mb-4">Recent mood shifts and alerts generated by Neurea App.</p>

          <div className="flex flex-col gap-3">
            <div className="p-3 border-l-4 border-red-500 bg-red-50 rounded-r-[12px]">
              <div className="flex justify-between items-start mb-1">
                <span className="text-[13px] font-bold text-[#1E1E2A]">Sarah Ahmed</span>
                <span className="text-[10px] text-gray-400">2h ago</span>
              </div>
              <p className="text-[11px] text-gray-600">Logged <span className="font-bold text-red-600">High Anxiety</span> in daily check-in.</p>
            </div>

            <div className="p-3 border-l-4 border-orange-400 bg-orange-50 rounded-r-[12px]">
              <div className="flex justify-between items-start mb-1">
                <span className="text-[13px] font-bold text-[#1E1E2A]">Ahmed Hassan</span>
                <span className="text-[10px] text-gray-400">5h ago</span>
              </div>
              <p className="text-[11px] text-gray-600">Used the <span className="font-bold text-orange-600">Crisis Chat</span> module.</p>
            </div>
            
            <div className="p-3 border-l-4 border-emerald-500 bg-emerald-50 rounded-r-[12px]">
              <div className="flex justify-between items-start mb-1">
                <span className="text-[13px] font-bold text-[#1E1E2A]">Mohamed Ali</span>
                <span className="text-[10px] text-gray-400">1d ago</span>
              </div>
              <p className="text-[11px] text-gray-600">Completed 3 consecutive days of Positive Journaling. Mood trending up.</p>
            </div>
          </div>

          <button onClick={() => setActiveTab('patients')} className="mt-auto pt-4 text-[13px] font-bold text-[#5C2D91] hover:underline text-center">
            View all patient reports
          </button>
        </div>

      </div>

      {/* المناداة على مودال التفاصيل */}
      <AppointmentDetailsModal 
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        appointment={selectedAppointment}
        setActiveTab={setActiveTab}
      />

    </div>
  );
}

export default Overview;