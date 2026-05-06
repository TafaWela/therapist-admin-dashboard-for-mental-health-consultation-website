import { useState } from 'react';
import InvestigateModal from './InvestigateModal';
import ViewLogModal from './ViewLogModal';

function Reports() {
    const [reportFilter, setReportFilter] = useState('pending');
    const [isInvestigateOpen, setIsInvestigateOpen] = useState(false);
    const [isViewLogOpen, setIsViewLogOpen] = useState(false);

    return (
        <div id="view-reports" className="view-section animate-fade-in flex flex-col h-full relative">
            <div className="bg-white rounded-[20px] shadow-sm border border-gray-100 flex flex-col flex-1 overflow-hidden">

                {/* الهيدر وزراير الفلترة */}
                <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white shrink-0">
                    <h3 id="reports-title" className="text-[18px] font-bold text-neurea-textDark">
                        Active Incident Reports
                    </h3>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setReportFilter('resolved')}
                            className={`px-4 py-2 rounded-[10px] text-[12px] font-bold shadow-sm transition-colors ${
                                reportFilter === 'resolved'
                                ? 'bg-gray-100 text-gray-800 border border-gray-300'
                                : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                            }`}
                        >
                            Resolved
                        </button>
                        <button
                            onClick={() => setReportFilter('pending')}
                            className={`px-4 py-2 rounded-[10px] text-[12px] font-bold shadow-sm transition-colors ${
                                reportFilter === 'pending'
                                ? 'bg-red-50 text-red-600 border border-red-100'
                                : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                            }`}
                        >
                            Pending Action (3)
                        </button>
                    </div>
                </div>

                {/* جدول الـ Pending */}
                {reportFilter === 'pending' && (
                    <div id="table-pending" className="overflow-x-auto flex-1 animate-fade-in">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-200 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                                    <th className="p-4 pl-6">Ticket ID</th>
                                    <th className="p-4">Reported By</th>
                                    <th className="p-4">Reported Entity</th>
                                    <th className="p-4">Primary Issue</th>
                                    <th className="p-4 text-right pr-6">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="hover:bg-gray-50 transition-colors border-b border-gray-100 bg-white">
                                    <td className="p-4 pl-6 text-[13px] font-bold text-gray-500">#REP-092</td>
                                    <td className="p-4">
                                        <div className="flex flex-col">
                                            <span className="text-[14px] font-bold text-neurea-textDark">Sarah Ahmed</span>
                                            <span className="text-[12px] text-gray-500">Patient</span>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex flex-col">
                                            <span className="text-[14px] font-bold text-[#5C2D91] hover:underline cursor-pointer">Dr. Mike Bruce</span>
                                            <span className="text-[12px] text-gray-500">Session: 10 Sep</span>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <span className="inline-flex items-center px-2.5 py-1 bg-red-50 text-red-700 rounded-md text-[11px] font-bold border border-red-100">
                                            Unprofessional Behavior
                                        </span>
                                    </td>
                                    <td className="p-4 text-right pr-6 flex justify-end gap-2">
                                        <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-[12px] font-bold hover:bg-gray-50">
                                            Refund
                                        </button>
                                        <button
                                            onClick={() => setIsInvestigateOpen(true)}
                                            className="px-4 py-2 bg-[#5C2D91] text-white rounded-[8px] text-[12px] font-bold hover:bg-[#4a2474] shadow-sm transition-colors flex items-center gap-1.5"
                                        >
                                            <i className="ph-bold ph-magnifying-glass"></i> Investigate
                                        </button>
                                    </td>
                                </tr>
                                <tr className="hover:bg-gray-50 transition-colors border-b border-gray-100 bg-white">
                                    <td className="p-4 pl-6 text-[13px] font-bold text-gray-500">#REP-091</td>
                                    <td className="p-4">
                                        <div className="flex flex-col">
                                            <span className="text-[14px] font-bold text-neurea-textDark">Mohamed Ali</span>
                                            <span className="text-[12px] text-gray-500">Patient</span>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex flex-col">
                                            <span className="text-[14px] font-bold text-[#5C2D91] hover:underline cursor-pointer">Dr. Jessica Walker</span>
                                            <span className="text-[12px] text-gray-500">Session: 08 Sep</span>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <span className="inline-flex items-center px-2.5 py-1 bg-orange-50 text-orange-700 rounded-md text-[11px] font-bold border border-orange-100">
                                            Therapist No-show
                                        </span>
                                    </td>
                                    <td className="p-4 text-right pr-6 flex justify-end gap-2">
                                        <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-[12px] font-bold hover:bg-gray-50">
                                            Refund
                                        </button>
                                        <button
                                            onClick={() => setIsInvestigateOpen(true)}
                                            className="px-4 py-2 bg-[#5C2D91] text-white rounded-[8px] text-[12px] font-bold hover:bg-[#4a2474] shadow-sm transition-colors flex items-center gap-1.5"
                                        >
                                            <i className="ph-bold ph-magnifying-glass"></i> Investigate
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}

                {/* جدول الـ Resolved */}
                {reportFilter === 'resolved' && (
                    <div id="table-resolved" className="overflow-x-auto flex-1 animate-fade-in">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-200 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                                    <th className="p-4 pl-6">Ticket ID</th>
                                    <th className="p-4">Reported By</th>
                                    <th className="p-4">Reported Entity</th>
                                    <th className="p-4">Resolution</th>
                                    <th className="p-4 text-right pr-6">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="hover:bg-gray-50 transition-colors border-b border-gray-100 bg-white">
                                    <td className="p-4 pl-6 text-[13px] font-bold text-gray-500">#REP-090</td>
                                    <td className="p-4">
                                        <div className="flex flex-col">
                                            <span className="text-[14px] font-bold text-neurea-textDark">Nour Youssef</span>
                                            <span className="text-[12px] text-gray-500">Patient</span>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex flex-col">
                                            <span className="text-[14px] font-bold text-[#5C2D91] hover:underline cursor-pointer">Dr. Samer Kamal</span>
                                            <span className="text-[12px] text-gray-500">Session: 05 Sep</span>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-green-50 text-green-700 rounded-md text-[11px] font-bold border border-green-100">
                                            <i className="ph-bold ph-check"></i> Warning Issued
                                        </span>
                                    </td>
                                    <td className="p-4 text-right pr-6 flex justify-end gap-2">
                                        <button
                                            onClick={() => setIsViewLogOpen(true)}
                                            className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-[8px] text-[12px] font-bold hover:bg-gray-50 transition-colors"
                                        >
                                            View Log
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}

            </div>

            {/* استدعاء المودالز */}
            {isInvestigateOpen && <InvestigateModal onClose={() => setIsInvestigateOpen(false)} />}
            {isViewLogOpen && <ViewLogModal onClose={() => setIsViewLogOpen(false)} />}
            
        </div>
    );
}

export default Reports;