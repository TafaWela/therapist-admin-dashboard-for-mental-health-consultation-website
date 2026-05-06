function Overview({ setActiveTab }) {
    return (
      <div id="view-dashboard" className="view-section animate-fade-in flex flex-col gap-6">
        {/* صف الكروت الأربعة */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* الكارت الأول */}
          <div className="bg-white rounded-[20px] p-6 shadow-sm border border-gray-100 flex flex-col">
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Total Patients</p>
            <div className="flex justify-between items-end">
              <h4 className="text-[32px] font-extrabold text-neurea-textDark leading-none">24,592</h4>
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                <i className="ph-fill ph-users text-xl"></i>
              </div>
            </div>
            <p className="text-[11px] font-semibold text-emerald-500 mt-3 flex items-center gap-1">
              <i className="ph-bold ph-trend-up"></i> +12% this month
            </p>
          </div>
  
          {/* الكارت التاني */}
          <div className="bg-white rounded-[20px] p-6 shadow-sm border border-gray-100 flex flex-col">
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Neurea Pro Subs</p>
            <div className="flex justify-between items-end">
              <h4 className="text-[32px] font-extrabold text-neurea-textDark leading-none">5,214</h4>
              <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-neurea-primary">
                <i className="ph-fill ph-diamond text-xl"></i>
              </div>
            </div>
            <p className="text-[11px] font-semibold text-emerald-500 mt-3 flex items-center gap-1">
              <i className="ph-bold ph-trend-up"></i> +5% this week
            </p>
          </div>
  
          {/* الكارت التالت */}
          <div className="bg-white rounded-[20px] p-6 shadow-sm border border-gray-100 flex flex-col">
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Active Therapists</p>
            <div className="flex justify-between items-end">
              <h4 className="text-[32px] font-extrabold text-neurea-textDark leading-none">342</h4>
              <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-500">
                <i className="ph-fill ph-stethoscope text-xl"></i>
              </div>
            </div>
            <p className="text-[11px] font-semibold text-gray-400 mt-3 flex items-center gap-1">
              Stable capacity
            </p>
          </div>
  
          {/* الكارت الرابع */}
          <div className="bg-white rounded-[20px] p-6 shadow-sm border border-gray-100 flex flex-col">
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Daily Active Users</p>
            <div className="flex justify-between items-end">
              <h4 className="text-[32px] font-extrabold text-neurea-textDark leading-none">12.8k</h4>
              <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500">
                <i className="ph-fill ph-activity text-xl"></i>
              </div>
            </div>
            <p className="text-[11px] font-semibold text-emerald-500 mt-3 flex items-center gap-1">
              <i className="ph-bold ph-trend-up"></i> High engagement
            </p>
          </div>
        </div>
  
        {/* قسم الإشعارات المهمة */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-2">
          <div className="bg-white rounded-[20px] shadow-sm border border-gray-100 p-6 flex flex-col">
            <div className="flex items-center justify-between mb-5">
              <h4 className="text-[16px] font-bold text-neurea-textDark flex items-center gap-2">
                <i className="ph-fill ph-warning-circle text-red-500"></i> Priority Actions Required
              </h4>
            </div>
            <p className="text-[12px] text-gray-500 mb-4">
              Pending reports and approvals that need administrative review.
            </p>
            
            <div className="flex flex-col gap-3">
              {/* التنبيه الأول */}
              <div className="p-4 border-l-4 border-red-500 bg-white border-y border-r rounded-r-[12px] shadow-sm">
                <div className="flex justify-between items-start mb-1">
                  <span className="text-[14px] font-bold text-neurea-textDark">Report: Unprofessional Behavior</span>
                  <span className="text-[11px] text-gray-400">2h ago</span>
                </div>
                <p className="text-[12px] text-gray-600 mb-2">
                  Patient Sarah Ahmed reported <span className="font-bold text-neurea-textDark">Dr. Mike Bruce</span>.
                </p>
                <button 
                  onClick={() => setActiveTab('reports')}
                  className="text-[12px] font-bold text-neurea-primary hover:underline"
                >
                  Investigate Ticket
                </button>
              </div>
  
              {/* التنبيه التاني */}
              <div className="p-4 border-l-4 border-orange-400 bg-white border-y border-r border-grey-100 rounded-r-[12px] shadow-sm">
                <div className="flex justify-between items-start mb-1">
                  <span className="text-[14px] font-bold text-neurea-textDark">Pending Therapist Verification</span>
                  <span className="text-[11px] text-gray-400">5h ago</span>
                </div>
                <p className="text-[12px] text-gray-600 mb-2">
                  <span className="font-bold text-neurea-textDark">Dr. Sarah Connor</span> uploaded medical license documents.
                </p>
                <button 
                  onClick={() => setActiveTab('therapists')}
                  className="text-[12px] font-bold text-neurea-primary hover:underline"
                >
                  Review Documents
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default Overview;