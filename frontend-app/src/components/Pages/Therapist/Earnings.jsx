import React, { useState } from 'react';
import WithdrawModal from './WithdrawModal'; // استيراد المودال

// قاعدة بيانات وهمية للمعاملات (Transactions)
const transactionsData = [
  { id: 1, date: 'Mar 18, 2026', title: 'Sarah Ahmed', type: 'Session', typeIcon: 'ph-chat-teardrop-text', amount: '+$60.00', status: 'Pending', isNegative: false },
  { id: 2, date: 'Mar 17, 2026', title: 'Mohamed Ali', type: 'Session', typeIcon: 'ph-chat-teardrop-text', amount: '+$60.00', status: 'Cleared', isNegative: false },
  { id: 3, date: 'Mar 15, 2026', title: 'Transfer to Bank ****1234', titleIcon: 'ph-bank', type: 'Withdrawal', typeIcon: '', amount: '-$500.00', status: 'Completed', isNegative: true },
  { id: 4, date: 'Mar 14, 2026', title: 'Emma Watson', type: 'Session', typeIcon: 'ph-chat-teardrop-text', amount: '+$60.00', status: 'Cleared', isNegative: false },
];

function Earnings() {
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);

  // دالة صغيرة عشان تحدد لون الـ Status
  const getStatusColor = (status) => {
    switch(status) {
      case 'Pending': return 'text-orange-500';
      case 'Cleared': 
      case 'Completed': return 'text-emerald-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="animate-[fadeIn_0.4s_ease-out_forwards] flex flex-col h-full relative">
      
      {/* Header */}
      <div className="flex justify-between items-end mb-6">
        <div className="flex flex-col">
          <h3 className="text-[24px] font-extrabold text-[#1E1E2A]">Earnings & Wallet</h3>
          <p className="text-[13px] text-gray-500">Track your revenue, view transaction history, and manage payouts.</p>
        </div>
        <button 
          onClick={() => setIsWithdrawOpen(true)}
          className="px-5 py-2.5 bg-[#5C2D91] hover:bg-purple-800 text-white text-[13px] font-bold rounded-[14px] shadow-sm flex items-center gap-2 transition-all active:scale-95"
        >
          <i className="ph-bold ph-bank text-lg"></i> Withdraw Funds
        </button>
      </div>

      {/* 3 Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Card 1: Available Balance */}
        <div className="bg-gradient-to-br from-[#5C2D91] to-[#3a1c5d] rounded-[20px] p-6 shadow-md text-white flex flex-col justify-between relative overflow-hidden h-[160px]">
          <div className="absolute -right-6 -top-6 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none"></div>
          <i className="ph-fill ph-wallet absolute right-6 bottom-6 text-[80px] text-white/5 pointer-events-none"></i>
          <div className="relative z-10">
            <div className="flex justify-between items-start">
              <p className="text-[12px] font-bold text-purple-200 uppercase tracking-widest mb-1 flex items-center gap-2">
                Available Balance
              </p>
            </div>
            <h4 className="text-[36px] font-extrabold leading-none mb-1 mt-2">$1,250.00</h4>
            <p className="text-[12px] text-purple-200 font-medium">Ready for withdrawal to Bank ****1234</p>
          </div>
        </div>

        {/* Card 2: Pending Clearance */}
        <div className="bg-white rounded-[20px] p-6 shadow-sm border border-gray-100 flex flex-col justify-between h-[160px]">
          <div className="flex justify-between items-start">
            <p className="text-[12px] font-bold text-gray-400 uppercase tracking-widest mb-1">Pending Clearance</p>
            <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center text-orange-500">
              <i className="ph-bold ph-clock text-lg"></i>
            </div>
          </div>
          <div>
            <h4 className="text-[32px] font-extrabold text-[#1E1E2A] leading-none mb-1">$180.00</h4>
            <p className="text-[11px] font-medium text-gray-500">From 3 recent sessions</p>
          </div>
        </div>

        {/* Card 3: Monthly Earnings */}
        <div className="bg-white rounded-[20px] p-6 shadow-sm border border-gray-100 flex flex-col justify-between h-[160px]">
          <div className="flex justify-between items-start">
            <p className="text-[12px] font-bold text-gray-400 uppercase tracking-widest mb-1">Monthly Earnings</p>
            <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500">
              <i className="ph-bold ph-trend-up text-lg"></i>
            </div>
          </div>
          <div>
            <h4 className="text-[32px] font-extrabold text-[#1E1E2A] leading-none mb-1">$1,430.00</h4>
            <p className="text-[11px] font-semibold text-emerald-500">24 sessions completed</p>
          </div>
        </div>
      </div>

      {/* Transaction History Table */}
      <div className="bg-white rounded-[20px] shadow-sm border border-gray-100 flex flex-col flex-1 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <h3 className="text-[16px] font-bold text-[#1E1E2A]">Transaction History</h3>
          <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-lg text-[12px] font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
            <i className="ph-bold ph-download-simple"></i> Export CSV
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white border-b border-gray-200 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                <th className="p-4 pl-6">Date</th>
                <th className="p-4">Description</th>
                <th className="p-4">Type</th>
                <th className="p-4">Amount</th>
                <th className="p-4 text-right pr-6">Status</th>
              </tr>
            </thead>
            <tbody>
              {transactionsData.map((txn) => (
                <tr key={txn.id} className={`hover:bg-gray-50 transition-colors border-b border-gray-50 ${txn.isNegative ? 'bg-gray-50/30' : ''}`}>
                  <td className="p-4 pl-6 text-[13px] font-medium text-gray-500">{txn.date}</td>
                  <td className="p-4">
                    <span className="text-[14px] font-bold text-[#1E1E2A] flex items-center gap-2">
                      {txn.titleIcon && <i className={`ph-fill ${txn.titleIcon} text-gray-400`}></i>}
                      {txn.title}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold ${txn.isNegative ? 'bg-gray-100 text-gray-600' : 'bg-purple-50 text-[#5C2D91]'}`}>
                      {txn.typeIcon && <i className={`ph-fill ${txn.typeIcon}`}></i>} {txn.type}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`text-[14px] font-bold ${txn.isNegative ? 'text-[#1E1E2A]' : 'text-emerald-600'}`}>
                      {txn.amount}
                    </span>
                  </td>
                  <td className="p-4 text-right pr-6">
                    <span className={`text-[12px] font-bold ${getStatusColor(txn.status)}`}>
                      {txn.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* المناداة على مودال السحب */}
      <WithdrawModal 
        isOpen={isWithdrawOpen} 
        onClose={() => setIsWithdrawOpen(false)} 
      />

    </div>
  );
}

export default Earnings;