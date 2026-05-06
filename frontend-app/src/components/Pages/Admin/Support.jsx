import { useState } from 'react';

// الداتا الوهمية للتيكتات عشان نجرب بيها براحتنا
const ticketsData = [
  {
    id: '#TKT-8921',
    subject: 'Login Authentication Issue',
    senderName: 'Ahmed Hassan',
    senderEmail: 'ahmed@example.com',
    role: 'Patient',
    time: '10:42 AM',
    date: 'Today at 10:42 AM',
    preview: 'I am trying to log into the app but I keep getting an error saying my password...',
    fullMessage: "Hello support team,\n\nI am trying to log into the app, but I keep getting an error saying my password is incorrect. I requested a password reset email twice, but I haven't received anything in my inbox or spam folder.\n\nCould you please help me regain access to my account? I have a session booked for tomorrow.\n\nThanks,\nAhmed",
    status: 'read',
    initials: 'AH',
    avatarColor: 'bg-blue-100 text-blue-600'
  },
  {
    id: '#TKT-8922',
    subject: 'Payment method failing',
    senderName: 'Emma Watson',
    senderEmail: 'emma.w@example.com',
    role: 'Patient',
    time: '09:15 AM',
    date: 'Today at 09:15 AM',
    preview: 'My credit card is being declined when I try to upgrade to Neurea Pro...',
    fullMessage: "Hi there,\n\nMy credit card is being declined when I try to upgrade to Neurea Pro. I have checked with my bank and there are no issues on their end.\n\nCan you please check what's going wrong?\n\nEmma",
    status: 'unread',
    initials: 'EW',
    avatarColor: 'bg-pink-100 text-pink-600'
  },
];
function Support() {
  // State عشان نحدد انهي تيكت مفتوحة دلوقتي (هنخلي أول واحدة هي اللي مفتوحة افتراضياً)
  const [selectedTicketId, setSelectedTicketId] = useState(ticketsData[0].id);
  const [replyText, setReplyText] = useState('');

  // بنجيب كل بيانات التيكت المفتوحة
  const selectedTicket = ticketsData.find(ticket => ticket.id === selectedTicketId);

  const handleSendReply = () => {
    if (replyText.trim() === '') return;
    alert(`Reply sent to ${selectedTicket.senderName}!\n\nMessage: ${replyText}`);
    setReplyText(''); // بنفضي المربع بعد الإرسال
  };

  return (
    <div id="view-support" className="view-section animate-fade-in flex flex-col h-full">
      <div className="flex justify-between items-end mb-6">
        <div className="flex flex-col">
          <h3 className="text-[24px] font-extrabold text-neurea-textDark">Help Center Inbox</h3>
          <p className="text-[13px] text-gray-500">Manage and respond to user support inquiries and feedback.</p>
        </div>
      </div>

      <div className="bg-white rounded-[20px] shadow-sm border border-gray-100 flex flex-1 overflow-hidden min-h-[600px]">
        
        {/* الجزء اللي على الشمال (قائمة التيكتات) */}
        <div className="w-1/3 border-r border-gray-100 flex flex-col bg-gray-50/30">
          <div className="p-4 border-b border-gray-100">
            <div className="relative mb-3">
              <i className="ph-bold ph-magnifying-glass absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              <input 
                type="text" 
                placeholder="Search tickets..." 
                className="w-full bg-white border border-gray-200 rounded-xl pl-9 pr-3 py-2 text-[13px] focus:outline-none focus:border-neurea-primary" 
              />
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1 bg-[#5C2D91] text-white rounded-lg text-[11px] font-bold shadow-sm">All</button>
              <button className="px-3 py-1 bg-white border border-gray-200 text-gray-600 rounded-lg text-[11px] font-bold hover:bg-gray-50">Unread (1)</button>
              <button className="px-3 py-1 bg-white border border-gray-200 text-gray-600 rounded-lg text-[11px] font-bold hover:bg-gray-50">Resolved</button>
            </div>
          </div>
          
          <div className="overflow-y-auto flex-1 no-scrollbar">
            {ticketsData.map((ticket) => (
              <div 
                key={ticket.id}
                onClick={() => setSelectedTicketId(ticket.id)}
                className={`p-4 border-b border-gray-100 cursor-pointer border-l-4 transition-colors relative ${selectedTicketId === ticket.id ? 'bg-purple-50/50 border-l-neurea-primary' : 'bg-white hover:bg-gray-50 border-l-transparent'}`}
              >
                {ticket.status === 'unread' && (
                  <div className="absolute top-4 right-4 w-2 h-2 bg-blue-500 rounded-full"></div>
                )}
                <div className="flex justify-between items-start mb-1 pr-4">
                  <span className={`text-[13px] font-bold ${selectedTicketId === ticket.id ? 'text-neurea-textDark' : 'text-gray-700'}`}>
                    {ticket.subject}
                  </span>
                  <span className="text-[10px] text-gray-400 font-medium">{ticket.time}</span>
                </div>
                <div className="flex justify-between items-center mb-1">
                  <span className={`text-[12px] font-semibold ${selectedTicketId === ticket.id ? 'text-neurea-primary' : 'text-gray-600'}`}>
                    {ticket.senderName}
                  </span>
                  <span className="text-[9px] font-bold bg-gray-100 text-gray-500 px-2 py-0.5 rounded border border-gray-200">
                    {ticket.role}
                  </span>
                </div>
                <p className="text-[11px] text-gray-500 mt-1 truncate pr-2">{ticket.preview}</p>
              </div>
            ))}
          </div>
        </div>

        {/* الجزء اللي على اليمين (تفاصيل التيكت المفتوحة) */}
        <div className="flex-1 flex flex-col bg-white">
          {selectedTicket ? (
            <>
              {/* هيدر التيكت */}
              <div className="p-5 border-b border-gray-100 flex justify-between items-center shrink-0">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-[14px] ${selectedTicket.avatarColor}`}>
                    {selectedTicket.initials}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[15px] font-bold text-neurea-textDark flex items-center gap-2">
                      {selectedTicket.subject} 
                      <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full border border-gray-200 font-semibold">
                        {selectedTicket.id}
                      </span>
                    </span>
                    <span className="text-[12px] text-gray-500">
                      From: <span className="font-semibold text-gray-700">{selectedTicket.senderName}</span> ({selectedTicket.senderEmail})
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1.5 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-lg text-[12px] font-bold flex items-center gap-1 hover:bg-emerald-100 transition-colors">
                    <i className="ph-bold ph-check"></i> Mark Resolved
                  </button>
                  <button className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-lg text-gray-400 hover:bg-gray-50 transition-colors">
                    <i className="ph-bold ph-dots-three-vertical"></i>
                  </button>
                </div>
              </div>

              {/* جسم المحادثة */}
              <div className="flex-1 overflow-y-auto p-6 bg-gray-50/30 flex flex-col gap-6 no-scrollbar">
                <div className="flex gap-4 max-w-3xl">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-[12px] shrink-0 ${selectedTicket.avatarColor}`}>
                    {selectedTicket.initials}
                  </div>
                  <div className="flex flex-col gap-1 w-full">
                    <div className="flex items-center gap-2">
                      <span className="text-[13px] font-bold text-neurea-textDark">{selectedTicket.senderName}</span>
                      <span className="text-[10px] text-gray-400 font-medium">{selectedTicket.date}</span>
                    </div>
                    {/* استخدمنا whitespace-pre-wrap عشان الـ \n تنزل سطر جديد شكلها نظيف */}
                    <div className="bg-white border border-gray-200 rounded-r-[16px] rounded-bl-[16px] p-4 text-[13px] text-gray-600 leading-relaxed shadow-sm whitespace-pre-wrap">
                      {selectedTicket.fullMessage}
                    </div>
                  </div>
                </div>
              </div>

              {/* صندوق الرد */}
              <div className="p-5 border-t border-gray-100 bg-white shrink-0">
                <div className="border border-gray-200 rounded-[16px] overflow-hidden focus-within:border-neurea-primary transition-colors bg-white">
                  <div className="bg-gray-50 px-3 py-2 border-b border-gray-200 flex items-center gap-3 text-gray-500">
                    <i className="ph-bold ph-text-b hover:text-neurea-primary cursor-pointer transition-colors"></i>
                    <i className="ph-bold ph-text-italic hover:text-neurea-primary cursor-pointer transition-colors"></i>
                    <i className="ph-bold ph-link hover:text-neurea-primary cursor-pointer transition-colors"></i>
                    <div className="w-px h-4 bg-gray-300"></div>
                    <i className="ph-bold ph-paperclip hover:text-neurea-primary cursor-pointer transition-colors"></i>
                  </div>
                  <textarea 
                    rows="4" 
                    placeholder={`Type your reply to ${selectedTicket.senderName.split(' ')[0]}...`}
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    className="w-full p-4 text-[13px] text-neurea-textDark focus:outline-none resize-none"
                  ></textarea>
                  <div className="bg-white px-4 py-3 flex justify-between items-center border-t border-gray-50">
                    <span className="text-[11px] text-gray-400 flex items-center gap-1">
                      <i className="ph-fill ph-info"></i> Reply will be sent via email and in-app
                    </span>
                    <button 
                      onClick={handleSendReply}
                      className="px-5 py-2 bg-[#5C2D91] text-white rounded-xl text-[13px] font-bold hover:bg-purple-800 transition-all shadow-sm flex items-center justify-center min-w-[120px]"
                    >
                      Send Reply
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            // لو مفيش تيكت مختارة
            <div className="flex-1 flex items-center justify-center text-gray-400 flex-col gap-3">
              <i className="ph-fill ph-envelope-simple-open text-5xl"></i>
              <p className="text-sm font-medium">Select a ticket to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Support;