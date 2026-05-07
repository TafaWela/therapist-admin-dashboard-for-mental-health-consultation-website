import { useState, useEffect, useMemo } from 'react';
import InvestigateModal from './InvestigateModal';
import ViewLogModal from './ViewLogModal';
import {
  fetchReports,
  splitReportsByStatus,
  formatReportRow,
} from '../../../api/neureaApi.js';

function Reports() {
  const [reportFilter, setReportFilter] = useState('pending');
  const [isInvestigateOpen, setIsInvestigateOpen] = useState(false);
  const [isViewLogOpen, setIsViewLogOpen] = useState(false);
  const [rawList, setRawList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchReports();
        const arr = Array.isArray(data) ? data : data?.data ?? [];
        if (!cancelled) setRawList(arr);
      } catch (e) {
        if (!cancelled) setError(e?.message || 'Failed to load reports');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const { pending, resolved } = useMemo(
    () => splitReportsByStatus(rawList),
    [rawList]
  );

  const pendingRows = useMemo(
    () => pending.map((r, i) => formatReportRow(r, i)),
    [pending]
  );
  const resolvedRows = useMemo(
    () => resolved.map((r, i) => formatReportRow(r, i)),
    [resolved]
  );

  return (
    <div id="view-reports" className="view-section animate-fade-in flex flex-col h-full relative">
      <div className="bg-white rounded-[20px] shadow-sm border border-gray-100 flex flex-col flex-1 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white shrink-0">
          <h3 id="reports-title" className="text-[18px] font-bold text-neurea-textDark">
            Active Incident Reports
          </h3>
          {error && <span className="text-[12px] text-red-600">{error}</span>}
          <div className="flex gap-2">
            <button
              onClick={() => setReportFilter('resolved')}
              className={`px-4 py-2 rounded-[10px] text-[12px] font-bold shadow-sm transition-colors ${
                reportFilter === 'resolved'
                  ? 'bg-gray-100 text-gray-800 border border-gray-300'
                  : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              Resolved ({resolvedRows.length})
            </button>
            <button
              onClick={() => setReportFilter('pending')}
              className={`px-4 py-2 rounded-[10px] text-[12px] font-bold shadow-sm transition-colors ${
                reportFilter === 'pending'
                  ? 'bg-red-50 text-red-600 border border-red-100'
                  : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              Pending Action ({pendingRows.length})
            </button>
          </div>
        </div>

        {loading && (
          <div className="p-12 text-center text-gray-500">Loading reports…</div>
        )}

        {!loading && reportFilter === 'pending' && (
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
                {pendingRows.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="p-8 text-center text-gray-500">
                      No pending reports from API.
                    </td>
                  </tr>
                ) : (
                  pendingRows.map((row) => (
                    <tr
                      key={row.id}
                      className="hover:bg-gray-50 transition-colors border-b border-gray-100 bg-white"
                    >
                      <td className="p-4 pl-6 text-[13px] font-bold text-gray-500">{row.id}</td>
                      <td className="p-4">
                        <div className="flex flex-col">
                          <span className="text-[14px] font-bold text-neurea-textDark">
                            {row.reporterLabel}
                          </span>
                          <span className="text-[12px] text-gray-500">Reporter id</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex flex-col">
                          <span className="text-[12px] text-gray-500">
                            Submitted {row.whenLabel}
                          </span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="inline-flex items-center px-2.5 py-1 bg-red-50 text-red-700 rounded-md text-[11px] font-bold border border-red-100">
                          {row.issue}
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
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {!loading && reportFilter === 'resolved' && (
          <div id="table-resolved" className="overflow-x-auto flex-1 animate-fade-in">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  <th className="p-4 pl-6">Ticket ID</th>
                  <th className="p-4">Reported By</th>
                  <th className="p-4">Primary Issue</th>
                  <th className="p-4">Resolution</th>
                  <th className="p-4 text-right pr-6">Action</th>
                </tr>
              </thead>
              <tbody>
                {resolvedRows.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="p-8 text-center text-gray-500">
                      No resolved reports from API.
                    </td>
                  </tr>
                ) : (
                  resolvedRows.map((row) => (
                    <tr
                      key={row.id}
                      className="hover:bg-gray-50 transition-colors border-b border-gray-100 bg-white"
                    >
                      <td className="p-4 pl-6 text-[13px] font-bold text-gray-500">{row.id}</td>
                      <td className="p-4">
                        <div className="flex flex-col">
                          <span className="text-[14px] font-bold text-neurea-textDark">
                            {row.reporterLabel}
                          </span>
                          <span className="text-[12px] text-gray-500">{row.whenLabel}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="text-[13px] font-medium text-gray-700">{row.issue}</span>
                      </td>
                      <td className="p-4">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-green-50 text-green-700 rounded-md text-[11px] font-bold border border-green-100">
                          <i className="ph-bold ph-check"></i> Resolved
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
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {isInvestigateOpen && <InvestigateModal onClose={() => setIsInvestigateOpen(false)} />}
      {isViewLogOpen && <ViewLogModal onClose={() => setIsViewLogOpen(false)} />}
    </div>
  );
}

export default Reports;
