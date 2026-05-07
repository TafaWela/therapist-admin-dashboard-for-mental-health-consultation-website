import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { fetchTherapistAvailabilitySlots } from '../../../api/neureaApi.js';

function Schedule() {
  const { user } = useAuth();
  const therapistId = user?.id;

  const [apiSlots, setApiSlots] = useState([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [slotsError, setSlotsError] = useState(null);

  useEffect(() => {
    if (!therapistId) return;
    let cancelled = false;
    (async () => {
      setSlotsLoading(true);
      setSlotsError(null);
      try {
        const data = await fetchTherapistAvailabilitySlots(therapistId);
        const arr = Array.isArray(data) ? data : data?.data ?? [];
        if (!cancelled) setApiSlots(arr);
      } catch (e) {
        if (!cancelled) setSlotsError(e?.message || 'Could not load availability slots');
      } finally {
        if (!cancelled) setSlotsLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [therapistId]);

  // 1. حالة لتخزين سعر الجلسة
  const [price, setPrice] = useState(60);

  // 2. حالة لتخزين مواعيد الأسبوع كلها
  const [schedule, setSchedule] = useState({
    mon: { label: 'Mon', enabled: true, start: '09:00', end: '17:00' },
    tue: { label: 'Tue', enabled: true, start: '10:00', end: '21:00' },
    wed: { label: 'Wed', enabled: false, start: '09:00', end: '17:00' },
    thu: { label: 'Thu', enabled: true, start: '09:00', end: '17:00' },
    fri: { label: 'Fri', enabled: true, start: '09:00', end: '13:00' },
  });

  // حالة زرار الحفظ
  const [saveStatus, setSaveStatus] = useState('idle');

  // دالة لتشغيل/إيقاف اليوم
  const toggleDay = (dayKey) => {
    setSchedule({
      ...schedule,
      [dayKey]: { ...schedule[dayKey], enabled: !schedule[dayKey].enabled }
    });
  };

  // دالة لتغيير الوقت (البداية أو النهاية)
  const handleTimeChange = (dayKey, type, value) => {
    setSchedule({
      ...schedule,
      [dayKey]: { ...schedule[dayKey], [type]: value }
    });
  };

  // دالة الحفظ الوهمية (عشان الأنيميشن)
  const handleSave = () => {
    setSaveStatus('loading');
    setTimeout(() => {
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 1500);
    }, 800);
  };

  return (
    <div className="animate-[fadeIn_0.4s_ease-out_forwards] flex flex-col h-full">
      <div className="bg-white rounded-[20px] shadow-sm border border-gray-100 p-8 flex flex-col max-w-4xl mx-auto w-full">
        
        {/* Header */}
        <div className="border-b border-gray-100 pb-5 mb-8">
          <h3 className="text-[20px] font-extrabold text-[#1E1E2A] mb-1">Schedule & Pricing</h3>
          <p className="text-[13px] text-gray-500">Set your hourly rate and manage your weekly availability for chat sessions.</p>
        </div>

        {/* Session Pricing */}
        <div className="mb-10">
          <h4 className="text-[15px] font-bold text-[#1E1E2A] mb-3 flex items-center gap-2">
            <i className="ph-fill ph-currency-dollar text-gray-400 text-lg"></i> Session Pricing
          </h4>
          <div className="w-48 relative">
            <i className="ph-bold ph-currency-dollar absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg"></i>
            <input 
              type="number" 
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-[12px] pl-10 pr-14 py-3 text-[14px] font-bold text-[#1E1E2A] focus:outline-none focus:border-[#5C2D91] focus:bg-white transition-colors"
            />
            <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[12px] font-bold text-gray-400">/ hour</span>
          </div>
          <p className="text-[11px] text-gray-500 mt-2">This is the price patients will see when booking a chat session with you.</p>
        </div>

        {/* Weekly Availability */}
        <div>
          <h4 className="text-[15px] font-bold text-[#1E1E2A] mb-4 flex items-center gap-2">
            <i className="ph-fill ph-clock text-gray-400 text-lg"></i> Weekly Availability
          </h4>

          <div className="flex flex-col gap-3">
            {/* هنا بنرسم الأيام بشكل ديناميكي من الـ State */}
            {Object.entries(schedule).map(([dayKey, dayData]) => (
              <div 
                key={dayKey}
                className={`flex items-center gap-4 p-4 border border-gray-100 rounded-[14px] transition-colors ${dayData.enabled ? 'bg-gray-50 hover:bg-white focus-within:bg-white focus-within:border-[#5C2D91]' : 'bg-gray-50 opacity-60'}`}
              >
                {/* مفتاح التشغيل/الإيقاف */}
                <label className="relative inline-flex items-center cursor-pointer w-24 shrink-0">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={dayData.enabled}
                    onChange={() => toggleDay(dayKey)}
                  />
                  <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#5C2D91]"></div>
                  <span className={`ml-3 text-[14px] font-bold ${dayData.enabled ? 'text-[#1E1E2A]' : 'text-gray-500'}`}>
                    {dayData.label}
                  </span>
                </label>

                {/* مدخلات الوقت */}
                <div className={`flex items-center gap-3 flex-1 ${!dayData.enabled ? 'pointer-events-none' : ''}`}>
                  <input 
                    type="time" 
                    value={dayData.start}
                    onChange={(e) => handleTimeChange(dayKey, 'start', e.target.value)}
                    disabled={!dayData.enabled}
                    className={`border border-gray-200 rounded-[10px] px-3 py-2 text-[13px] font-bold focus:outline-none focus:border-[#5C2D91] ${dayData.enabled ? 'bg-white text-[#1E1E2A]' : 'bg-gray-100 text-gray-400'}`}
                  />
                  <span className="text-gray-400 text-[12px] font-bold">to</span>
                  <input 
                    type="time" 
                    value={dayData.end}
                    onChange={(e) => handleTimeChange(dayKey, 'end', e.target.value)}
                    disabled={!dayData.enabled}
                    className={`border border-gray-200 rounded-[10px] px-3 py-2 text-[13px] font-bold focus:outline-none focus:border-[#5C2D91] ${dayData.enabled ? 'bg-white text-[#1E1E2A]' : 'bg-gray-100 text-gray-400'}`}
                  />
                  
                  {/* رسالة إن اليوم مقفول بتظهر لو الـ enabled = false */}
                  {!dayData.enabled && (
                    <span className="text-[12px] font-bold text-gray-400 ml-4">Unavailable</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 border-t border-gray-100 pt-8">
            <h4 className="text-[15px] font-bold text-[#1E1E2A] mb-3 flex items-center gap-2">
              <i className="ph-fill ph-calendar text-gray-400 text-lg"></i> Bookable slots (API)
            </h4>
            <p className="text-[12px] text-gray-500 mb-3">
              Loaded from <code className="text-[11px] bg-gray-100 px-1 rounded">GET /api/ApiAvailabilitySlots/therapist/&#123;id&#125;/slots</code>
            </p>
            {slotsError && <p className="text-[13px] text-red-600 mb-2">{slotsError}</p>}
            {slotsLoading && <p className="text-[13px] text-gray-500">Loading slots…</p>}
            {!slotsLoading && !slotsError && apiSlots.length === 0 && (
              <p className="text-[13px] text-gray-500">No slots returned.</p>
            )}
            {!slotsLoading && apiSlots.length > 0 && (
              <ul className="flex flex-col gap-2 max-h-48 overflow-y-auto text-[13px]">
                {apiSlots.map((slot, i) => (
                  <li
                    key={slot.id ?? i}
                    className="flex justify-between gap-4 border border-gray-100 rounded-lg px-3 py-2 bg-gray-50/80"
                  >
                    <span className="font-semibold text-[#1E1E2A]">
                      {slot.date ?? slot.Date ?? '—'}{' '}
                      <span className="text-gray-500 font-normal">
                        {slot.start_time ?? slot.startTime ?? ''}
                      </span>
                    </span>
                    <span className="text-gray-600">
                      {slot.is_booked ?? slot.isBooked ? 'Booked' : 'Open'}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* زرار الحفظ */}
          <div className="mt-8 flex justify-end">
            <button 
              onClick={handleSave}
              disabled={saveStatus !== 'idle'}
              className={`px-8 py-3.5 text-white rounded-[14px] text-[14px] font-bold transition-all shadow-lg active:scale-95 flex items-center justify-center min-w-[160px] gap-2 ${saveStatus === 'saved' ? 'bg-emerald-500 shadow-emerald-900/20' : 'bg-[#5C2D91] hover:bg-purple-800 shadow-purple-900/20'} ${saveStatus !== 'idle' ? 'pointer-events-none' : ''}`}
            >
              {saveStatus === 'idle' && 'Save Settings'}
              {saveStatus === 'loading' && <i className="ph-bold ph-spinner-gap animate-spin text-lg"></i>}
              {saveStatus === 'saved' && <><i className="ph-bold ph-check text-lg"></i> Saved</>}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Schedule;