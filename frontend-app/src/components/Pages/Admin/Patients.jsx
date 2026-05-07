import { useState, useEffect } from 'react';
import FilterControls from './FilterControls';
import PatientTable from './PatientTable';
import PaginationControls from './PaginationControls';
import {
  fetchUsers,
  normalizeUsersPayload,
  filterPatientsFromUsers,
  mapApiUserToAdminPatientRow,
} from '../../../api/neureaApi.js';

function Patients() {
  const [patientsData, setPatientsData] = useState([]);
  const [listLoading, setListLoading] = useState(true);
  const [listError, setListError] = useState(null);

  const [tempFilters, setTempFilters] = useState({ plan: 'all', status: 'all' });
  const [activeFilters, setActiveFilters] = useState({ plan: 'all', status: 'all' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setListLoading(true);
      setListError(null);
      try {
        const payload = await fetchUsers();
        const users = normalizeUsersPayload(payload);
        let subset = filterPatientsFromUsers(users);
        if (subset.length === 0 && users.length > 0) {
          subset = users.filter((u) => !u.is_staff);
        }
        const rows = subset.map((u, i) => mapApiUserToAdminPatientRow(u, i));
        if (!cancelled) setPatientsData(rows);
      } catch (e) {
        if (!cancelled) setListError(e?.message || 'Failed to load patients');
      } finally {
        if (!cancelled) setListLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleApplyFilters = () => {
    setActiveFilters(tempFilters);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setTempFilters({ plan: 'all', status: 'all' });
    setActiveFilters({ plan: 'all', status: 'all' });
    setCurrentPage(1);
  };

  const removeFilter = (type) => {
    const updatedFilters = { ...activeFilters, [type]: 'all' };
    setActiveFilters(updatedFilters);
    setTempFilters(updatedFilters);
    setCurrentPage(1);
  };

  const filteredPatients = patientsData.filter((patient) => {
    const matchPlan = activeFilters.plan === 'all' || patient.plan === activeFilters.plan;
    const matchStatus = activeFilters.status === 'all' || patient.status === activeFilters.status;
    return matchPlan && matchStatus;
  });

  const pageCount = Math.max(1, Math.ceil(filteredPatients.length / itemsPerPage));
  const currentPageSafe = Math.min(currentPage, pageCount);
  const startIndex = (currentPageSafe - 1) * itemsPerPage;
  const currentPatients = filteredPatients.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div id="view-patients" className="view-section animate-fade-in flex flex-col h-full">
      <div className="flex justify-between items-end mb-6">
        <div className="flex flex-col">
          <h3 className="text-[24px] font-extrabold text-neurea-textDark">Patient Database</h3>
          <p className="text-[13px] text-gray-500">
            Manage registered users, subscription plans, and account statuses.
          </p>
          {listError && (
            <p className="text-[13px] text-red-600 mt-2">{listError}</p>
          )}
        </div>
        <div className="flex gap-3">
          <FilterControls
            tempFilters={tempFilters}
            setTempFilters={setTempFilters}
            onApply={handleApplyFilters}
            onClear={handleClearFilters}
          />

          <button className="px-4 py-2.5 bg-white border border-gray-200 text-gray-600 text-[13px] font-semibold rounded-xl shadow-sm flex items-center gap-2 hover:bg-gray-50 transition-colors">
            <i className="ph-bold ph-download-simple"></i> Export CSV
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[20px] shadow-sm border border-gray-100 flex flex-col flex-1 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <h3 className="text-[16px] font-bold text-neurea-textDark">All Registered Patients</h3>
          <span className="bg-purple-100 text-[#5C2D91] px-3 py-1 rounded-full text-[12px] font-bold">
            {listLoading ? '…' : filteredPatients.length} Total
          </span>
        </div>

        {listLoading ? (
          <div className="p-12 text-center text-gray-500">Loading patients…</div>
        ) : (
          <>
            <PatientTable currentPatients={currentPatients} />
            <PaginationControls
              currentPage={currentPageSafe}
              setCurrentPage={setCurrentPage}
              pageCount={pageCount}
              startIndex={startIndex}
              itemsPerPage={itemsPerPage}
              totalItems={filteredPatients.length}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default Patients;
