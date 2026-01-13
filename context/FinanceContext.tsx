
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Transaction, User, TransactionType, FinanceState } from '../types';

interface FinanceContextType extends FinanceState {
  login: (email: string, name: string) => void;
  logout: () => void;
  addTransaction: (t: Omit<Transaction, 'id'>) => void;
  deleteTransaction: (id: string) => void;
  setDailyBudget: (amount: number) => void;
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

export const FinanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<FinanceState>(() => {
    const saved = localStorage.getItem('neon_finance_state');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return { ...parsed, isAuthenticated: !!parsed.user };
      } catch (e) {
        return { user: null, transactions: [], isAuthenticated: false };
      }
    }
    return { user: null, transactions: [], isAuthenticated: false };
  });

  useEffect(() => {
    localStorage.setItem('neon_finance_state', JSON.stringify(state));
  }, [state]);

  const login = (email: string, name: string) => {
    setState(prev => ({
      ...prev,
      user: { id: Date.now().toString(), email, name },
      isAuthenticated: true
    }));
  };

  const logout = () => {
    setState({ user: null, transactions: [], isAuthenticated: false });
  };

  const addTransaction = (t: Omit<Transaction, 'id'>) => {
    const newTransaction = { ...t, id: Math.random().toString(36).substr(2, 9) };
    setState(prev => ({
      ...prev,
      transactions: [newTransaction, ...prev.transactions]
    }));
  };

  const deleteTransaction = (id: string) => {
    setState(prev => ({
      ...prev,
      transactions: prev.transactions.filter(t => t.id !== id)
    }));
  };

  const setDailyBudget = (amount: number) => {
    if (!state.user) return;
    setState(prev => ({
      ...prev,
      user: prev.user ? { ...prev.user, dailyBudgetInput: amount } : null
    }));
  };

  return (
    <FinanceContext.Provider value={{ ...state, login, logout, addTransaction, deleteTransaction, setDailyBudget }}>
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => {
  const context = useContext(FinanceContext);
  if (!context) throw new Error("useFinance must be used within FinanceProvider");
  return context;
};
