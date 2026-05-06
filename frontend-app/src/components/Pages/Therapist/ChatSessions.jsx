import React, { useState, useRef, useEffect } from 'react';

function ChatSessions() {
  // 1. حالة لتخزين بيانات المريض اللي بنكلمه حالياً
  const [chatPatient] = useState({
    initials: 'SA',
    name: 'Sarah Ahmed',
    status: 'Online'
  });

  // 2. حالة لتخزين الرسايل
  const [chatMsgs, setChatMsgs] = useState([
    { id: 1, sender: 'patient', text: "Good morning, Doctor. I've been feeling a bit overwhelmed since our last session. My anxiety levels have been spiking at night.", time: '10:01 AM' },
    { id: 2, sender: 'therapist', text: "Good morning, Sarah. I'm sorry to hear you're experiencing that. The AI tracker did flag some elevated stress levels yesterday evening. Let's talk about what's been triggering these spikes.", time: '10:02 AM' }
  ]);

  // 3. حالة لتخزين النص اللي بيتكتب في الإدخال
  const [chatInput, setChatInput] = useState('');

  // مرجع (Ref) عشان نعمل سكرول تلقائي لآخر رسالة
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // تشغيل السكرول التلقائي كل ما الرسايل تزيد
  useEffect(() => {
    scrollToBottom();
  }, [chatMsgs]);

  // دالة إرسال الرسالة
  const sendMsg = () => {
    if (!chatInput.trim()) return; // لو الحقل فاضي ميبعتش حاجة

    const newMessage = {
      id: Date.now(),
      sender: 'therapist',
      text: chatInput,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) // بياخد الوقت الحالي
    };

    setChatMsgs([...chatMsgs, newMessage]);
    setChatInput(''); // يفضي الحقل بعد الإرسال
  };

  return (
    <div className="animate-[fadeIn_0.4s_ease-out_forwards] flex h-full gap-6" style={{ minHeight: 'calc(100vh - 160px)' }}>

      {/* Left: session list */}
      <div className="w-72 bg-white rounded-[20px] shadow-sm border border-gray-100 flex flex-col shrink-0">
        <div className="p-5 border-b border-gray-100">
          <h4 className="text-[16px] font-bold text-[#1E1E2A] mb-3">Today's Sessions</h4>
          <div className="relative">
            <i className="ph-bold ph-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
            <input 
              type="text" 
              placeholder="Search patients..." 
              className="w-full bg-gray-50 border border-gray-100 rounded-xl pl-9 pr-3 py-2 text-[12px] focus:outline-none focus:border-[#5C2D91] transition-colors" 
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto no-scrollbar">
          {[
            { initials:'SA', name:'Sarah Ahmed',  time:'10:00 AM', msg:'Anxious check-in today',   active:true,  unread:2 },
            { initials:'MA', name:'Mohamed Ali',  time:'13:00 PM', msg:'Follow-up session',        active:false, unread:0 },
            { initials:'EW', name:'Emma Watson',  time:'15:30 PM', msg:'CBT Exercises session',    active:false, unread:1 },
            { initials:'AH', name:'Ahmed Hassan', time:'Mar 20',   msg:'Crisis chat review',       active:false, unread:0 },
          ].map((s, i) => (
            <div key={i} className={`flex items-center gap-3 p-4 border-b border-gray-50 cursor-pointer transition-colors ${s.active ? 'bg-purple-50/70 border-l-4 border-l-[#5C2D91]' : 'hover:bg-gray-50 border-l-4 border-l-transparent'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-[13px] shrink-0 ${s.active ? 'bg-[#5C2D91] text-white' : 'bg-purple-100 text-[#5C2D91]'}`}>
                {s.initials}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <span className="text-[13px] font-bold text-[#1E1E2A] truncate">{s.name}</span>
                  <span className="text-[10px] text-gray-400 shrink-0 ml-1">{s.time}</span>
                </div>
                <div className="flex justify-between items-center mt-0.5">
                  <span className="text-[11px] text-gray-500 truncate">{s.msg}</span>
                  {s.unread > 0 && (
                    <span className="w-4 h-4 bg-[#5C2D91] rounded-full text-white text-[9px] font-bold flex items-center justify-center shrink-0 ml-1">
                      {s.unread}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right: chat window */}
      <div className="flex-1 bg-white rounded-[20px] shadow-sm border border-gray-100 flex flex-col">
        {/* Chat header */}
        <div className="p-5 border-b border-gray-100 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 bg-[#5C2D91] rounded-full flex items-center justify-center text-white font-bold text-[14px]">
                {chatPatient.initials}
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white"></span>
            </div>
            <div>
              <p className="text-[15px] font-bold text-[#1E1E2A]">{chatPatient.name}</p>
              <p className="text-[11px] text-emerald-500 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block"></span> {chatPatient.status} · Anxiety Assessment
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="w-9 h-9 bg-gray-50 rounded-full flex items-center justify-center text-gray-500 hover:text-[#5C2D91] hover:bg-purple-50 transition-colors border border-gray-200">
              <i className="ph-bold ph-info text-lg"></i>
            </button>
            <button className="w-9 h-9 bg-gray-50 rounded-full flex items-center justify-center text-gray-500 hover:text-red-500 hover:bg-red-50 transition-colors border border-gray-200">
              <i className="ph-bold ph-phone-slash text-lg"></i>
            </button>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4 bg-gray-50/30 no-scrollbar">
          {chatMsgs.map(msg => (
            <div key={msg.id} className={`flex gap-3 ${msg.sender === 'therapist' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-[12px] shrink-0 ${msg.sender === 'therapist' ? 'bg-[#5C2D91] text-white' : 'bg-blue-100 text-blue-600'}`}>
                {msg.sender === 'therapist' ? 'DR' : 'SA'}
              </div>
              <div className={`max-w-[65%] flex flex-col ${msg.sender === 'therapist' ? 'items-end' : ''}`}>
                <div className={`px-4 py-3 rounded-[16px] text-[13px] leading-relaxed shadow-sm ${msg.sender === 'therapist' ? 'bg-[#5C2D91] text-white rounded-tr-[4px]' : 'bg-white text-[#1E1E2A] border border-gray-100 rounded-tl-[4px]'}`}>
                  {msg.text}
                </div>
                <span className="text-[10px] text-gray-400 mt-1 font-medium">{msg.time}</span>
              </div>
            </div>
          ))}
          {/* ده ديف مخفي فايدته بس إننا نعمل سكرول ليه عشان ننزل لآخر رسالة */}
          <div ref={chatEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-gray-100 shrink-0">
          <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-[16px] px-4 py-2 focus-within:border-[#5C2D91] focus-within:bg-white transition-colors">
            <button className="text-gray-400 hover:text-[#5C2D91] transition-colors shrink-0">
              <i className="ph-bold ph-paperclip text-lg"></i>
            </button>
            <input
              type="text" 
              value={chatInput}
              onChange={e => setChatInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMsg()}
              placeholder="Type your message..."
              className="flex-1 bg-transparent text-[13px] text-[#1E1E2A] focus:outline-none placeholder:text-gray-400"
            />
            <button className="text-gray-400 hover:text-[#5C2D91] transition-colors shrink-0">
              <i className="ph-bold ph-smiley text-lg"></i>
            </button>
            <button 
              onClick={sendMsg} 
              disabled={!chatInput.trim()} 
              className="w-9 h-9 bg-[#5C2D91] hover:bg-purple-800 text-white rounded-full flex items-center justify-center transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
            >
              <i className="ph-fill ph-paper-plane-tilt text-lg"></i>
            </button>
          </div>
          <p className="text-[10px] text-gray-400 text-center mt-2 font-medium">
            <i className="ph-fill ph-lock-simple mr-1"></i>End-to-end encrypted · Session ID #CHT-8472
          </p>
        </div>
      </div>
    </div>
  );
}

export default ChatSessions;