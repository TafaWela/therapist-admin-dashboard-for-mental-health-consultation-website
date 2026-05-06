import React from 'react';

function NotificationSidebar({ isOpen, onClose, setActiveTab }) {
  return (
    <>
      {/* الخلفية الضبابية (Overlay) */}
      <div 
        onClick={onClose}
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] transition-opacity duration-300 ${
          isOpen ? 'opacity-100 block' : 'opacity-0 hidden pointer-events-none'
        }`}
      ></div>

      {/* شريط الإشعارات نفسه */}
      <div 
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white shadow-2xl z-[70] transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
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
            <button 
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center bg-gray-50 hover:bg-gray-200 text-gray-600 rounded-full transition-colors"
            >
              <i className="ph-bold ph-x text-sm"></i>
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 bg-[#F8F9FA] no-scrollbar">
          
          {/* Notification 1 */}
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
              <div className="mt-3 flex gap-2">
                <button 
                  onClick={() => {
                    setActiveTab('patients');
                    onClose();
                  }} 
                  className="px-3 py-2 bg-[#5C2D91] text-white rounded-[8px] text-[11px] font-bold hover:bg-[#4a2474] transition-colors flex items-center gap-1.5"
                >
                  <i className="ph-bold ph-user-circle"></i> View Patient File
                </button>
              </div>
            </div>
          </div>

          {/* Notification 2 */}
          <div className="p-5 bg-white border border-purple-100 rounded-[16px] shadow-sm flex gap-3 transition-colors relative overflow-hidden hover:border-[#5C2D91]">
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#5C2D91]"></div>
            
            <div className="w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center text-[#5C2D91] shrink-0 ml-1">
              <i className="ph-bold ph-calendar-plus text-lg"></i>
            </div>
            
            <div className="flex-1">
              <div className="flex justify-between items-start mb-1">
                <h4 className="text-[14px] font-bold text-gray-900">New Session Booked</h4>
                <span className="text-[10px] font-bold text-gray-400">2h ago</span>
              </div>
              <p className="text-[13px] text-gray-600 leading-relaxed mt-1">
                New patient <span className="font-bold text-gray-900">Nour Youssef</span> has scheduled a <span className="font-semibold text-[#5C2D91]">Live Chat</span> session for <span className="font-bold text-gray-900">Wed at 3:00 PM</span>.
              </p>
              <div className="mt-3 flex gap-2">
                <button 
                  onClick={() => {
                    setActiveTab('schedule');
                    onClose();
                  }}
                  className="px-3 py-2 bg-white border border-gray-200 text-gray-700 rounded-[8px] text-[11px] font-bold hover:bg-gray-50 transition-colors"
                >
                  Review Schedule
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default NotificationSidebar;