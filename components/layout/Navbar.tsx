
import React from 'react';
import { useFinance } from '../../context/FinanceContext';
import { Power, Terminal, Shield } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, logout } = useFinance();

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-cyber-dark/80 backdrop-blur-md border-b border-cyber-purple/30 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Terminal className="w-8 h-8 text-cyber-cyan" />
          <div>
            <h1 className="font-orbitron text-2xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-cyber-cyan to-cyber-purple">
              NEON_FINANCE
            </h1>
            <p className="text-[10px] font-mono text-gray-500 tracking-[0.3em] uppercase">Student survival grid v2.5</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-4 px-4 py-1 border border-cyber-purple/20 bg-cyber-purple/5 rounded-full">
            <Shield className="w-4 h-4 text-cyber-purple" />
            <span className="text-xs font-mono text-gray-400">USER: <span className="text-white">{user?.name}</span></span>
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          </div>
          
          <button 
            onClick={logout}
            className="p-2 text-gray-500 hover:text-cyber-red transition-colors"
            title="Disconnect"
          >
            <Power className="w-6 h-6" />
          </button>
        </div>
      </div>
    </nav>
  );
};
