import React from 'react';
// @ts-ignore
import logo from '../LOGO.png';
interface LoginFormProps {
  email: string;
  setEmail: (e: string) => void;
  password: string;
  setPassword: (p: string) => void;
  rememberMe: boolean;
  setRememberMe: (r: boolean) => void;
  handleSignIn: (e: React.FormEvent) => void;
  onForgotPassword: () => void;
  authError?: string | null;
  /** Disables submit while a request is in flight */
  submitting?: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({
  email, setEmail, password, setPassword, rememberMe, setRememberMe, handleSignIn, onForgotPassword,
  authError, submitting,
}) => {
  return (
    <div className="w-full max-w-md p-6 animate-[slideUp_0.5s_cubic-bezier(0.16,1,0.3,1)_forwards]">
      <div className="flex flex-col items-center justify-center mb-10">
        <img src={logo} className="h-16 w-auto mb-2 drop-shadow-sm" alt="Neurea" />
        <p className="text-[13px] font-medium text-gray-400 tracking-wide uppercase">
          Secure access for Therapist &amp; Admin staff
        </p>
      </div>

      <div className="bg-white rounded-[32px] p-10 shadow-[0_20px_50px_rgba(76,29,149,0.08)] border border-gray-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#5C2D91]/20 to-transparent"></div>

        <form onSubmit={handleSignIn} className="flex flex-col gap-6">
          {authError && (
            <div
              role="alert"
              className="rounded-[14px] border border-red-100 bg-red-50 px-4 py-3 text-[13px] font-medium text-red-800"
            >
              {authError}
            </div>
          )}

          <div>
            <label className="block text-[12px] font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Work Email</label>
            <div className="relative group">
              <i className="ph-bold ph-envelope-simple absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg group-focus-within:text-[#5C2D91] transition-colors"></i>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-50/50 border border-gray-100 rounded-[18px] pl-12 pr-4 py-4 text-[15px] font-semibold text-[#1E1E2A] outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[12px] font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Password</label>
            <div className="relative group">
              <i className="ph-bold ph-lock-key absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg group-focus-within:text-[#5C2D91] transition-colors"></i>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-[18px] pl-12 pr-12 py-4 text-[15px] font-medium text-[#1E1E2A] focus:ring-4 focus:ring-purple-500/5 focus:border-[#5C2D91] focus:bg-white transition-all outline-none"
              />
            </div>
          </div>

          <div className="flex items-center justify-between px-1">
            <label className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded-md border-gray-300 text-[#5C2D91] focus:ring-[#5C2D91]/20 transition-all"
              />
              <span className="text-[13px] font-medium text-gray-500 group-hover:text-gray-700 transition-colors">Remember me</span>
            </label>
            <button
              type="button"
              onClick={onForgotPassword}
              className="text-[13px] font-bold text-[#5C2D91] hover:text-purple-800 transition-colors"
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            disabled={!!submitting}
            className="w-full mt-2 py-4 bg-gradient-to-br from-[#5C2D91] to-[#5a2491] hover:to-[#5C2D91] text-white rounded-[20px] text-[16px] font-bold transition-all shadow-[0_10px_25px_-5px_rgba(107,33,168,0.4)] active:scale-[0.97] flex justify-center items-center disabled:opacity-60 disabled:pointer-events-none"
          >
            {submitting ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;