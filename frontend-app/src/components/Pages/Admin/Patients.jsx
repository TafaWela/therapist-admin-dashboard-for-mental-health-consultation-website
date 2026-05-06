import { useState } from 'react';
import FilterControls from './FilterControls';
import PatientTable from './PatientTable';
import PaginationControls from './PaginationControls';

// هنا حطينا الداتا بتاعت المرضى كلها في مكان واحد نظيف
const patientsData = [
  { id: '#P-8472', name: 'Sarah Ahmed', initials: 'SA', email: 'sarah.a@example.com', plan: 'pro', status: 'active', date: 'Jan 12, 2026', color: 'bg-blue-100 text-blue-600' },
  { id: '#P-3921', name: 'Mohamed Ali', initials: 'MA', email: 'm.ali99@example.com', plan: 'standard', status: 'active', date: 'Feb 04, 2026', color: 'bg-emerald-100 text-emerald-600' },
  { id: '#P-1102', name: 'John Doe', initials: 'JD', email: 'j.doe_blocked@example.com', plan: 'standard', status: 'suspended', date: 'Dec 19, 2025', color: 'bg-gray-200 text-gray-500' },
  { id: '#P-5590', name: 'Layla Kamel', initials: 'LK', email: 'layla.k@example.com', plan: 'pro', status: 'active', date: 'Jan 28, 2026', color: 'bg-purple-100 text-purple-600' },
  { id: '#P-7801', name: 'Omar Rashid', initials: 'OR', email: 'omar.r@example.com', plan: 'standard', status: 'active', date: 'Feb 14, 2026', color: 'bg-orange-100 text-orange-600' },
  { id: '#P-2287', name: 'Emma Watson', initials: 'EW', email: 'emma.w@example.com', plan: 'pro', status: 'active', date: 'Mar 01, 2026', color: 'bg-pink-100 text-pink-600' },
  { id: '#P-6104', name: 'Ahmed Hassan', initials: 'AH', email: 'ahmed.h@example.com', plan: 'standard', status: 'active', date: 'Feb 20, 2026', color: 'bg-teal-100 text-teal-600' },
  { id: '#P-3345', name: 'Fatima Nour', initials: 'FN', email: 'fatima.n@example.com', plan: 'standard', status: 'suspended', date: 'Nov 30, 2025', color: 'bg-gray-200 text-gray-500' },
  { id: '#P-9012', name: 'Youssef Salem', initials: 'YS', email: 'youssef.s@example.com', plan: 'pro', status: 'active', date: 'Mar 05, 2026', color: 'bg-indigo-100 text-indigo-600' },
  { id: '#P-4478', name: 'Nora Ali', initials: 'NA', email: 'nora.a@example.com', plan: 'standard', status: 'active', date: 'Feb 28, 2026', color: 'bg-cyan-100 text-cyan-600' },
];

function Patients() {
  // الحالة اللي بتتحكم في فتح وقفل قائمة الفلتر
  const [tempFilters, setTempFilters] = useState({ plan: 'all', status: 'all' });
  const [activeFilters, setActiveFilters] = useState({ plan: 'all', status: 'all' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

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

  const pageNumbers = Array.from({ length: pageCount }, (_, index) => index + 1);

  return (
    <div id="view-patients" className="view-section animate-fade-in flex flex-col h-full">
      
      {/* الهيدر وزراير الفلتر */}
      <div className="flex justify-between items-end mb-6">
        <div className="flex flex-col">
          <h3 className="text-[24px] font-extrabold text-neurea-textDark">Patient Database</h3>
          <p className="text-[13px] text-gray-500">Manage registered users, subscription plans, and account statuses.</p>
        </div>
        <div className="flex gap-3">
          
          {/* زرار الفلتر والقائمة بتاعته */}
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
          <span className="bg-purple-100 text-[#5C2D91] px-3 py-1 rounded-full text-[12px] font-bold">{filteredPatients.length} Total</span>
        </div>

        <PatientTable currentPatients={currentPatients} />

        <PaginationControls
          currentPage={currentPageSafe}
          setCurrentPage={setCurrentPage}
          pageCount={pageCount}
          startIndex={startIndex}
          itemsPerPage={itemsPerPage}
          totalItems={filteredPatients.length}
        />
      </div>
    </div>
  );
}

export default Patients;