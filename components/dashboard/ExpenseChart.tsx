
import React from 'react';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip, 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend 
} from 'recharts';
import { useFinance } from '../../context/FinanceContext';
import { TransactionType } from '../../types';
import { PieChart as PieIcon, BarChart as BarIcon } from 'lucide-react';

export const ExpenseChart: React.FC = () => {
  const { transactions } = useFinance();

  const categoryData = transactions
    .filter(t => t.type === TransactionType.EXPENSE)
    .reduce((acc: any[], t) => {
      const existing = acc.find(item => item.name === t.category);
      if (existing) existing.value += t.amount;
      else acc.push({ name: t.category, value: t.amount });
      return acc;
    }, []);

  const COLORS = ['#00f3ff', '#bc13fe', '#ff00c1', '#ff003c', '#f3e600', '#005f73', '#00ff00', '#ff8800'];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">
      <div className="cyber-panel p-6 rounded-lg min-h-[350px]">
        <h3 className="font-orbitron text-lg mb-4 text-cyber-cyan flex items-center gap-2">
          <PieIcon className="w-5 h-5" /> ALLOCATION_MATRIX
        </h3>
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#0a0a0b', borderColor: '#00f3ff', color: '#fff' }}
                itemStyle={{ color: '#00f3ff' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="cyber-panel p-6 rounded-lg min-h-[350px]">
        <h3 className="font-orbitron text-lg mb-4 text-cyber-purple flex items-center gap-2">
          <BarIcon className="w-5 h-5" /> LOAD_ANALYSIS
        </h3>
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
              <XAxis dataKey="name" stroke="#555" fontSize={10} axisLine={false} tickLine={false} />
              <YAxis stroke="#555" fontSize={10} axisLine={false} tickLine={false} />
              <Tooltip 
                cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                contentStyle={{ backgroundColor: '#0a0a0b', borderColor: '#bc13fe', color: '#fff' }}
              />
              <Bar dataKey="value" fill="#bc13fe" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
