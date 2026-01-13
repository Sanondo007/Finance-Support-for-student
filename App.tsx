
import React from 'react';
import { FinanceProvider, useFinance } from './context/FinanceContext';
import { Login } from './components/auth/Login';
import { Navbar } from './components/layout/Navbar';
import { StatsGrid } from './components/dashboard/StatsGrid';
import { TransactionForm } from './components/forms/TransactionForm';
import { TransactionList } from './components/dashboard/TransactionList';
import { DailySurvival } from './components/dashboard/DailySurvival';
import { ExpenseChart } from './components/dashboard/ExpenseChart';
import { AIAdvisor } from './components/ai/AIAdvisor';

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-cyber-black pt-24 pb-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
          <div>
            <h2 className="text-4xl font-orbitron font-black text-white italic">DASHBOARD_V1.0</h2>
            <p className="text-cyber-cyan font-mono text-xs uppercase tracking-widest mt-1">Live data feed active // Monitor your credits</p>
          </div>
          <div className="text-right">
            <p className="text-gray-500 font-mono text-xs uppercase">System Clock</p>
            <p className="text-white font-orbitron text-lg">{new Date().toLocaleTimeString()}</p>
          </div>
        </div>

        {/* Top Stats */}
        <StatsGrid />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column - Forms & Daily Status */}
          <div className="lg:col-span-4 space-y-6">
            <DailySurvival />
            <TransactionForm />
          </div>

          {/* Center Column - Charts & Intelligence */}
          <div className="lg:col-span-5 space-y-6">
            <ExpenseChart />
            <AIAdvisor />
          </div>

          {/* Right Column - Transactions */}
          <div className="lg:col-span-3">
            <TransactionList />
          </div>
        </div>

        <footer className="pt-12 text-center text-[10px] font-mono text-gray-700 tracking-[0.5em] uppercase border-t border-gray-900 mt-20">
          Neon Finance Protocol // No Rights Reserved // Built for the Grid
        </footer>
      </div>
    </div>
  );
};

const AppContent: React.FC = () => {
  const { isAuthenticated } = useFinance();

  return (
    <>
      <div className="scanline-effect"></div>
      {!isAuthenticated ? <Login /> : (
        <>
          <Navbar />
          <Dashboard />
        </>
      )}
    </>
  );
};

const App: React.FC = () => {
  return (
    <FinanceProvider>
      <AppContent />
    </FinanceProvider>
  );
};

export default App;
