
import React from 'react';
import { useFinance } from '../../context/FinanceContext';
import { TransactionType } from '../../types';
import { TrendingUp, TrendingDown, DollarSign, Activity } from 'lucide-react';

export const StatsGrid: React.FC = () => {
  const { transactions } = useFinance();

  const totalIncome = transactions
    .filter(t => t.type === TransactionType.INCOME)
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === TransactionType.EXPENSE || t.type === TransactionType.FIXED_CHARGE)
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpense;
  const savingsRate = totalIncome > 0 ? (balance / totalIncome) * 100 : 0;

  const stats = [
    { label: 'TOTAL_INCOME', value: totalIncome, icon: TrendingUp, color: 'text-cyber-cyan', border: 'border-cyber-cyan' },
    { label: 'TOTAL_BURNED', value: totalExpense, icon: TrendingDown, color: 'text-cyber-red', border: 'border-cyber-red' },
    { label: 'REMAINING_NET', value: balance, icon: DollarSign, color: 'text-white', border: 'border-white' },
    { label: 'SAVINGS_RATE', value: savingsRate.toFixed(1) + '%', icon: Activity, color: 'text-cyber-purple', border: 'border-cyber-purple' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, i) => (
        <div key={i} className={`cyber-panel p-5 rounded-lg border-l-4 ${stat.border} hover:scale-105 transition-transform duration-300`}>
          <div className="flex justify-between items-start mb-2">
            <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">{stat.label}</span>
            <stat.icon className={`w-4 h-4 ${stat.color}`} />
          </div>
          <div className={`text-2xl font-orbitron font-bold ${stat.color}`}>
            {typeof stat.value === 'number' ? `$${stat.value.toLocaleString()}` : stat.value}
          </div>
        </div>
      ))}
    </div>
  );
};
