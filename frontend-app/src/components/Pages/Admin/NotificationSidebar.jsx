import { useState } from 'react';

// الداتا المبدئية للإشعارات
const initialNotifications = [
  {
    id: '1',
    title: 'New Patient Registration',
    time: 'Just now',
    timeStyle: 'text-[#5C2D91] bg-purple-50 px-2 py-1 rounded-md',
    message: <><span className="font-bold text-gray-900">Omar Hassan</span> completed the AI intake assessment.</>,
    icon: 'ph-user-plus',
    iconColor: 'bg-purple-50 text-[#5C2D91]',
    isUnread: true,
    actionButton: 'Review Intake'
  },
  {
    id: '2',
    title: 'New Pro Plan Subscriber',
    time: '2h ago',
    timeStyle: 'text-gray-400',
    message: <><span className="font-bold text-gray-900">Layla Mahmoud</span> upgraded to Neurea Pro.</>,
    icon: 'ph-star',
    iconColor: 'bg-blue-50 text-blue-600',
    isUnread: true,
    actionButton: null
  }
];

function NotificationSidebar({ isOpen, onClose }) {
  const [notifications, setNotifications] = useState(initialNotifications);

  // حساب عدد الإشعارات اللي لسه متقرتش
  const unreadCount = notifications.filter(n => n.isUnread).length;

  // دالة لتحديد كل الإشعارات كمقروءة
  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isUnread: false })));
  };

  // دالة لقراءة إشعار واحد
  const markAsRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, isUnread: false } : n));
  };

  return (
    <div className={`fixed inset-0 z-[60] ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
      
      <div 
        onClick={onClose}
        className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
      ></div>

      <div 
        className={`absolute top-0 right-0 h-full w-full sm:w-[420px] bg-white shadow-2xl z-[70] transform transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-white shrink-0">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center text-[#5C2D91]">
              <i className="ph-bold ph-bell-ringing text-[20px]"></i>
            </div>
            <div>
              <h3 className="text-[18px] font-extrabold text-gray-900">Notifications</h3>
              <p className="text-[12px] text-gray-500 font-medium">{unreadCount} unread alerts</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <button 
                onClick={markAllRead}
                className="text-[11px] font-bold text-[#5C2D91] hover:bg-purple-50 px-3 py-1.5 rounded-[8px] transition-colors"
              >
                Mark all read
              </button>
            )}
            <button 
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center bg-gray-50 hover:bg-gray-200 text-gray-600 rounded-full transition-colors"
            >
              <i className="ph-bold ph-x text-sm"></i>
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 bg-[#F8F9FA]">
          {notifications.map((notif) => (
            <div 
              key={notif.id}
              onClick={() => markAsRead(notif.id)}
              className={`p-5 bg-white border rounded-[16px] shadow-sm flex gap-3 transition-colors relative overflow-hidden group cursor-pointer ${notif.isUnread ? 'border-purple-200 hover:border-[#5C2D91]' : 'border-gray-100 opacity-70'}`}
            >
              {notif.isUnread && (
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#5C2D91]"></div>
              )}

              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ml-1 ${notif.iconColor}`}>
                <i className={`ph-bold ${notif.icon} text-lg`}></i>
              </div>

              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="text-[14px] font-bold text-gray-900">{notif.title}</h4>
                  <span className={`text-[10px] font-bold ${notif.timeStyle}`}>
                    {notif.time}
                  </span>
                </div>
                <p className="text-[13px] text-gray-600 leading-relaxed mt-1">
                  {notif.message}
                </p>
                {notif.actionButton && (
                  <div className="mt-3 flex gap-2">
                    <button className="px-3 py-2 bg-[#5C2D91] text-white rounded-[8px] text-[11px] font-bold hover:bg-[#4a2474] transition-colors flex items-center gap-1.5">
                      {notif.actionButton}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {notifications.length === 0 && (
             <div className="text-center p-8 text-gray-500 text-sm">No new notifications</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default NotificationSidebar;