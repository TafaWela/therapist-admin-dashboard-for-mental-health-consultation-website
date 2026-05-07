import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { User, AuthContextType } from '../types';
import { loginRequest, fetchTherapistProfileByUserId } from '../../api/neureaApi.js';
import {
  extractTokenFromLoginResponse,
  buildAppUserFromLogin,
  normalizeApiNumericId,
} from '../../api/loginResponse.js';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

function hydrateUserFromStorage(): User | null {
  const stored = localStorage.getItem('user');
  if (!stored) return null;
  try {
    const parsed = JSON.parse(stored) as User;
    const n = normalizeApiNumericId(parsed?.id);
    if (n && n !== parsed.id) {
      const fixed = { ...parsed, id: n };
      localStorage.setItem('user', JSON.stringify(fixed));
      return fixed;
    }
    return parsed;
  } catch {
    return null;
  }
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    const stored = localStorage.getItem('isLoggedIn');
    return stored ? JSON.parse(stored) : false;
  });

  const [user, setUser] = useState<User | null>(() => hydrateUserFromStorage());

  const [loading, setLoading] = useState(false);

  const login = useCallback(async (email: string, password: string): Promise<User> => {
    setLoading(true);
    try {
      const data = await loginRequest(email, password);
      const token = extractTokenFromLoginResponse(data);
      if (!token) {
        throw new Error('Login succeeded but no token was returned. Check API response shape.');
      }
      let userData = buildAppUserFromLogin({ data, email, token });

      const rid = normalizeApiNumericId(userData.id) ?? userData.id;
      userData = { ...userData, id: rid };

      if (userData.role === 'therapist') {
        try {
          const profile = await fetchTherapistProfileByUserId(rid);
          const uid = profile?.user_id ?? profile?.userId;
          const pid = profile?.id;
          const canonical = normalizeApiNumericId(uid) ?? rid;
          userData = {
            ...userData,
            id: canonical,
            therapistProfileId: pid != null ? String(pid) : undefined,
          };
        } catch {
          /* keep rid-only userData */
        }
      }

      setUser(userData);
      setIsLoggedIn(true);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('isLoggedIn', JSON.stringify(true));
      localStorage.setItem('token', token);
      return userData;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('user');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('token');
  }, []);

  const verify2FA = useCallback(async (code: string) => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      if (!code || code.length !== 6 || !/^\d+$/.test(code)) {
        throw new Error('Invalid 2FA code. Please enter 6 digits.');
      }
      const t = localStorage.getItem('token');
      if (!t || !t.includes('.')) {
        localStorage.setItem('token', 'mock-token-2fa-' + Date.now());
      }
    } catch (error) {
      console.error('2FA error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const resetPassword = useCallback(async (newPassword: string) => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      if (!newPassword || newPassword.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }
      if (user) {
        const updatedUser = { ...user };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }
    } catch (error) {
      console.error('Password reset error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [user]);

  const value: AuthContextType = {
    isLoggedIn,
    user,
    userRole: user?.role || null,
    loading,
    login,
    logout,
    verify2FA,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
