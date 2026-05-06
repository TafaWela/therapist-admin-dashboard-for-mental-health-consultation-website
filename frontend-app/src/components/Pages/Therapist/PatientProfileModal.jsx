import React from 'react';

function PatientProfileModal({ isOpen, onClose, patient, setActiveTab }) {
  // لو الـ Modal مقفول، ماتعملش ريندر لحاجة
  if (!isOpen || !patient) return null;

  // دالة صغيرة عشان نحدد لون حالة الـ Mood
  const getMoodColors = (mood) => {
    switch (mood) {
      case 'critical': return { bg: 'bg-red-50', border: 'border-red-100', text: 'text-red-600', dot: 'bg-red-600' };
      case 'stable': return { bg: 'bg-emerald-50', border: 'border-emerald-100', text: 'text-emerald-600', dot: 'bg-emerald-500' };
      default: return { bg: 'bg-red-50', border: 'border-red-100', text: 'text-red-500', dot: 'bg-red-500' }; // Anxious
    }
  };

  const moodColors = getMoodColors(patient.mood);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* الخلفية الضبابية (الضغط عليها بيقفل المودال) */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-[fadeIn_0.3s_ease-out]" 
        onClick={onClose}
      ></div>
      
      {/* محتوى المودال */}
      <div className="relative w-full max-w-2xl bg-white rounded-[24px] p-8 shadow-2xl animate-[slideUp_0.4s_cubic-bezier(0.16,1,0.3,1)] flex flex-col z-10">
        
        {/* Header: اسم المريض وصورته */}
        <div className="flex justify-between items-start mb-6 border-b border-gray-100 pb-6">
          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center font-bold text-2xl border-2 border-white shadow-sm ${patient.colorBg} ${patient.colorText}`}>
              {patient.initials}
            </div>
            <div>
              <h3 className="text-[22px] font-extrabold text-gray-900">{patient.firstName} {patient.lastName}</h3>
              <p className="text-[14px] text-gray-500 font-medium mt-1">
                Patient ID: <span className="text-gray-800 font-bold">{patient.id}</span>
              </p>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors">
            <i className="ph-bold ph-x text-sm"></i>
          </button>
        </div>

        {/* تفاصيل المريض (Grid) */}
        <div className="grid grid-cols-2 gap-y-6 gap-x-8 mb-6">
          <div className="col-span-1">
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Email Address</p>
            <p className="text-[14px] font-semibold text-gray-800 flex items-center gap-2">
              <i className="ph-fill ph-envelope-simple text-gray-400"></i> {patient.firstName.toLowerCase()}@example.com
            </p>
          </div>
          <div className="col-span-1">
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Phone Number</p>
            <p className="text-[14px] font-semibold text-gray-800 flex items-center gap-2">
              <i className="ph-fill ph-phone text-gray-400"></i> +20 100 456 7890
            </p>
          </div>
          <div className="col-span-1">
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Subscription Plan</p>
            {patient.plan === 'pro' ? (
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-purple-50 text-[#5C2D91] rounded-md text-[12px] font-bold mt-1">
                <i className="ph-fill ph-diamonds-four"></i> Neurea Pro
              </div>
            ) : (
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gray-100 text-gray-600 rounded-md text-[12px] font-bold mt-1">
                Standard
              </div>
            )}
          </div>
          <div className="col-span-1">
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Recent AI Mood Tracking</p>
            <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[12px] font-bold mt-1 border ${moodColors.bg} ${moodColors.text} ${moodColors.border}`}>
              <div className={`w-2 h-2 rounded-full animate-pulse ${moodColors.dot}`}></div> 
              {patient.moodLabel}
            </div>
          </div>
        </div>

        {/* AI Insights & Schedule */}
        <div className="bg-[#F8F9FA] rounded-[16px] p-5 mb-2 border border-gray-100">
          <h4 className="text-[13px] font-bold text-gray-800 mb-2 flex items-center gap-2">
            <i className="ph-bold ph-brain text-[#5C2D91]"></i> Neurea AI Insights:
          </h4>
          <p className="text-[13px] text-gray-600 leading-relaxed mb-4">
            The patient's sentiment analysis indicates elevated stress levels over the past 24 hours. Sleep patterns reported via the app show disruptions. Consider discussing grounding techniques in the upcoming session.
          </p>
          <div className="w-full h-px bg-gray-200 my-3"></div>
          <div className="flex justify-between items-center">
            <p className="text-[13px] font-bold text-gray-800">Next Scheduled Session:</p>
            <p className="text-[13px] font-bold text-[#5C2D91] bg-white border border-purple-100 px-3 py-1 rounded-lg shadow-sm">
              {patient.nextSession}
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex justify-between items-center border-t border-gray-100 pt-6 mt-4">
          <button 
            onClick={() => { 
              onClose(); 
              setActiveTab('chat'); // يودينا على شاشة الشات
            }} 
            className="px-5 py-2.5 bg-white border border-gray-200 text-[#5C2D91] rounded-[12px] text-[13px] font-bold hover:bg-purple-50 transition-colors flex items-center gap-2 shadow-sm"
          >
            <i className="ph-bold ph-chat-teardrop-text text-lg"></i> Direct Message
          </button>
          
          <div className="flex gap-3">
            <button onClick={onClose} className="px-6 py-2.5 bg-white border border-gray-200 text-gray-600 rounded-[12px] text-[13px] font-bold hover:bg-gray-50 transition-colors">
              Close Profile
            </button>
            <button className="px-6 py-2.5 bg-[#5C2D91] text-white rounded-[12px] text-[13px] font-bold hover:bg-[#4a2474] shadow-lg shadow-purple-900/20 transition-all">
              Write Prescription
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default PatientProfileModal;