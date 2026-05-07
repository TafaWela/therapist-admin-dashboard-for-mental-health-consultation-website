import React, { useState, useEffect, useMemo } from 'react';
import AppointmentDetailsModal from './AppointmentDetailsModal';
import { useAuth } from '../../context/AuthContext';
import {
  fetchTherapistSessions,
  fetchTherapistDashboard,
  mapDashboardStats,
  mapSessionToOverviewCard,
  resolveTherapistIdForApi,
} from '../../../api/neureaApi.js';

function isSameCalendarDay(iso, refDate) {
  if (!iso) return false;
  try {
    const d = new Date(iso);
    return d.toDateString() === refDate.toDateString();
  } catch {
    return false;
  }
}

function Overview({ setActiveTab }) {
  const { user } = useAuth();
  const therapistId = resolveTherapistIdForApi(user);

  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [dashRaw, setDashRaw] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!therapistId) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const [sess, dash] = await Promise.all([
          fetchTherapistSessions(therapistId),
          fetchTherapistDashboard(therapistId).catch(() => null),
        ]);
        if (cancelled) return;
        const list = Array.isArray(sess) ? sess : sess?.data ?? [];
        setSessions(list);
        setDashRaw(dash && typeof dash === 'object' ? dash : null);
      } catch (e) {
        if (!cancelled) setError(e?.message || 'Failed to load dashboard');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [therapistId]);

  const dash = useMemo(() => mapDashboardStats(dashRaw), [dashRaw]);
  const todaySessions = useMemo(() => {
    const refDate = new Date();
    return sessions.filter((s) => isSameCalendarDay(s.sessionDate ?? s.session_date, refDate));
  }, [sessions]);

  const displaySessions = todaySessions.length > 0 ? todaySessions : sessions.slice(0, 5);
  const cards = useMemo(() => displaySessions.map(mapSessionToOverviewCard), [displaySessions]);

  const openDetails = (card) => {
    const raw = card.raw || {};
    const pid = raw.patientId ?? raw.patient_id;
    const name = card.patientName || 'Patient';
    const initials = name
      .split(/\s+/)
      .map((p) => p[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
    setSelectedAppointment({
      initials,
      name,
      id: pid != null ? `#P-${pid}` : '—',
      time: card.timeLabel,
      type: 'Session',
      topic: card.topic,
      colorBg: 'bg-gray-50',
      colorText: 'text-gray-600',
    });
    setIsDetailsModalOpen(true);
  };

  const greetName = user?.name?.split(' ')[0] || 'Doctor';
  const sessionCount = todaySessions.length || cards.length;

  const statPatients = dash.activePatients;
  const statHours = dash.hoursCompleted;
  const statEarnings = dash.upcomingEarnings;

  return (
    <div className="animate-[fadeIn_0.4s_ease-out_forwards] flex flex-col gap-6 relative">
      <div>
        <h3 className="text-[24px] font-extrabold text-[#1E1E2A]">Good morning, {greetName}!</h3>
        <p className="text-[14px] text-[#7E7E8C]">
          You have{' '}
          <span className="font-bold text-[#5C2D91]">{sessionCount} session(s)</span> in view for
          today or upcoming.
        </p>
        {error && <p className="text-[13px] text-red-600 mt-2">{error}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-[20px] p-6 shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-[12px] font-bold text-gray-400 uppercase tracking-wider mb-1">
              Active Patients
            </p>
            <h4 className="text-[28px] font-extrabold text-[#1E1E2A]">
              {loading ? '…' : statPatients != null ? statPatients : '—'}
            </h4>
            <p className="text-[11px] font-semibold text-[#7E7E8C] mt-1">From therapist dashboard</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
            <i className="ph-fill ph-users text-2xl"></i>
          </div>
        </div>

        <div className="bg-white rounded-[20px] p-6 shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-[12px] font-bold text-gray-400 uppercase tracking-wider mb-1">
              Hours Completed
            </p>
            <h4 className="text-[28px] font-extrabold text-[#1E1E2A]">
              { loading
                ? '…'
                : statHours != null
                  ? `${statHours} `
                  : '— '}
              {statHours != null && <span className="text-lg text-gray-400">hrs</span>}
            </h4>
            <p className="text-[11px] font-semibold text-[#7E7E8C] mt-1">This week</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center text-[#5C2D91]">
            <i className="ph-fill ph-clock text-2xl"></i>
          </div>
        </div>

        <div className="bg-white rounded-[20px] p-6 shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-[12px] font-bold text-gray-400 uppercase tracking-wider mb-1">
              Upcoming Earnings
            </p>
            <h4 className="text-[28px] font-extrabold text-[#1E1E2A]">
              {loading
                ? '…'
                : statEarnings != null
                  ? `$${Number(statEarnings).toLocaleString()}`
                  : '—'}
            </h4>
            <p className="text-[11px] font-semibold text-gray-400 mt-1">Pending payout</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500">
            <i className="ph-fill ph-wallet text-2xl"></i>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-2">
        <div className="lg:col-span-2 bg-white rounded-[20px] shadow-sm border border-gray-100 p-6 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-[16px] font-bold text-[#1E1E2A]">Today&apos;s Appointments</h4>
            <button
              onClick={() => setActiveTab('schedule')}
              className="text-[13px] font-bold text-[#5C2D91] hover:underline"
            >
              View Schedule
            </button>
          </div>

          <div className="flex flex-col gap-4">
            {loading && (
              <p className="text-[13px] text-gray-500">Loading sessions…</p>
            )}
            {!loading && cards.length === 0 && (
              <p className="text-[13px] text-gray-500">No sessions returned from the API.</p>
            )}
            {!loading &&
              cards.map((card, idx) => (
                <div
                  key={card.sessionId ?? idx}
                  className={`flex items-center justify-between p-4 rounded-[16px] border transition-colors ${
                    idx === 0
                      ? 'bg-purple-50 border-purple-100'
                      : 'bg-white hover:bg-gray-50 border-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex flex-col items-center justify-center w-14 h-14 rounded-[12px] shadow-sm ${
                        idx === 0 ? 'bg-white' : 'bg-gray-50'
                      }`}
                    >
                      <span className="text-[16px] font-extrabold text-[#5C2D91] leading-none">
                        {card.timeLabel}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[15px] font-bold text-[#1E1E2A]">{card.patientName}</span>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-md">
                          <i className="ph-fill ph-chat-text"></i> Session
                        </span>
                        <span className="text-[11px] font-medium text-gray-500">{card.topic}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setActiveTab('chat')}
                      className="px-4 py-2.5 bg-[#5C2D91] hover:bg-purple-800 text-white text-[13px] font-bold rounded-[10px] transition-colors shadow-md"
                    >
                      Open Chat
                    </button>
                    <button
                      onClick={() => openDetails(card)}
                      className="px-4 py-2.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 text-[13px] font-bold rounded-[10px] transition-colors"
                    >
                      Details
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="bg-white rounded-[20px] shadow-sm border border-gray-100 p-6 flex flex-col">
          <div className="flex items-center justify-between mb-5">
            <h4 className="text-[16px] font-bold text-[#1E1E2A] flex items-center gap-2">
              <i className="ph-fill ph-sparkle text-[#5C2D91]"></i> Patient AI Insights
            </h4>
          </div>
          <p className="text-[12px] text-gray-500 mb-4">
            Recent mood shifts and alerts generated by Neurea App.
          </p>

          <div className="flex flex-col gap-3">
            <div className="p-3 border-l-4 border-red-500 bg-red-50 rounded-r-[12px]">
              <div className="flex justify-between items-start mb-1">
                <span className="text-[13px] font-bold text-[#1E1E2A]">Sarah Ahmed</span>
                <span className="text-[10px] text-gray-400">2h ago</span>
              </div>
              <p className="text-[11px] text-gray-600">
                Logged <span className="font-bold text-red-600">High Anxiety</span> in daily
                check-in.
              </p>
            </div>

            <div className="p-3 border-l-4 border-orange-400 bg-orange-50 rounded-r-[12px]">
              <div className="flex justify-between items-start mb-1">
                <span className="text-[13px] font-bold text-[#1E1E2A]">Ahmed Hassan</span>
                <span className="text-[10px] text-gray-400">5h ago</span>
              </div>
              <p className="text-[11px] text-gray-600">
                Used the <span className="font-bold text-orange-600">Crisis Chat</span> module.
              </p>
            </div>

            <div className="p-3 border-l-4 border-emerald-500 bg-emerald-50 rounded-r-[12px]">
              <div className="flex justify-between items-start mb-1">
                <span className="text-[13px] font-bold text-[#1E1E2A]">Mohamed Ali</span>
                <span className="text-[10px] text-gray-400">1d ago</span>
              </div>
              <p className="text-[11px] text-gray-600">
                Completed 3 consecutive days of Positive Journaling. Mood trending up.
              </p>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('patients')}
            className="mt-auto pt-4 text-[13px] font-bold text-[#5C2D91] hover:underline text-center"
          >
            View all patient reports
          </button>
        </div>
      </div>

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
