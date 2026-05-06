function PatientTable({ currentPatients }) {
  return (
    <div className="overflow-x-auto flex-1 pb-4">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-white border-b border-gray-200 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
            <th className="p-4 pl-6">Patient Name</th>
            <th className="p-4">Contact Info</th>
            <th className="p-4">Subscription</th>
            <th className="p-4">Status</th>
            <th className="p-4">Joined</th>
            <th className="p-4 text-right pr-6">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentPatients.map((patient, index) => (
            <tr key={index} className={`hover:bg-gray-50 transition-colors border-b border-gray-100 ${patient.status === 'suspended' ? 'opacity-75' : ''}`}>
              <td className="p-4 pl-6">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-[14px] ${patient.color}`}>
                    {patient.initials}
                  </div>
                  <div className="flex flex-col">
                    <span className={`text-[14px] font-bold ${patient.status === 'suspended' ? 'text-gray-600 line-through' : 'text-neurea-textDark'}`}>
                      {patient.name}
                    </span>
                    <span className="text-[11px] text-gray-500">ID: {patient.id}</span>
                  </div>
                </div>
              </td>
              <td className="p-4">
                <span className="text-[13px] font-medium text-gray-600">{patient.email}</span>
              </td>
              <td className="p-4">
                {patient.plan === 'pro' ? (
                  <span className="bg-purple-100 text-[#5C2D91] px-2 py-1 rounded-md text-[11px] font-bold">
                    <i className="ph-fill ph-diamond mr-1"></i> Neurea Pro
                  </span>
                ) : (
                  <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-md text-[11px] font-bold">Standard</span>
                )}
              </td>
              <td className="p-4">
                {patient.status === 'active' ? (
                  <span className="inline-flex items-center gap-1.5 text-[12px] font-bold text-emerald-500">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Active
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-[12px] font-bold text-red-500">
                    <span className="w-2 h-2 rounded-full bg-red-500"></span> Suspended
                  </span>
                )}
              </td>
              <td className="p-4 text-[13px] font-medium text-gray-500">{patient.date}</td>
              <td className="p-4 text-right pr-6 flex justify-end gap-2">
                {patient.status === 'active' ? (
                  <button className="px-3 py-1.5 bg-red-50 text-red-600 border border-red-100 rounded-md text-[11px] font-bold hover:bg-red-100">Suspend</button>
                ) : (
                  <button className="px-3 py-1.5 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-md text-[11px] font-bold hover:bg-emerald-100">Unban</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PatientTable;