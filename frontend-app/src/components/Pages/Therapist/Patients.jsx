import React, { useState, useEffect } from 'react';
// استيراد الموديلز اللي لسه عاملينهم
import PatientProfileModal from './PatientProfileModal';
import AddPatientModal from './AddPatientModal';
import TherapistFilterControls from './TherapistFilterControls';
import TherapistPatientTable from './TherapistPatientTable';
import TherapistPaginationControls from './TherapistPaginationControls';
import ActiveFiltersDisplay from './ActiveFiltersDisplay';
import { useAuth } from '../../context/AuthContext';
import {
  fetchTherapistPatients,
  mapApiPatientToTherapistRow,
  resolveTherapistIdForApi,
} from '../../../api/neureaApi.js';

function Patients({ setActiveTab }) {
  const { user } = useAuth();
  const therapistId = resolveTherapistIdForApi(user);

  const [patients, setPatients] = useState([]);
  const [listLoading, setListLoading] = useState(true);
  const [listError, setListError] = useState(null);

  useEffect(() => {
    if (!therapistId) {
      setListLoading(false);
      return;
    }
    let cancelled = false;
    (async () => {
      setListLoading(true);
      setListError(null);
      try {
        const data = await fetchTherapistPatients(therapistId);
        const arr = Array.isArray(data) ? data : data?.data ?? [];
        if (!cancelled) {
          setPatients(arr.map((p, i) => mapApiPatientToTherapistRow(p, i)));
        }
      } catch (e) {
        if (!cancelled) setListError(e?.message || 'Failed to load patients');
      } finally {
        if (!cancelled) setListLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [therapistId]);

  // حالات الفلتر والموديلز
  const [tempFilters, setTempFilters] = useState({ plan: 'all', mood: 'all' });
  const [activeFilters, setActiveFilters] = useState({ plan: 'all', mood: 'all' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  // دوال الفلتر
  const handleApplyFilters = () => {
    setActiveFilters(tempFilters);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setTempFilters({ plan: 'all', mood: 'all' });
    setActiveFilters({ plan: 'all', mood: 'all' });
    setCurrentPage(1);
  };

  const removeFilter = (type) => {
    const updatedFilters = { ...activeFilters, [type]: 'all' };
    setActiveFilters(updatedFilters);
    setTempFilters(updatedFilters);
    setCurrentPage(1);
  };

  const filteredPatients = patients.filter(patient => {
    const matchPlan = activeFilters.plan === 'all' || patient.plan === activeFilters.plan;
    const matchMood = activeFilters.mood === 'all' || patient.mood === activeFilters.mood;
    return matchPlan && matchMood;
  });

  const pageCount = Math.max(1, Math.ceil(filteredPatients.length / itemsPerPage));
  const currentPageSafe = Math.min(currentPage, pageCount);
  const startIndex = (currentPageSafe - 1) * itemsPerPage;
  const pagedPatients = filteredPatients.slice(startIndex, startIndex + itemsPerPage);
  const pageNumbers = Array.from({ length: pageCount }, (_, index) => index + 1);

  return (
    <div className="animate-[fadeIn_0.4s_ease-out_forwards] flex flex-col h-full relative">
      
      <div className="bg-white rounded-[20px] shadow-sm border border-gray-100 flex flex-col flex-1 overflow-hidden">
        
        {/* Header & Controls */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-4">
              <h3 className="text-[18px] font-bold text-[#1E1E2A]">My Patients</h3>
              <span className="bg-purple-100 text-[#5C2D91] px-2.5 py-0.5 rounded-full text-[12px] font-bold">
                {listLoading ? '…' : filteredPatients.length} Total
              </span>
            </div>

            <div className="flex items-center gap-3">
              {/* Filter Dropdown */}
              <TherapistFilterControls
                tempFilters={tempFilters}
                setTempFilters={setTempFilters}
                onApply={handleApplyFilters}
                onClear={handleClearFilters}
              />

              <button onClick={() => setIsAddModalOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-[#5C2D91] text-white rounded-[10px] text-[13px] font-semibold hover:bg-purple-800 transition-colors">
                <i className="ph-bold ph-plus"></i> Add Patient
              </button>
            </div>
          </div>
          {listError && <p className="text-[12px] text-red-600 mt-2">{listError}</p>}
        </div>

        {/* Active Filters Tags */}
        <ActiveFiltersDisplay
          activeFilters={activeFilters}
          onRemoveFilter={removeFilter}
          onClearAll={handleClearFilters}
        />

        {/* Table / Empty State */}
        {listLoading ? (
          <div className="p-12 flex flex-col items-center justify-center text-center text-gray-500 text-[14px]">
            Loading patients…
          </div>
        ) : filteredPatients.length === 0 ? (
          <div className="p-12 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 mb-4"><i className="ph-bold ph-magnifying-glass text-2xl"></i></div>
            <p className="text-[15px] font-bold text-gray-500 mb-1">No patients match your filters</p>
            <p className="text-[13px] text-gray-400">Try adjusting your filter criteria or clear all filters.</p>
          </div>
        ) : (
          <>
            <TherapistPatientTable
              pagedPatients={pagedPatients}
              onViewProfile={(patient) => {
                setSelectedPatient(patient);
                setIsProfileModalOpen(true);
              }}
            />

          <TherapistPaginationControls
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

      {/* المناداة على الموديلز وبعت البيانات (Props) ليهم */}
      <PatientProfileModal 
        isOpen={isProfileModalOpen} 
        onClose={() => setIsProfileModalOpen(false)} 
        patient={selectedPatient}
        setActiveTab={setActiveTab} 
      />

      <AddPatientModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
      />

    </div>
  );
}

export default Patients;