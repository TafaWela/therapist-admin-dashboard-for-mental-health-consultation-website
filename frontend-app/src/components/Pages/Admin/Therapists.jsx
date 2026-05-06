import { useState } from 'react';
import AddTherapistModal from './AddTherapistModal';
import TherapistProfileModal from './TherapistProfileModal';
function Therapists() {
    // جهزتلك الـ States دي عشان تفتح وتقفل المودالز لما تبعتي الكود بتاعهم
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

    return (
        // شيلت كلاس hidden وضفت relative عشان المودالز لما تيجي تفتح صح
        <div id="view-therapists" className="view-section animate-fade-in flex flex-col h-full relative">

            {/* الهيدر وزرار الإضافة */}
            <div className="flex justify-between items-end mb-6">
                <div className="flex flex-col">
                    <h3 className="text-[24px] font-extrabold text-neurea-textDark">Therapist Management</h3>
                    <p className="text-[13px] text-gray-500">Onboard new clinical staff and manage active therapist accounts.</p>
                </div>
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="px-5 py-2.5 bg-[#5C2D91] hover:bg-purple-800 text-white text-[13px] font-bold rounded-xl shadow-sm flex items-center gap-2 transition-colors"
                >
                    <i className="ph-bold ph-plus"></i> Add New Therapist
                </button>
            </div>

            {/* الجدول / القائمة بتاعت الدكاترة */}
            <div className="bg-white rounded-[20px] shadow-sm border border-gray-100 flex flex-col flex-1 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                    <h3 className="text-[16px] font-bold text-neurea-textDark">Active Therapists Directory</h3>
                </div>

                <div className="p-6 flex flex-col gap-3">
                    {/* الدكتور الأول */}
                    <div className="border border-gray-100 rounded-[16px] p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                        <div className="flex items-center gap-4">
                            {/* قفلنا تاج الـ img هنا */}
                            <img src="https://i.pravatar.cc/150?u=drmike" alt="Dr. Mike" className="w-12 h-12 rounded-full object-cover border border-gray-200" />
                            <div className="flex flex-col">
                                <span className="text-[15px] font-bold text-neurea-textDark">Dr. Mike Bruce</span>
                                <span className="text-[12px] font-medium text-gray-500">Trauma Specialist • dr.bruce@neurea.com</span>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setIsProfileModalOpen(true)}
                                className="text-[12px] font-bold text-gray-600 hover:text-[#5C2D91] px-4 py-2 border border-gray-200 rounded-lg bg-white shadow-sm transition-colors"
                            >
                                View Profile
                            </button>
                            <button className="text-[12px] font-bold text-red-500 hover:text-red-700 px-4 py-2 border border-red-100 rounded-lg bg-red-50">
                                Suspend
                            </button>
                        </div>
                    </div>

                    {/* الدكتور التاني */}
                    <div className="border border-gray-100 rounded-[16px] p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center font-bold text-lg border border-blue-100">
                                SA
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[15px] font-bold text-neurea-textDark">Dr. Sarah Ahmed</span>
                                <span className="text-[12px] font-medium text-gray-500">Clinical Psychiatrist • dr.sarah@neurea.com</span>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setIsProfileModalOpen(true)}
                                className="text-[12px] font-bold text-gray-600 hover:text-neurea-primary px-4 py-2 border border-gray-200 rounded-lg bg-white shadow-sm"
                            >
                                View Profile
                            </button>
                            <button className="text-[12px] font-bold text-red-500 hover:text-red-700 px-4 py-2 border border-red-100 rounded-lg bg-red-50">
                                Suspend
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* استدعاء المودال هنا */}
            {isAddModalOpen && <AddTherapistModal onClose={() => setIsAddModalOpen(false)} />}
       {/* استدعاء المودال هنا */}
{isProfileModalOpen && <TherapistProfileModal onClose={() => setIsProfileModalOpen(false)} />}
        </div>
    );
}

export default Therapists;