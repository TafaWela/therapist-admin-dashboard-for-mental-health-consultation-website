import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { User, AuthContextType } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

// Mock test accounts for development (no backend required)
const MOCK_ACCOUNTS: Array<{ email: string; password: string; user: User }> = [
  {
    email: 'admin@neurea.com',
    password: 'password123',
    user: { id: '1', name: 'Admin User', email: 'admin@neurea.com', role: 'admin', avatar: '', status: 'active', createdAt: new Date().toISOString() }
  },
  {
    email: 'therapist@neurea.com',
    password: 'password123',
    user: { id: '2', name: 'Dr. John Therapist', email: 'therapist@neurea.com', role: 'therapist', avatar: '', status: 'active', createdAt: new Date().toISOString() }
  },
  {
    email: 'dr.bruce@neurea.com',
    password: '123456m',
    user: { id: '3', name: 'Dr. Bruce', email: 'dr.bruce@neurea.com', role: 'therapist', avatar: '', status: 'active', createdAt: new Date().toISOString() }
  },
];

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    const stored = localStorage.getItem('isLoggedIn');
    return stored ? JSON.parse(stored) : false;
  });

  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });

  const [loading, setLoading] = useState(false);

  const login = useCallback(async (email: string, password: string, role?: string) => {
    setLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));

      // If role is explicitly passed, use it directly
      if (role) {
        const userData = {
          id: Date.now().toString(),
          name: role === 'admin' ? 'Yousef Mohamed' : 'Dr. Mike Bruce',
          email,
          role: (role === 'admin' ? 'admin' : 'therapist') as 'admin' | 'therapist',
          avatar: '',
          status: 'active' as const,
          createdAt: new Date().toISOString()
        };
        setUser(userData);
        setIsLoggedIn(true);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('isLoggedIn', JSON.stringify(true));
        localStorage.setItem('token', 'mock-token-' + Date.now());
        return;
      }

      // Check mock accounts
      const account = MOCK_ACCOUNTS.find(acc => acc.email === email && acc.password === password);
      
      if (!account) {
        // Fallback: determine role from email
        const inferredRole: 'admin' | 'therapist' = (email.includes('admin') || email.includes('yousef')) ? 'admin' : 'therapist';
        const userData = {
          id: Date.now().toString(),
          name: inferredRole === 'admin' ? 'Yousef Mohamed' : 'Dr. Mike Bruce',
          email,
          role: inferredRole,
          avatar: '',
          status: 'active' as const,
          createdAt: new Date().toISOString()
        };
        setUser(userData);
        setIsLoggedIn(true);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('isLoggedIn', JSON.stringify(true));
        localStorage.setItem('token', 'mock-token-' + Date.now());
        return;
      }

      const userData = account.user;
      setUser(userData);
      setIsLoggedIn(true);

      // Store in localStorage
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('isLoggedIn', JSON.stringify(true));
      localStorage.setItem('token', 'mock-token-' + Date.now());
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
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mock: accept any 6-digit code
      if (!code || code.length !== 6 || !/^\d+$/.test(code)) {
        throw new Error('Invalid 2FA code. Please enter 6 digits.');
      }
      
      // Mock: always succeed (in real scenario, verify against backend)
      localStorage.setItem('token', 'mock-token-2fa-' + Date.now());
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
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (!newPassword || newPassword.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }
      
      // Mock: simulate successful password reset
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
  }, []);

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
