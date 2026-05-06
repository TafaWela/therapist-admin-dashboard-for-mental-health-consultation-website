import React from 'react';

interface SuccessMessageProps {
  onBackToLogin: () => void;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({ onBackToLogin }) => {
  return (
    <div className="w-full max-w-md p-6 animate-[slideUp_0.5s_cubic-bezier(0.16,1,0.3,1)_forwards] text-center">
      <div className="bg-white rounded-[32px] p-10 shadow-xl border border-gray-100">
        <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500 mb-6 mx-auto">
          <i className="ph-fill ph-check-circle text-5xl"></i>
        </div>
        <h2 className="text-[24px] font-extrabold mb-2">All Set!</h2>
        <p className="text-[14px] text-gray-500 mb-8">Your password has been successfully reset. You can now log in with your new credentials.</p>
        <button
          onClick={onBackToLogin}
          className="w-full py-4 bg-[#5C2D91] hover:bg-purple-800 transition-colors text-white rounded-[18px] font-bold shadow-lg"
        >
          Back to Login
        </button>
      </div>
    </div>
  );
};

export default SuccessMessage;