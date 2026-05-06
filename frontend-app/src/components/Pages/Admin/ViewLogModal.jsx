function ViewLogModal({ onClose }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
      
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in" onClick={onClose}></div>

            <div className="relative w-full max-w-2xl bg-white rounded-[24px] p-8 shadow-2xl animate-pop-in flex flex-col">
                <div className="flex justify-between items-start mb-6 border-b border-gray-100 pb-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center font-bold text-xl">
                            <i className="ph-bold ph-file-text"></i>
                        </div>
                        <div>
                            <h3 className="text-[20px] font-extrabold text-gray-900">Incident Report Log</h3>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="text-[13px] text-gray-500 font-medium">Ticket ID:</span>
                                <span className="text-[12px] font-bold text-gray-700 bg-gray-100 px-2 py-0.5 rounded-md tracking-wider">#REP-090</span>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors"
                    >
                        <i className="ph-bold ph-x text-sm"></i>
                    </button>
                </div>

                <div className="grid grid-cols-2 gap-y-6 gap-x-8 mb-6">
                    <div className="col-span-1">
                        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Reported By</p>
                        <p className="text-[14px] font-bold text-gray-900">Nour Youssef <span className="text-[12px] font-normal text-gray-500 ml-1">(Patient)</span></p>
                    </div>
                    <div className="col-span-1">
                        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Reported Entity</p>
                        <p className="text-[14px] font-bold text-[#5C2D91]">Dr. Samer Kamal <span className="text-[12px] font-normal text-gray-500 ml-1">(Therapist)</span></p>
                    </div>
                    <div className="col-span-1">
                        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Incident Date</p>
                        <p className="text-[14px] font-semibold text-gray-800">September 05, 2025</p>
                    </div>
                    <div className="col-span-1">
                        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Resolution Status</p>
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-green-50 text-green-700 rounded-md text-[12px] font-bold mt-1 border border-green-100">
                            <i className="ph-bold ph-check"></i> Warning Issued
                        </span>
                    </div>
                </div>

                <div className="bg-[#F8F9FA] rounded-[16px] p-5 mb-6 border border-gray-100">
                    <h4 className="text-[13px] font-bold text-gray-800 mb-2">Patient Complaint:</h4>
                    <p className="text-[13px] text-gray-600 leading-relaxed italic border-l-2 border-gray-300 pl-3">
                        "The therapist was 15 minutes late to the session without prior notice and seemed distracted during the consultation."
                    </p>
                    <div className="w-full h-px bg-gray-200 my-4"></div>
                    <h4 className="text-[13px] font-bold text-gray-800 mb-2 flex items-center gap-2">
                        <i className="ph-bold ph-shield-check text-[#5C2D91]"></i> Admin Investigation Notes:
                    </h4>
                    <p className="text-[13px] text-gray-600 leading-relaxed">
                        Reviewed platform connection logs. Therapist joined the encrypted room at 15:14 for a 15:00 appointment. Spoke with Dr. Samer Kamal, who cited a technical issue but failed to use the Neurea emergency notification system. Official warning issued to their file. Patient account credited with 1 free session.
                    </p>
                </div>

                <div className="flex justify-end pt-4 border-t border-gray-100">
                    <button
                        onClick={onClose}
                        className="px-6 py-2.5 bg-white border border-gray-200 text-gray-600 rounded-[10px] text-[13px] font-bold hover:bg-gray-50 transition-colors shadow-sm"
                    >
                        Close Log
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ViewLogModal;