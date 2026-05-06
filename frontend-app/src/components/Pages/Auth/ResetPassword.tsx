import React from 'react';

interface ResetPasswordProps {
  newPassword: string;
  setNewPassword: (p: string) => void;
  confirmPassword: string;
  setConfirmPassword: (p: string) => void;
  onUpdate: () => void;
  onBack: () => void;
}

const ResetPassword: React.FC<ResetPasswordProps> = ({
  newPassword, setNewPassword, confirmPassword, setConfirmPassword, onUpdate, onBack
}) => {
  return (
    <div className="w-full max-w-md p-6 animate-[slideUp_0.5s_cubic-bezier(0.16,1,0.3,1)_forwards]">
      <button
        onClick={onBack}
        className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-600 hover:text-[#5C2D91] hover:bg-purple-50 shadow-sm border border-gray-100 mb-6 transition-colors"
      >
        <i className="ph-bold ph-arrow-left text-lg"></i>
      </button>
      <div className="bg-white rounded-[32px] p-10 shadow-xl border border-gray-100">
        <h2 className="text-[22px] font-extrabold mb-2 text-center">New Password</h2>
        <p className="text-[13px] text-gray-500 mb-8 text-center">Your password must atleast 6 charachters.</p>
        <div className="flex flex-col gap-5">
          <div>
            <label className="block text-[12px] font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">New Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-[18px] px-5 py-4 text-[15px] outline-none focus:border-[#5C2D91]"
            />
          </div>
          <div>
            <label className="block text-[12px] font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Confirm Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-[18px] px-5 py-4 text-[15px] outline-none focus:border-[#5C2D91]"
            />
          </div>
          <button
            onClick={onUpdate}
            className="w-full mt-2 py-4 bg-[#5C2D91] text-white rounded-[18px] font-bold shadow-lg hover:bg-purple-800 transition-colors"
          >
            Update Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;