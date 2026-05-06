import React from 'react';

function AppointmentDetailsModal({ isOpen, onClose, appointment, setActiveTab }) {
  // لو المودال مقفول أو مفيش بيانات موعد مبعوتة، ماتعرضش حاجة
  if (!isOpen || !appointment) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* الخلفية الضبابية (الضغط عليها بيقفل المودال) */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-[fadeIn_0.3s_ease-out]" 
        onClick={onClose}
      ></div>
  
      {/* محتوى المودال */}
      <div className="relative w-full max-w-md bg-white rounded-[24px] p-8 shadow-2xl animate-[slideUp_0.4s_cubic-bezier(0.16,1,0.3,1)] flex flex-col z-10">
  
        {/* Header: اسم المريض */}
        <div className="flex justify-between items-start mb-6 border-b border-gray-100 pb-5">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl ${appointment.colorBg || 'bg-green-50'} ${appointment.colorText || 'text-green-600'}`}>
              {appointment.initials}
            </div>
            <div>
              <h3 className="text-[18px] font-extrabold text-gray-900">{appointment.name}</h3>
              <p className="text-[13px] text-gray-500 font-medium mt-0.5">
                Patient ID: <span className="font-bold text-gray-700">{appointment.id}</span>
              </p>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors">
            <i className="ph-bold ph-x text-sm"></i>
          </button>
        </div>
  
        {/* تفاصيل الموعد */}
        <div className="flex flex-col gap-3 mb-6">
          
          <div className="flex items-center justify-between p-3.5 bg-gray-50 rounded-[14px] border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-purple-50 flex items-center justify-center text-[#5C2D91]">
                <i className="ph-bold ph-clock text-lg"></i>
              </div>
              <div>
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Scheduled Time</p>
                <p className="text-[14px] font-bold text-gray-900">{appointment.time}</p>
              </div>
            </div>
          </div>
  
          <div className="flex items-center justify-between p-3.5 bg-gray-50 rounded-[14px] border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                <i className="ph-bold ph-chat-teardrop-text text-lg"></i>
              </div>
              <div>
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Session Type</p>
                <p className="text-[14px] font-bold text-gray-900">{appointment.type}</p>
              </div>
            </div>
            <span className="px-2.5 py-1 bg-green-100 text-green-700 text-[11px] font-bold rounded-md">Confirmed</span>
          </div>
  
          <div className="flex items-center justify-between p-3.5 bg-gray-50 rounded-[14px] border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                <i className="ph-bold ph-file-text text-lg"></i>
              </div>
              <div>
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Topic / Reason</p>
                <p className="text-[14px] font-bold text-gray-900">{appointment.topic}</p>
              </div>
            </div>
          </div>
  
        </div>
  
        {/* Footer Actions */}
        <div className="flex justify-between items-center border-t border-gray-100 pt-5">
          <button className="text-[13px] font-bold text-gray-500 hover:text-red-500 transition-colors">
            Reschedule
          </button>
          <div className="flex gap-2">
            <button onClick={onClose} className="px-5 py-2.5 bg-white border border-gray-200 text-gray-600 rounded-[10px] text-[13px] font-bold hover:bg-gray-50 transition-colors shadow-sm">
              Close
            </button>
            <button 
              onClick={() => {
                onClose();
                setActiveTab('chat'); // بيقفل المودال ويفتح الشات
              }} 
              className="px-5 py-2.5 bg-[#5C2D91] text-white rounded-[10px] text-[13px] font-bold hover:bg-[#4a2474] shadow-md shadow-purple-900/20 transition-all flex items-center gap-2"
            >
              Open Chat <i className="ph-bold ph-arrow-right"></i>
            </button>
          </div>
        </div>
  
      </div>
    </div>
  );
}

export default AppointmentDetailsModal;