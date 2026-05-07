import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// الـ Components اللي عملناها جوه فولدر Auth
import LoginForm from './Auth/LoginForm';
import TwoFactorAuth from './Auth/TwoFactorAuth';
import ResetPassword from './Auth/ResetPassword';
import SuccessMessage from './Auth/SuccessMessage';

import { formatLoginError } from '../../utils/loginErrors';

type View = 'login' | '2fa' | 'reset' | 'success';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login, loading } = useAuth();

  // States
  const [view, setView] = useState<View>('login');
  const [email, setEmail] = useState('dr.bruce@neurea.com');
  const [password, setPassword] = useState('password123');
  const [rememberMe, setRememberMe] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);
  const [codeInputs, setCodeInputs] = useState(['', '', '', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const codeRefs = useRef<(HTMLInputElement | null)[]>([]);

  const switchView = (v: View) => setView(v);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    try {
      const loggedInUser = await login(email, password);
      navigate(loggedInUser.role === 'admin' ? '/admin' : '/therapist');
    } catch (err) {
      setAuthError(formatLoginError(err));
    }
  };

  const handleCodeInput = (index: number, value: string) => {
    if (value.length > 1) return;
    const newInputs = [...codeInputs];
    newInputs[index] = value;
    setCodeInputs(newInputs);
    if (value && index < 5) {
      codeRefs.current[index + 1]?.focus();
    }
  };

  const handleCodeKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !codeInputs[index] && index > 0) {
      codeRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="bg-[#F4F5F9] flex items-center justify-center min-h-screen font-sans text-[#1E1E2A]">
      {view === 'login' && (
        <LoginForm 
          email={email}
          setEmail={(v) => {
            setEmail(v);
            setAuthError(null);
          }}
          password={password}
          setPassword={(v) => {
            setPassword(v);
            setAuthError(null);
          }}
          rememberMe={rememberMe} setRememberMe={setRememberMe}
          handleSignIn={handleSignIn}
          onForgotPassword={() => switchView('2fa')}
          authError={authError}
          submitting={loading}
        />
      )}

      {view === '2fa' && (
        <TwoFactorAuth 
          codeInputs={codeInputs}
          handleCodeInput={handleCodeInput}
          handleCodeKeyDown={handleCodeKeyDown}
          codeRefs={codeRefs}
          onVerify={() => switchView('reset')}
          onBack={() => switchView('login')}
        />
      )}

      {view === 'reset' && (
        <ResetPassword 
          newPassword={newPassword} setNewPassword={setNewPassword}
          confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword}
          onUpdate={() => switchView('success')}
          onBack={() => switchView('login')}
        />
      )}

      {view === 'success' && (
        <SuccessMessage onBackToLogin={() => switchView('login')} />
      )}
    </div>
  );
};

export default Login;