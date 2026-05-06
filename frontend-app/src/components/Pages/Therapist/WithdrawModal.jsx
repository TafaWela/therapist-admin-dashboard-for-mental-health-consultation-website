import React, { useState } from 'react';

function WithdrawModal({ isOpen, onClose }) {
  const [saveStatus, setSaveStatus] = useState('idle');
  const [amount, setAmount] = useState(1250);

  if (!isOpen) return null;

  const handleWithdraw = () => {
    setSaveStatus('loading');
    // محاكاة لعملية السحب
    setTimeout(() => {
      setSaveStatus('saved');
      setTimeout(() => {
        setSaveStatus('idle');
        onClose(); // يقفل المودال بعد النجاح
      }, 1000);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* الخلفية الضبابية */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-[fadeIn_0.3s_ease-out]" 
        onClick={onClose}
      ></div>

      {/* محتوى المودال */}
      <div className="relative w-full max-w-md bg-white rounded-[24px] p-8 shadow-2xl animate-[slideUp_0.4s_cubic-bezier(0.16,1,0.3,1)] flex flex-col z-10">

        <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center text-[#5C2D91]">
              <i className="ph-bold ph-bank text-xl"></i>
            </div>
            <h3 className="text-[20px] font-extrabold text-[#1E1E2A]">Withdraw Funds</h3>
          </div>
          <button onClick={onClose} className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors">
            <i className="ph-bold ph-x text-sm"></i>
          </button>
        </div>

        <div className="mb-6 flex justify-between items-center bg-gray-50 p-4 rounded-[14px] border border-gray-200">
          <span className="text-[13px] font-bold text-gray-500">Available to withdraw:</span>
          <span className="text-[16px] font-extrabold text-[#1E1E2A]">$1,250.00</span>
        </div>

        <div className="flex flex-col gap-5 mb-8">
          <div>
            <label className="block text-[12px] font-bold text-gray-500 uppercase tracking-wide mb-2">Amount</label>
            <div className="relative">
              <i className="ph-bold ph-currency-dollar absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg"></i>
              <input 
                type="number" 
                placeholder="0.00" 
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-[14px] pl-11 pr-4 py-3.5 text-[18px] font-bold text-[#1E1E2A] focus:outline-none focus:border-[#5C2D91] focus:ring-1 focus:ring-[#5C2D91] transition-colors" 
              />
            </div>
          </div>

          <div>
            <label className="block text-[12px] font-bold text-gray-500 uppercase tracking-wide mb-2">Transfer To</label>
            <div className="relative">
              <i className="ph-bold ph-buildings absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg"></i>
              <select className="w-full appearance-none bg-white border border-gray-200 rounded-[14px] pl-11 pr-10 py-3.5 text-[14px] font-medium text-[#1E1E2A] focus:outline-none focus:border-[#5C2D91] transition-colors cursor-pointer">
                <option value="bank1">Chase Bank (**** 1234)</option>
                <option value="bank2">Bank of America (**** 5678)</option>
              </select>
              <i className="ph-bold ph-caret-down absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"></i>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-gray-100 pt-6">
          <button onClick={onClose} className="px-6 py-3.5 bg-white border border-gray-200 text-gray-600 rounded-[14px] text-[13px] font-bold hover:bg-gray-50 transition-colors shadow-sm">
            Cancel
          </button>
          <button 
            onClick={handleWithdraw}
            disabled={saveStatus !== 'idle'}
            className={`px-6 py-3.5 text-white rounded-[14px] text-[14px] font-bold transition-all flex items-center justify-center min-w-[160px] gap-2 ${saveStatus === 'saved' ? 'bg-emerald-500 shadow-emerald-900/20' : 'bg-[#5C2D91] hover:bg-purple-800 shadow-purple-900/20'} ${saveStatus !== 'idle' ? 'pointer-events-none' : ''}`}
          >
            {saveStatus === 'idle' && 'Confirm Transfer'}
            {saveStatus === 'loading' && <i className="ph-bold ph-spinner-gap animate-spin text-lg"></i>}
            {saveStatus === 'saved' && <><i className="ph-bold ph-check text-lg"></i> Success</>}
          </button>
        </div>

      </div>
    </div>
  );
}

export default WithdrawModal;