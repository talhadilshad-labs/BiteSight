import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Store, User, ChevronRight, ArrowLeft, Eye, EyeOff, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { Role, UserProfile } from '../types';
import { Logo } from './Shared';

export const OnboardingScreen: React.FC<{ onLogin: (user: UserProfile) => void }> = ({ onLogin }) => {
  const [step, setStep] = useState<'splash' | 'role' | 'auth'>('splash');
  const [selectedRole, setSelectedRole] = useState<Role>(null);
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
  }>({});

  const [touched, setTouched] = useState<{
    name?: boolean;
    email?: boolean;
    password?: boolean;
  }>({});

  const validateEmail = (val: string) => {
    if (!val) return 'Email is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(val)) return 'Please enter a valid email format';
    if (!val.toLowerCase().endsWith('@gmail.com')) return 'Only @gmail.com emails are allowed';
    return '';
  };

  const validatePassword = (val: string) => {
    if (!val) return 'Password is required';
    if (val.length < 8) return 'Minimum 8 characters required';
    if (!/[A-Z]/.test(val)) return 'Must include at least one uppercase letter';
    if (!/[0-9]/.test(val)) return 'Must include at least one number';
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(val)) return 'Must include at least one special character';
    return '';
  };

  const validateName = (val: string) => {
    if (!isLogin && !val) return selectedRole === 'customer' ? 'Full name is required' : 'Restaurant name is required';
    return '';
  };

  useEffect(() => {
    const newErrors: typeof errors = {};
    if (touched.email) newErrors.email = validateEmail(email);
    if (touched.password) newErrors.password = validatePassword(password);
    if (touched.name && !isLogin) newErrors.name = validateName(name);
    setErrors(newErrors);
  }, [email, password, name, touched, isLogin]);

  const isFormValid = () => {
    const emailErr = validateEmail(email);
    const passwordErr = validatePassword(password);
    const nameErr = isLogin ? '' : validateName(name);
    return !emailErr && !passwordErr && !nameErr;
  };

  const handleAuth = async () => {
    if (!isFormValid()) {
      setTouched({ email: true, password: true, name: true });
      return;
    }

    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (!isLogin) {
      setSuccessMessage('Account created successfully');
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    onLogin({
      name: isLogin ? (email.split('@')[0] || 'User') : name,
      email,
      role: selectedRole,
      restaurantId: selectedRole === 'restaurant' ? 'r1' : undefined // Mocking r1 for demo
    });
    setIsLoading(false);
  };

  if (step === 'splash') {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center min-h-screen p-6 text-center bg-black relative overflow-hidden">
        {/* Futuristic Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Animated Grid */}
          <div 
            className="absolute inset-0 opacity-[0.03]" 
            style={{ 
              backgroundImage: 'linear-gradient(to right, #FFC107 1px, transparent 1px), linear-gradient(to bottom, #FFC107 1px, transparent 1px)',
              backgroundSize: '40px 40px',
              maskImage: 'radial-gradient(circle at center, black, transparent 80%)'
            }}
          />
          
          {/* Floating Particles */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-brand/30 rounded-full"
              initial={{ 
                x: Math.random() * 100 + '%', 
                y: Math.random() * 100 + '%',
                opacity: Math.random() * 0.5 + 0.2
              }}
              animate={{ 
                y: [null, Math.random() * -100 - 50 + 'px'],
                opacity: [null, 0]
              }}
              transition={{ 
                duration: Math.random() * 10 + 10, 
                repeat: Infinity, 
                ease: "linear",
                delay: Math.random() * 10
              }}
            />
          ))}

          {/* Glowing Orbs */}
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
              x: [0, 50, 0],
              y: [0, -30, 0]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-brand/20 blur-[120px] rounded-full" 
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.05, 0.15, 0.05],
              x: [0, -40, 0],
              y: [0, 40, 0]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-brand/10 blur-[100px] rounded-full" 
          />

          {/* Scanning Line */}
          <motion.div
            animate={{ y: ['-100%', '200%'] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-brand/20 to-transparent opacity-50"
          />
        </div>

        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.1 }} className="w-24 h-24 bg-zinc-900 border border-zinc-800 rounded-3xl flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(255,193,7,0.15)] relative z-10">
          <Logo className="w-16 h-16" />
        </motion.div>
        <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="text-5xl font-bold tracking-tight mb-4 text-white relative z-10">Bite<span className="text-brand">Sight</span></motion.h1>
        <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="text-gray-400 text-xl mb-12 font-light tracking-wide relative z-10">See It Before You Eat It</motion.p>
        <motion.button initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }} onClick={() => setStep('role')} className="w-full max-w-sm bg-brand text-black font-bold py-4 rounded-2xl flex items-center justify-center gap-2 text-lg shadow-[0_0_20px_rgba(255,193,7,0.2)] hover:bg-brand/90 transition-colors relative z-10">
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
          <button onClick={() => { setSelectedRole('customer'); setStep('auth'); setIsLogin(true); }} className="w-full bg-zinc-900/50 border border-zinc-800 p-6 rounded-3xl flex items-center gap-6 hover:border-brand hover:bg-brand/5 transition-all text-left group">
            <div className="w-14 h-14 bg-zinc-800 rounded-2xl flex items-center justify-center text-gray-400 group-hover:bg-brand group-hover:text-black transition-colors"><User className="w-7 h-7" /></div>
            <div><h3 className="font-bold text-xl text-white mb-1">Food Lover</h3><p className="text-sm text-gray-400">Browse AR menus and order</p></div>
          </button>
          <button onClick={() => { setSelectedRole('restaurant'); setStep('auth'); setIsLogin(true); }} className="w-full bg-zinc-900/50 border border-zinc-800 p-6 rounded-3xl flex items-center gap-6 hover:border-brand hover:bg-brand/5 transition-all text-left group">
            <div className="w-14 h-14 bg-zinc-800 rounded-2xl flex items-center justify-center text-gray-400 group-hover:bg-brand group-hover:text-black transition-colors"><Store className="w-7 h-7" /></div>
            <div><h3 className="font-bold text-xl text-white mb-1">Restaurant Owner</h3><p className="text-sm text-gray-400">Manage menu and view analytics</p></div>
          </button>
        </div>
      </motion.div>
    );
  }

  const getInputClass = (fieldName: 'name' | 'email' | 'password') => {
    const base = "w-full bg-zinc-900 border rounded-2xl px-4 py-4 text-white focus:outline-none transition-all shadow-inner";
    if (!touched[fieldName]) return `${base} border-zinc-800 focus:border-brand focus:shadow-[0_0_20px_rgba(255,193,7,0.1)]`;
    if (errors[fieldName]) return `${base} border-red-500/50 focus:border-red-500 bg-red-500/5 shadow-[0_0_20px_rgba(239,68,68,0.1)]`;
    return `${base} border-green-500/50 focus:border-green-500 bg-green-500/5 shadow-[0_0_20px_rgba(34,197,94,0.1)]`;
  };

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col min-h-screen p-6 bg-black">
      <button onClick={() => setStep('role')} className="w-10 h-10 bg-zinc-900 rounded-full flex items-center justify-center mb-8 text-gray-400 hover:text-white transition-colors"><ArrowLeft className="w-5 h-5" /></button>
      
      {selectedRole === 'customer' ? (
        <div className="flex gap-4 mb-8 border-b border-zinc-800 pb-2">
          <button onClick={() => { setIsLogin(true); setTouched({}); setErrors({}); }} className={`text-lg font-bold pb-2 border-b-2 transition-colors ${isLogin ? 'border-brand text-white' : 'border-transparent text-gray-500 hover:text-gray-300'}`}>Sign In</button>
          <button onClick={() => { setIsLogin(false); setTouched({}); setErrors({}); }} className={`text-lg font-bold pb-2 border-b-2 transition-colors ${!isLogin ? 'border-brand text-white' : 'border-transparent text-gray-500 hover:text-gray-300'}`}>Sign Up</button>
        </div>
      ) : (
        <div className="mb-8 border-b border-zinc-800 pb-4">
          <h2 className="text-lg font-bold text-brand uppercase tracking-widest">Partner Portal</h2>
        </div>
      )}

      <h2 className="text-3xl font-bold mb-2 text-white">
        {isLogin ? 'Welcome Back' : (selectedRole === 'customer' ? 'Create Account' : 'Restaurant Sign Up')}
      </h2>
      
      <p className="text-gray-400 mb-6">
        {isLogin ? 'Enter your email to sign in' : 'Enter your details to continue'}
      </p>

      {selectedRole === 'restaurant' && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-brand/5 border border-brand/20 p-4 rounded-2xl mb-8"
        >
          <p className="text-sm text-gray-300 leading-relaxed">
            Restaurant accounts are created by <span className="text-brand font-medium">BiteSight</span> after partnership onboarding. Please use the credentials provided by BiteSight to sign in.
          </p>
          <button className="mt-4 text-brand text-sm font-bold flex items-center gap-2 hover:underline">
            Contact BiteSight Support <ChevronRight className="w-4 h-4" />
          </button>
        </motion.div>
      )}
      
      <div className="space-y-5">
        <AnimatePresence mode="wait">
          {successMessage && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-green-500/10 border border-green-500/20 p-4 rounded-2xl flex items-center gap-3 text-green-500 mb-4">
              <CheckCircle2 className="w-5 h-5" />
              <span className="font-medium">{successMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {!isLogin && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
            <label className="block text-sm font-medium text-gray-400 mb-2">{selectedRole === 'customer' ? 'Full Name' : 'Restaurant Name'}</label>
            <input 
              type="text" 
              value={name} 
              onChange={e => setName(e.target.value)} 
              onBlur={() => setTouched(prev => ({ ...prev, name: true }))}
              className={getInputClass('name')} 
              placeholder={selectedRole === 'customer' ? 'John Doe' : 'My Awesome Cafe'} 
            />
            <AnimatePresence>
              {touched.name && errors.name && (
                <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="text-red-500 text-xs mt-2 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.name}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        )}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
          <input 
            type="email" 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            onBlur={() => setTouched(prev => ({ ...prev, email: true }))}
            className={getInputClass('email')} 
            placeholder="yourname@gmail.com" 
          />
          <AnimatePresence>
            {touched.email && errors.email && (
              <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="text-red-500 text-xs mt-2 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.email}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-400">Password</label>
            {isLogin && (
              <button className="text-brand text-xs font-medium hover:underline">Forgot Password?</button>
            )}
          </div>
          <div className="relative">
            <input 
              type={showPassword ? "text" : "password"} 
              value={password}
              onChange={e => setPassword(e.target.value)}
              onBlur={() => setTouched(prev => ({ ...prev, password: true }))}
              placeholder="••••••••" 
              className={getInputClass('password')} 
            />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          <AnimatePresence>
            {touched.password && errors.password && (
              <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="text-red-500 text-xs mt-2 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.password}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
      <div className="mt-auto pt-10">
        <motion.button 
          whileTap={{ scale: 0.98 }}
          onClick={handleAuth} 
          disabled={!isFormValid() || isLoading} 
          className="w-full bg-brand text-black font-bold py-4 rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-[0_0_20px_rgba(255,193,7,0.2)] flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            isLogin ? 'Sign In' : 'Create Account'
          )}
        </motion.button>
      </div>
    </motion.div>
  );
};
