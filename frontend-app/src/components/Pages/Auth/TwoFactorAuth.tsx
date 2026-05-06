import React, { MutableRefObject } from 'react';

interface TwoFactorAuthProps {
  codeInputs: string[];
  handleCodeInput: (index: number, value: string) => void;
  handleCodeKeyDown: (index: number, e: React.KeyboardEvent) => void;
  codeRefs: MutableRefObject<(HTMLInputElement | null)[]>;
  onVerify: () => void;
  onBack: () => void;
}

const TwoFactorAuth: React.FC<TwoFactorAuthProps> = ({
  codeInputs, handleCodeInput, handleCodeKeyDown, codeRefs, onVerify, onBack
}) => {
  return (
    <div className="w-full max-w-md p-6 animate-[slideUp_0.5s_cubic-bezier(0.16,1,0.3,1)_forwards]">
      <button
        onClick={onBack}
        className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-600 hover:text-[#5C2D91] hover:bg-purple-50 shadow-sm border border-gray-100 mb-6 transition-colors"
      >
        <i className="ph-bold ph-arrow-left text-lg"></i>
      </button>

      <div className="bg-white rounded-[24px] p-8 shadow-xl shadow-purple-900/5 border border-gray-100 flex flex-col items-center text-center">
        <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-blue-500 mb-6">
          <i className="ph-fill ph-device-mobile text-3xl"></i>
        </div>
        <h2 className="text-[22px] font-extrabold text-[#1E1E2A] mb-2">Two-Factor Authentication</h2>
        <p className="text-[13px] font-medium text-gray-500 leading-relaxed mb-8">
          Enter the security code sent to your device to verify it's you.
        </p>

        <div className="flex gap-2.5 justify-center w-full mb-8">
          {codeInputs.map((val, i) => (
            <input
              key={i}
              ref={(el) => { codeRefs.current[i] = el; }}
              type="number"
              maxLength={1}
              value={val}
              onChange={(e) => handleCodeInput(i, e.target.value)}
              onKeyDown={(e) => handleCodeKeyDown(i, e)}
              className="w-11 h-14 bg-gray-50 border border-gray-200 rounded-[12px] text-center text-[20px] font-bold text-[#1E1E2A] focus:outline-none focus:border-[#5C2D91] focus:bg-white transition-colors"
            />
          ))}
        </div>

        <button
          onClick={onVerify}
          className="w-full py-[14px] bg-[#5C2D91] hover:bg-purple-800 text-white rounded-[16px] text-[15px] font-bold transition-all shadow-lg shadow-purple-900/20 active:scale-[0.98] flex justify-center items-center"
        >
          Verify Identity
        </button>
      </div>
    </div>
  );
};

export default TwoFactorAuth;