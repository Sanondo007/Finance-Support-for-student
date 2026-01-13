
import React, { useState } from 'react';
import { useFinance } from '../../context/FinanceContext';
import { Category, TransactionType } from '../../types';
import { Button } from '../ui/Button';
import { PlusCircle, MinusCircle, FileText } from 'lucide-react';

const INCOME_CATEGORIES: Category[] = ['Family', 'Salary', 'Freelance', 'Scholarship', 'Coaching', 'Other'];
const EXPENSE_CATEGORIES: Category[] = ['Food', 'Transport', 'Education', 'Mobile', 'Internet', 'Rent', 'Utilities', 'Entertainment', 'Medical', 'Personal', 'Other'];

export const TransactionForm: React.FC = () => {
  const { addTransaction } = useFinance();
  const [type, setType] = useState<TransactionType>(TransactionType.EXPENSE);
  const [category, setCategory] = useState<Category>(EXPENSE_CATEGORIES[0]);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || parseFloat(amount) <= 0) return;

    addTransaction({
      type,
      category,
      amount: parseFloat(amount),
      description,
      date,
      isFixed: type === TransactionType.FIXED_CHARGE
    });

    setAmount('');
    setDescription('');
  };

  return (
    <div className="cyber-panel p-6 rounded-lg border-r-4 border-r-cyber-cyan h-full">
      <h3 className="font-orbitron text-xl text-cyber-cyan mb-6 flex items-center gap-2">
        <PlusCircle className="w-5 h-5" /> NEW_ENTRY
      </h3>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="flex gap-2 p-1 bg-black/40 border border-gray-800 rounded">
          <button
            type="button"
            onClick={() => { setType(TransactionType.EXPENSE); setCategory(EXPENSE_CATEGORIES[0]); }}
            className={`flex-1 py-2 text-xs font-orbitron transition-all ${type === TransactionType.EXPENSE ? 'bg-cyber-red text-white' : 'text-gray-500 hover:text-white'}`}
          >
            EXPENSE
          </button>
          <button
            type="button"
            onClick={() => { setType(TransactionType.INCOME); setCategory(INCOME_CATEGORIES[0]); }}
            className={`flex-1 py-2 text-xs font-orbitron transition-all ${type === TransactionType.INCOME ? 'bg-cyber-cyan text-black' : 'text-gray-500 hover:text-white'}`}
          >
            INCOME
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] font-mono text-gray-500 mb-1 uppercase">CATEGORY</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as Category)}
              className="w-full bg-black border border-gray-800 p-2 text-white font-inter text-sm outline-none focus:border-cyber-cyan transition-colors"
            >
              {(type === TransactionType.INCOME ? INCOME_CATEGORIES : EXPENSE_CATEGORIES).map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-[10px] font-mono text-gray-500 mb-1 uppercase">AMOUNT</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full bg-black border border-gray-800 p-2 text-white font-orbitron text-sm outline-none focus:border-cyber-cyan transition-colors"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-mono text-gray-500 mb-1 uppercase">DATE</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full bg-black border border-gray-800 p-2 text-white font-mono text-sm outline-none focus:border-cyber-cyan transition-colors"
          />
        </div>

        <div>
          <label className="block text-[10px] font-mono text-gray-500 mb-1 uppercase">DESCRIPTION (OPTIONAL)</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Data note..."
            className="w-full bg-black border border-gray-800 p-2 text-white font-inter text-sm outline-none focus:border-cyber-cyan transition-colors min-h-[80px]"
          />
        </div>

        <Button type="submit" variant={type === TransactionType.INCOME ? 'primary' : 'danger'} className="w-full">
          EXECUTE_LOG
        </Button>
      </form>
    </div>
  );
};
