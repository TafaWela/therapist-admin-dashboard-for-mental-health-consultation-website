import React, { useState, useEffect } from 'react';
import PrescribeModal from './PrescribeModal';
import EditPrescriptionModal from './EditPrescriptionModal';
import { useAuth } from '../../context/AuthContext';
import { fetchTherapistMedicines, mapMedicineToPrescription } from '../../../api/neureaApi.js';

function Medications() {
  const { user } = useAuth();
  const therapistId = user?.id;

  const [prescriptions, setPrescriptions] = useState([]);
  const [listLoading, setListLoading] = useState(true);
  const [listError, setListError] = useState(null);
  const [isPrescribeOpen, setIsPrescribeOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState(null);

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
        const data = await fetchTherapistMedicines(therapistId);
        const arr = Array.isArray(data) ? data : data?.data ?? [];
        if (!cancelled) {
          setPrescriptions(arr.map((m, i) => mapMedicineToPrescription(m, i)));
        }
      } catch (e) {
        if (!cancelled) setListError(e?.message || 'Failed to load medications');
      } finally {
        if (!cancelled) setListLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [therapistId]);

  // دالة لمسح الدواء لما ندوس Stop
  const stopMedication = (id) => {
    if (window.confirm("Are you sure you want to stop this medication?")) {
      setPrescriptions(prescriptions.filter(p => p.id !== id));
    }
  };

  const handleEditClick = (prescription) => {
    setSelectedPrescription(prescription);
    setIsEditOpen(true);
  };

  return (
    <div className="animate-[fadeIn_0.4s_ease-out_forwards] flex flex-col h-full relative">
      
      {/* Header */}
      <div className="flex justify-between items-end mb-6">
        <div className="flex flex-col">
          <h3 className="text-[24px] font-extrabold text-[#1E1E2A]">Patient Medications</h3>
          <p className="text-[13px] text-gray-500">Manage prescriptions and active medications for your patients.</p>
          {listError && <p className="text-[12px] text-red-600 mt-1">{listError}</p>}
        </div>
        <button 
          onClick={() => setIsPrescribeOpen(true)}
          className="px-5 py-2.5 bg-[#5C2D91] hover:bg-purple-800 text-white text-[13px] font-bold rounded-xl shadow-sm flex items-center gap-2 transition-colors"
        >
          <i className="ph-bold ph-plus"></i> Write Prescription
        </button>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-[20px] shadow-sm border border-gray-100 flex flex-col flex-1 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <h3 className="text-[16px] font-bold text-[#1E1E2A]">Recent Prescriptions</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white border-b border-gray-200 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                <th className="p-4 pl-6">Patient Name</th>
                <th className="p-4">Medication</th>
                <th className="p-4">Dosage / Freq</th>
                <th className="p-4">Date Prescribed</th>
                <th className="p-4 text-right pr-6">Action</th>
              </tr>
            </thead>
            <tbody>
              {listLoading ? (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-gray-500 text-[14px]">Loading…</td>
                </tr>
              ) : prescriptions.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-gray-500 text-[14px]">No active prescriptions found.</td>
                </tr>
              ) : (
                prescriptions.map((prescription) => (
                  <tr key={prescription.id} className="hover:bg-gray-50 transition-colors border-b border-gray-100">
                    <td className="p-4 pl-6">
                      <div className="flex flex-col">
                        <span className="text-[14px] font-bold text-[#1E1E2A]">{prescription.patientName}</span>
                        <span className="text-[11px] text-gray-500">ID: {prescription.patientId}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="text-[14px] font-bold text-[#5C2D91]">{prescription.medication}</span>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col">
                        <span className="text-[13px] font-medium text-gray-700">{prescription.dosage}</span>
                        <span className="text-[11px] text-gray-500">{prescription.freq}</span>
                      </div>
                    </td>
                    <td className="p-4 text-[13px] font-medium text-gray-700">{prescription.date}</td>
                    <td className="p-4 text-right pr-6 flex justify-end gap-2">
                      <button 
                        onClick={() => handleEditClick(prescription)}
                        className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 rounded-md text-[11px] font-bold hover:bg-gray-50 transition-colors"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => stopMedication(prescription.id)}
                        className="px-3 py-1.5 bg-red-50 text-red-600 border border-red-100 rounded-md text-[11px] font-bold hover:bg-red-100 transition-colors"
                      >
                        Stop
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* المناداة على الموديلز */}
      <PrescribeModal 
        isOpen={isPrescribeOpen} 
        onClose={() => setIsPrescribeOpen(false)} 
      />

      <EditPrescriptionModal 
        isOpen={isEditOpen} 
        onClose={() => setIsEditOpen(false)} 
        prescription={selectedPrescription}
      />

    </div>
  );
}

export default Medications;