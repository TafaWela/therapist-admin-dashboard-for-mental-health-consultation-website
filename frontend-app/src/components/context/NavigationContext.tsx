import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { NavigationContextType } from '../types';

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

interface NavigationProviderProps {
  children: ReactNode;
}

export const NavigationProvider: React.FC<NavigationProviderProps> = ({ children }) => {
  const [activeTab, setActiveTabState] = useState<string>(() => {
    const stored = localStorage.getItem('activeTab');
    return stored ? stored : 'dashboard';
  });

  const [previousTab, setPreviousTab] = useState<string>('dashboard');

  const setActiveTab = useCallback((tabId: string) => {
    setPreviousTab(activeTab);
    setActiveTabState(tabId);
    localStorage.setItem('activeTab', tabId);
  }, [activeTab]);

  const value: NavigationContextType = {
    activeTab,
    setActiveTab,
    previousTab,
  };

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = (): NavigationContextType => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within NavigationProvider');
  }
  return context;
};
