
import React, { useState, useEffect } from 'react';
import { useFinance } from '../../context/FinanceContext';
import { getFinancialAdvice } from '../../services/gemini';
import { TransactionType } from '../../types';
import { Brain, Sparkles, RefreshCcw } from 'lucide-react';

export const AIAdvisor: React.FC = () => {
  const { transactions } = useFinance();
  const [advices, setAdvices] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchAdvice = async () => {
    setLoading(true);
    const totalIncome = transactions
      .filter(t => t.type === TransactionType.INCOME)
      .reduce((sum, t) => sum + t.amount, 0);
    const totalExpense = transactions
      .filter(t => t.type !== TransactionType.INCOME)
      .reduce((sum, t) => sum + t.amount, 0);
    
    const advice = await getFinancialAdvice(transactions, totalIncome - totalExpense);
    setAdvices(advice);
    setLoading(false);
  };

  useEffect(() => {
    if (transactions.length > 0 && advices.length === 0) {
      fetchAdvice();
    }
  }, [transactions]);

  return (
    <div className="cyber-panel p-6 rounded-lg border-b-2 border-b-cyber-pink overflow-hidden relative">
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <Brain className="w-20 h-20 text-cyber-pink" />
      </div>
      
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-orbitron text-xl text-cyber-pink flex items-center gap-2">
          <Sparkles className="w-5 h-5" /> GRID_INTELLIGENCE
        </h3>
        <button 
          onClick={fetchAdvice} 
          disabled={loading}
          className="text-gray-500 hover:text-cyber-pink transition-colors disabled:opacity-50"
        >
          <RefreshCcw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="animate-pulse space-y-3">
            <div className="h-4 bg-white/5 rounded w-3/4"></div>
            <div className="h-4 bg-white/5 rounded w-full"></div>
            <div className="h-4 bg-white/5 rounded w-2/3"></div>
          </div>
        ) : advices.length > 0 ? (
          advices.map((advice, i) => (
            <div key={i} className="flex gap-3 items-start group">
              <span className="text-cyber-pink font-orbitron text-xs mt-1">[{i+1}]</span>
              <p className="font-mono text-sm text-gray-300 leading-relaxed group-hover:text-white transition-colors">
                {advice}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 font-mono text-sm italic">Initialize transactions to activate AI node...</p>
        )}
      </div>
    </div>
  );
};
