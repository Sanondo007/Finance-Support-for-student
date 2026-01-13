
import React, { useState } from 'react';
import { useFinance } from '../../context/FinanceContext';
import { TransactionType } from '../../types';
import { Target, Wallet, Zap } from 'lucide-react';

export const DailySurvival: React.FC = () => {
  const { user, setDailyBudget, transactions } = useFinance();
  const [editMode, setEditMode] = useState(false);
  const [inputValue, setInputValue] = useState(user?.dailyBudgetInput?.toString() || '0');

  const today = new Date().toISOString().split('T')[0];
  const spentToday = transactions
    .filter(t => t.date.startsWith(today) && t.type === TransactionType.EXPENSE)
    .reduce((sum, t) => sum + t.amount, 0);

  const budget = user?.dailyBudgetInput || 0;
  const remaining = budget - spentToday;
  const percentage = budget > 0 ? Math.max(0, Math.min(100, (remaining / budget) * 100)) : 0;

  const handleSave = () => {
    setDailyBudget(parseFloat(inputValue) || 0);
    setEditMode(false);
  };

  return (
    <div className="cyber-panel p-6 rounded-lg border-t-2 border-t-cyber-cyan h-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-orbitron text-lg text-cyber-cyan flex items-center gap-2">
          <Target className="w-5 h-5" /> SURVIVAL_STATUS
        </h3>
        {editMode ? (
          <button onClick={handleSave} className="text-xs bg-cyber-cyan text-black px-2 py-1 font-orbitron">SYNC</button>
        ) : (
          <button onClick={() => setEditMode(true)} className="text-xs text-cyber-cyan font-mono hover:underline">SET_LIMIT</button>
        )}
      </div>

      <div className="space-y-6">
        {editMode ? (
          <div>
            <label className="block text-xs text-gray-500 font-mono mb-1">CASH_IN_HAND (STARTING)</label>
            <input 
              type="number" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full bg-black border border-cyber-cyan p-2 text-cyber-cyan font-orbitron"
              autoFocus
            />
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-black/40 p-3 border border-gray-800">
              <p className="text-xs text-gray-500 font-mono flex items-center gap-1"><Wallet className="w-3 h-3" /> INITIAL</p>
              <p className="text-xl font-orbitron text-white">${budget.toFixed(2)}</p>
            </div>
            <div className="bg-black/40 p-3 border border-gray-800">
              <p className="text-xs text-gray-500 font-mono flex items-center gap-1"><Zap className="w-3 h-3 text-cyber-red" /> SPENT</p>
              <p className="text-xl font-orbitron text-cyber-red">${spentToday.toFixed(2)}</p>
            </div>
          </div>
        )}

        <div className="relative pt-1">
          <div className="flex mb-2 items-center justify-between">
            <div>
              <span className="text-xs font-mono inline-block py-1 px-2 uppercase rounded-full text-cyber-cyan bg-cyber-cyan/10">
                REMAINING_BUFFER
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs font-mono inline-block text-cyber-cyan">
                {percentage.toFixed(0)}%
              </span>
            </div>
          </div>
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-800">
            <div 
              style={{ width: `${percentage}%` }}
              className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center transition-all duration-1000 ${
                percentage > 50 ? 'bg-cyber-cyan' : percentage > 20 ? 'bg-cyber-yellow' : 'bg-cyber-red'
              }`}
            ></div>
          </div>
          <p className={`text-2xl font-orbitron text-center ${remaining < 0 ? 'text-cyber-red shadow-neonRed' : 'text-white'}`}>
            ${remaining.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};
