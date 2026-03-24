import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Mail, Settings, CreditCard, Bell, LogOut, ChevronRight, ArrowLeft, MapPin, Phone, Plus, Check } from 'lucide-react';
import { UserProfile } from '../types';

type ProfileSection = 'main' | 'personal' | 'payment' | 'notifications' | 'settings';

export const ProfileScreen: React.FC<{ user: UserProfile, onLogout: () => void }> = ({ user, onLogout }) => {
  const [activeSection, setActiveSection] = useState<ProfileSection>('main');
  const [saved, setSaved] = useState(false);

  // Mock state for forms
  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState('+92 300 1234567');
  const [address, setAddress] = useState('House 12, Street 4, F-7/3, Islamabad');

  const [notifOrder, setNotifOrder] = useState(true);
  const [notifPromo, setNotifPromo] = useState(false);
  const [notifEmail, setNotifEmail] = useState(true);

  const [settingAR, setSettingAR] = useState(true);
  const [settingLocation, setSettingLocation] = useState(true);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const renderMain = () => (
    <motion.div key="main" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
      <h2 className="text-3xl font-bold text-white">Profile</h2>
      
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6 flex items-center gap-6">
        <div className="w-20 h-20 bg-brand rounded-full flex items-center justify-center text-black shadow-[0_0_20px_rgba(255,193,7,0.3)]">
          <User className="w-10 h-10" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-white mb-1">{name}</h3>
          <p className="text-gray-400 flex items-center gap-2 text-sm"><Mail className="w-4 h-4" /> {user.email}</p>
          <p className="text-gray-400 flex items-center gap-2 text-sm mt-1"><Phone className="w-4 h-4" /> {phone}</p>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-lg font-bold text-white mb-4">Account Settings</h4>
        
        <button onClick={() => setActiveSection('personal')} className="w-full bg-zinc-900/50 border border-zinc-800 p-4 rounded-2xl flex items-center justify-between hover:border-brand/50 transition-colors group">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-zinc-800 rounded-xl flex items-center justify-center text-gray-400 group-hover:text-brand transition-colors"><User className="w-5 h-5" /></div>
            <span className="font-medium text-white">Personal Information</span>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-brand transition-colors" />
        </button>

        <button onClick={() => setActiveSection('payment')} className="w-full bg-zinc-900/50 border border-zinc-800 p-4 rounded-2xl flex items-center justify-between hover:border-brand/50 transition-colors group">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-zinc-800 rounded-xl flex items-center justify-center text-gray-400 group-hover:text-brand transition-colors"><CreditCard className="w-5 h-5" /></div>
            <span className="font-medium text-white">Payment Methods</span>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-brand transition-colors" />
        </button>

        <button onClick={() => setActiveSection('notifications')} className="w-full bg-zinc-900/50 border border-zinc-800 p-4 rounded-2xl flex items-center justify-between hover:border-brand/50 transition-colors group">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-zinc-800 rounded-xl flex items-center justify-center text-gray-400 group-hover:text-brand transition-colors"><Bell className="w-5 h-5" /></div>
            <span className="font-medium text-white">Notifications</span>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-brand transition-colors" />
        </button>

        <button onClick={() => setActiveSection('settings')} className="w-full bg-zinc-900/50 border border-zinc-800 p-4 rounded-2xl flex items-center justify-between hover:border-brand/50 transition-colors group">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-zinc-800 rounded-xl flex items-center justify-center text-gray-400 group-hover:text-brand transition-colors"><Settings className="w-5 h-5" /></div>
            <span className="font-medium text-white">App Settings</span>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-brand transition-colors" />
        </button>
      </div>

      <button onClick={onLogout} className="w-full bg-red-500/10 border border-red-500/20 text-red-500 font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-red-500/20 transition-colors mt-8">
        <LogOut className="w-5 h-5" /> Log Out
      </button>
    </motion.div>
  );

  const renderPersonal = () => (
    <motion.div key="personal" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-6">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => setActiveSection('main')} className="w-10 h-10 bg-zinc-900 border border-zinc-800 rounded-full flex items-center justify-center text-white hover:bg-zinc-800 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="text-2xl font-bold text-white">Personal Info</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Full Name</label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl pl-12 pr-4 py-4 text-white focus:outline-none focus:border-brand transition-colors" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input type="email" value={user.email} disabled className="w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl pl-12 pr-4 py-4 text-gray-500 cursor-not-allowed" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Phone Number</label>
          <div className="relative">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl pl-12 pr-4 py-4 text-white focus:outline-none focus:border-brand transition-colors" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Delivery Address</label>
          <div className="relative">
            <MapPin className="absolute left-4 top-4 w-5 h-5 text-gray-500" />
            <textarea value={address} onChange={e => setAddress(e.target.value)} rows={3} className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl pl-12 pr-4 py-4 text-white focus:outline-none focus:border-brand transition-colors resize-none" />
          </div>
        </div>
      </div>

      <button onClick={handleSave} className="w-full bg-brand text-black font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-brand/90 transition-colors mt-8 shadow-[0_0_20px_rgba(255,193,7,0.3)]">
        {saved ? <><Check className="w-5 h-5" /> Saved Successfully</> : 'Save Changes'}
      </button>
    </motion.div>
  );

  const renderPayment = () => (
    <motion.div key="payment" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-6">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => setActiveSection('main')} className="w-10 h-10 bg-zinc-900 border border-zinc-800 rounded-full flex items-center justify-center text-white hover:bg-zinc-800 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="text-2xl font-bold text-white">Payment Methods</h2>
      </div>

      <div className="space-y-4">
        <div className="bg-zinc-900 border border-brand rounded-2xl p-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand/10 blur-2xl rounded-full" />
          <div className="relative z-10">
            <div className="flex justify-between items-center mb-6">
              <div className="text-white font-bold text-lg tracking-widest">VISA</div>
              <div className="bg-brand/20 text-brand text-xs font-bold px-2 py-1 rounded">Default</div>
            </div>
            <div className="text-gray-300 font-mono text-lg tracking-widest mb-2">**** **** **** 4242</div>
            <div className="flex justify-between text-sm text-gray-500">
              <span>{name}</span>
              <span>12/28</span>
            </div>
          </div>
        </div>

        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-5">
          <div className="flex justify-between items-center mb-6">
            <div className="text-white font-bold text-lg tracking-widest">MasterCard</div>
          </div>
          <div className="text-gray-400 font-mono text-lg tracking-widest mb-2">**** **** **** 8891</div>
          <div className="flex justify-between text-sm text-gray-500">
            <span>{name}</span>
            <span>08/26</span>
          </div>
        </div>
      </div>

      <button className="w-full bg-zinc-900 border border-dashed border-zinc-700 text-brand font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:border-brand hover:bg-brand/5 transition-colors mt-6">
        <Plus className="w-5 h-5" /> Add New Card
      </button>
    </motion.div>
  );

  const renderNotifications = () => (
    <motion.div key="notifications" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-6">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => setActiveSection('main')} className="w-10 h-10 bg-zinc-900 border border-zinc-800 rounded-full flex items-center justify-center text-white hover:bg-zinc-800 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="text-2xl font-bold text-white">Notifications</h2>
      </div>

      <div className="space-y-4">
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-5 flex items-center justify-between">
          <div>
            <h4 className="text-white font-bold mb-1">Order Updates</h4>
            <p className="text-sm text-gray-400">Get real-time updates on your order status.</p>
          </div>
          <button 
            onClick={() => setNotifOrder(!notifOrder)}
            className={`w-12 h-6 rounded-full transition-colors relative ${notifOrder ? 'bg-brand' : 'bg-zinc-700'}`}
          >
            <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all ${notifOrder ? 'left-7' : 'left-1'}`} />
          </button>
        </div>

        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-5 flex items-center justify-between">
          <div>
            <h4 className="text-white font-bold mb-1">Promotional Offers</h4>
            <p className="text-sm text-gray-400">Receive coupons, discounts, and special offers.</p>
          </div>
          <button 
            onClick={() => setNotifPromo(!notifPromo)}
            className={`w-12 h-6 rounded-full transition-colors relative ${notifPromo ? 'bg-brand' : 'bg-zinc-700'}`}
          >
            <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all ${notifPromo ? 'left-7' : 'left-1'}`} />
          </button>
        </div>

        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-5 flex items-center justify-between">
          <div>
            <h4 className="text-white font-bold mb-1">Email Newsletter</h4>
            <p className="text-sm text-gray-400">Weekly updates on new restaurants and features.</p>
          </div>
          <button 
            onClick={() => setNotifEmail(!notifEmail)}
            className={`w-12 h-6 rounded-full transition-colors relative ${notifEmail ? 'bg-brand' : 'bg-zinc-700'}`}
          >
            <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all ${notifEmail ? 'left-7' : 'left-1'}`} />
          </button>
        </div>
      </div>
    </motion.div>
  );

  const renderSettings = () => (
    <motion.div key="settings" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-6">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => setActiveSection('main')} className="w-10 h-10 bg-zinc-900 border border-zinc-800 rounded-full flex items-center justify-center text-white hover:bg-zinc-800 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="text-2xl font-bold text-white">App Settings</h2>
      </div>

      <div className="space-y-4">
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-5 flex items-center justify-between">
          <div>
            <h4 className="text-white font-bold mb-1">High Quality AR</h4>
            <p className="text-sm text-gray-400">Use high-resolution 3D models for AR view.</p>
          </div>
          <button 
            onClick={() => setSettingAR(!settingAR)}
            className={`w-12 h-6 rounded-full transition-colors relative ${settingAR ? 'bg-brand' : 'bg-zinc-700'}`}
          >
            <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all ${settingAR ? 'left-7' : 'left-1'}`} />
          </button>
        </div>

        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-5 flex items-center justify-between">
          <div>
            <h4 className="text-white font-bold mb-1">Location Services</h4>
            <p className="text-sm text-gray-400">Allow app to use your location for delivery.</p>
          </div>
          <button 
            onClick={() => setSettingLocation(!settingLocation)}
            className={`w-12 h-6 rounded-full transition-colors relative ${settingLocation ? 'bg-brand' : 'bg-zinc-700'}`}
          >
            <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all ${settingLocation ? 'left-7' : 'left-1'}`} />
          </button>
        </div>

        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-5 flex items-center justify-between">
          <div>
            <h4 className="text-white font-bold mb-1">Language</h4>
            <p className="text-sm text-gray-400">English (US)</p>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-500" />
        </div>
        
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-5 flex items-center justify-between">
          <div>
            <h4 className="text-white font-bold mb-1">App Version</h4>
            <p className="text-sm text-gray-400">v2.4.1 (Build 892)</p>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-black pb-32 px-4 pt-8 overflow-x-hidden">
      <AnimatePresence mode="wait">
        {activeSection === 'main' && renderMain()}
        {activeSection === 'personal' && renderPersonal()}
        {activeSection === 'payment' && renderPayment()}
        {activeSection === 'notifications' && renderNotifications()}
        {activeSection === 'settings' && renderSettings()}
      </AnimatePresence>
    </div>
  );
};
