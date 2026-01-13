
import React from 'react';
import { useFinance } from '../../context/FinanceContext';
import { TransactionType } from '../../types';
import { Trash2, TrendingDown, TrendingUp, Clock } from 'lucide-react';

export const TransactionList: React.FC = () => {
  const { transactions, deleteTransaction } = useFinance();

  return (
    <div className="cyber-panel p-6 rounded-lg border-l-4 border-l-cyber-purple h-full overflow-y-auto max-h-[500px]">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-orbitron text-xl text-cyber-purple flex items-center gap-2">
          <Clock className="w-5 h-5" /> RECENT_GRID_LOGS
        </h3>
      </div>

      <div className="space-y-4">
        {transactions.length === 0 ? (
          <p className="text-gray-500 font-mono text-center py-10">NO DATA FOUND IN LOCAL BUFFER...</p>
        ) : (
          transactions.map((t) => (
            <div key={t.id} className="group relative flex items-center justify-between p-3 border-b border-gray-800 hover:bg-white/5 transition-colors">
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-full ${t.type === TransactionType.INCOME ? 'bg-cyber-cyan/20' : 'bg-cyber-red/20'}`}>
                  {t.type === TransactionType.INCOME ? 
                    <TrendingUp className="w-5 h-5 text-cyber-cyan" /> : 
                    <TrendingDown className="w-5 h-5 text-cyber-red" />
                  }
                </div>
                <div>
                  <p className="font-orbitron text-sm font-bold tracking-wider">{t.category}</p>
                  <p className="text-xs text-gray-500 font-mono">{new Date(t.date).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <p className={`font-orbitron font-bold ${t.type === TransactionType.INCOME ? 'text-cyber-cyan' : 'text-cyber-red'}`}>
                  {t.type === TransactionType.INCOME ? '+' : '-'}${t.amount.toFixed(2)}
                </p>
                <button 
                  onClick={() => deleteTransaction(t.id)}
                  className="p-1 text-gray-600 hover:text-cyber-red transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
