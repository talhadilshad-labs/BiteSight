import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Store, User, ChevronRight, ArrowLeft } from 'lucide-react';
import { Role, UserProfile } from '../types';
import { Logo } from './Shared';

export const OnboardingScreen: React.FC<{ onLogin: (user: UserProfile) => void }> = ({ onLogin }) => {
  const [step, setStep] = useState<'splash' | 'role' | 'auth'>('splash');
  const [selectedRole, setSelectedRole] = useState<Role>(null);
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  if (step === 'splash') {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center min-h-screen p-6 text-center bg-black">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-brand/20 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand/10 blur-[100px] rounded-full" />
        </div>
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.1 }} className="w-24 h-24 bg-zinc-900 border border-zinc-800 rounded-3xl flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(255,193,7,0.15)]">
          <Logo className="w-16 h-16" />
        </motion.div>
        <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="text-5xl font-bold tracking-tight mb-4 text-white">Bite<span className="text-brand">Sight</span></motion.h1>
        <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="text-gray-400 text-xl mb-12 font-light tracking-wide">See It Before You Eat It</motion.p>
        <motion.button initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }} onClick={() => setStep('role')} className="w-full max-w-sm bg-brand text-black font-bold py-4 rounded-2xl flex items-center justify-center gap-2 text-lg shadow-[0_0_20px_rgba(255,193,7,0.2)] hover:bg-brand/90 transition-colors">
          Get Started <ChevronRight className="w-5 h-5" />
        </motion.button>
      </motion.div>
    );
  }

  if (step === 'role') {
    return (
      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col min-h-screen p-6 bg-black">
        <button onClick={() => setStep('splash')} className="w-10 h-10 bg-zinc-900 rounded-full flex items-center justify-center mb-8 text-gray-400 hover:text-white transition-colors"><ArrowLeft className="w-5 h-5" /></button>
        <h2 className="text-3xl font-bold mb-2 text-white">Choose your path</h2>
        <p className="text-gray-400 mb-10">How would you like to use BiteSight?</p>
        <div className="space-y-4">
          <button onClick={() => { setSelectedRole('customer'); setStep('auth'); }} className="w-full bg-zinc-900/50 border border-zinc-800 p-6 rounded-3xl flex items-center gap-6 hover:border-brand hover:bg-brand/5 transition-all text-left group">
            <div className="w-14 h-14 bg-zinc-800 rounded-2xl flex items-center justify-center text-gray-400 group-hover:bg-brand group-hover:text-black transition-colors"><User className="w-7 h-7" /></div>
            <div><h3 className="font-bold text-xl text-white mb-1">Food Lover</h3><p className="text-sm text-gray-400">Browse AR menus and order</p></div>
          </button>
          <button onClick={() => { setSelectedRole('restaurant'); setStep('auth'); }} className="w-full bg-zinc-900/50 border border-zinc-800 p-6 rounded-3xl flex items-center gap-6 hover:border-brand hover:bg-brand/5 transition-all text-left group">
            <div className="w-14 h-14 bg-zinc-800 rounded-2xl flex items-center justify-center text-gray-400 group-hover:bg-brand group-hover:text-black transition-colors"><Store className="w-7 h-7" /></div>
            <div><h3 className="font-bold text-xl text-white mb-1">Restaurant Owner</h3><p className="text-sm text-gray-400">Manage menu and view analytics</p></div>
          </button>
        </div>
      </motion.div>
    );
  }

  const handleAuth = () => {
    if (!email) return;
    if (!isLogin && !name) return;
    
    onLogin({
      name: isLogin ? (email.split('@')[0] || 'User') : name,
      email,
      role: selectedRole
    });
  };

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col min-h-screen p-6 bg-black">
      <button onClick={() => setStep('role')} className="w-10 h-10 bg-zinc-900 rounded-full flex items-center justify-center mb-8 text-gray-400 hover:text-white transition-colors"><ArrowLeft className="w-5 h-5" /></button>
      
      <div className="flex gap-4 mb-8 border-b border-zinc-800 pb-2">
        <button onClick={() => setIsLogin(true)} className={`text-lg font-bold pb-2 border-b-2 transition-colors ${isLogin ? 'border-brand text-white' : 'border-transparent text-gray-500 hover:text-gray-300'}`}>Sign In</button>
        <button onClick={() => setIsLogin(false)} className={`text-lg font-bold pb-2 border-b-2 transition-colors ${!isLogin ? 'border-brand text-white' : 'border-transparent text-gray-500 hover:text-gray-300'}`}>Sign Up</button>
      </div>

      <h2 className="text-3xl font-bold mb-2 text-white">{isLogin ? 'Welcome Back' : (selectedRole === 'customer' ? 'Create Account' : 'Restaurant Sign Up')}</h2>
      <p className="text-gray-400 mb-10">{isLogin ? 'Enter your email to sign in' : 'Enter your details to continue'}</p>
      
      <div className="space-y-5">
        {!isLogin && (
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">{selectedRole === 'customer' ? 'Full Name' : 'Restaurant Name'}</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-4 py-4 text-white focus:outline-none focus:border-brand transition-all shadow-inner focus:shadow-[0_0_20px_rgba(255,193,7,0.1)]" placeholder={selectedRole === 'customer' ? 'John Doe' : 'My Awesome Cafe'} />
          </div>
        )}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-4 py-4 text-white focus:outline-none focus:border-brand transition-all shadow-inner focus:shadow-[0_0_20px_rgba(255,193,7,0.1)]" placeholder="hello@example.com" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Password</label>
          <input type="password" placeholder="••••••••" className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-4 py-4 text-white focus:outline-none focus:border-brand transition-all shadow-inner focus:shadow-[0_0_20px_rgba(255,193,7,0.1)]" />
        </div>
      </div>
      <div className="mt-auto pt-10">
        <button onClick={handleAuth} disabled={!email || (!isLogin && !name)} className="w-full bg-brand text-black font-bold py-4 rounded-2xl disabled:opacity-50 transition-all shadow-[0_0_20px_rgba(255,193,7,0.2)]">{isLogin ? 'Sign In' : 'Continue'}</button>
      </div>
    </motion.div>
  );
};
