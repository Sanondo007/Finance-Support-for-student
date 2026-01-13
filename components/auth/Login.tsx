
import React, { useState } from 'react';
import { useFinance } from '../../context/FinanceContext';
import { Button } from '../ui/Button';
import { ShieldAlert, Fingerprint } from 'lucide-react';

export const Login: React.FC = () => {
  const { login } = useFinance();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [step, setStep] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && name) {
      login(email, name);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cyber-black px-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyber-purple/10 blur-[100px] rounded-full"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-cyber-cyan/10 blur-[100px] rounded-full"></div>
      </div>

      <div className="max-w-md w-full z-10">
        <div className="cyber-panel p-8 rounded-xl border-cyber-cyan shadow-neonCyan animate-in fade-in zoom-in duration-500">
          <div className="text-center mb-10">
            <div className="inline-block p-4 bg-cyber-cyan/10 rounded-full mb-4 border border-cyber-cyan/30">
              <Fingerprint className="w-12 h-12 text-cyber-cyan" />
            </div>
            <h1 className="font-orbitron text-3xl font-black mb-2 tracking-tight">GRID_ACCESS</h1>
            <p className="text-gray-500 font-mono text-xs uppercase tracking-widest">Authentication required for survival logs</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-mono text-cyber-cyan mb-2 uppercase">IDENTITY_IDENTIFIER (NAME)</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="OPERATOR_X"
                className="w-full bg-black border border-gray-800 p-3 text-white font-orbitron text-sm outline-none focus:border-cyber-cyan transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-cyber-cyan mb-2 uppercase">DATA_LINK (EMAIL)</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="OPERATOR@GRID.CORP"
                className="w-full bg-black border border-gray-800 p-3 text-white font-orbitron text-sm outline-none focus:border-cyber-cyan transition-colors"
                required
              />
            </div>

            <div className="bg-cyber-red/10 border border-cyber-red/30 p-4 flex gap-3">
              <ShieldAlert className="w-5 h-5 text-cyber-red shrink-0" />
              <p className="text-[10px] font-mono text-cyber-red">WARNING: Local decryption only. Data persists in browser buffer. Protect your terminal.</p>
            </div>

            <Button type="submit" variant="primary" size="lg" className="w-full mt-4">
              ESTABLISH_CONNECTION
            </Button>
          </form>

          <div className="mt-10 pt-6 border-t border-gray-900 text-center">
            <p className="text-[10px] font-mono text-gray-700">ENCRYPTION: AES-256-GCM [SIMULATED]</p>
          </div>
        </div>
      </div>
    </div>
  );
};
