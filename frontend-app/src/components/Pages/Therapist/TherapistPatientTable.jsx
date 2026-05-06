function TherapistPatientTable({ pagedPatients, onViewProfile }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
      <thead>
        <tr className="bg-gray-50 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
          <th className="p-4 border-b border-gray-100">Patient Name</th>
          <th className="p-4 border-b border-gray-100">Plan Status</th>
          <th className="p-4 border-b border-gray-100">Recent AI Mood</th>
          <th className="p-4 border-b border-gray-100">Next Session</th>
          <th className="p-4 border-b border-gray-100 text-right">Actions</th>
        </tr>
      </thead>
      <tbody>
        {pagedPatients.map(patient => (
          <tr key={patient.id} className="hover:bg-gray-50 transition-colors border-b border-gray-50 cursor-pointer">
            <td className="p-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-[14px] ${patient.colorBg} ${patient.colorText}`}>{patient.initials}</div>
                <div className="flex flex-col">
                  <span className="text-[14px] font-bold text-[#1E1E2A]">{patient.firstName} {patient.lastName}</span>
                  <span className="text-[11px] text-gray-500">ID: {patient.id}</span>
                </div>
              </div>
            </td>
            <td className="p-4">
              {patient.plan === 'pro' ? (
                <span className="bg-purple-100 text-[#5C2D91] px-2 py-1 rounded-md text-[11px] font-bold"><i className="ph-fill ph-diamond mr-1"></i>Neurea Pro</span>
              ) : (
                <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-md text-[11px] font-bold">Standard</span>
              )}
            </td>
            <td className="p-4">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${patient.mood === 'critical' ? 'bg-red-600' : patient.mood === 'stable' ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
                <span className={`text-[13px] font-medium ${patient.mood === 'critical' ? 'text-red-600 font-semibold' : 'text-gray-700'}`}>{patient.moodLabel}</span>
              </div>
            </td>
            <td className="p-4 text-[13px] font-medium text-gray-700">{patient.nextSession}</td>
            <td className="p-4 text-right">
              <button
                onClick={() => onViewProfile(patient)}
                className="text-[#5C2D91] font-bold text-[13px] hover:underline transition-all"
              >
                View Profile
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
}

export default TherapistPatientTable;