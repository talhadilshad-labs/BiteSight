import React from 'react';
import { motion } from 'motion/react';
import { Receipt, Clock, MapPin, ChevronRight, CheckCircle, ChefHat, Bike } from 'lucide-react';

export const OrdersScreen: React.FC = () => {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="min-h-screen bg-black pb-24 px-4 pt-8">
      <h2 className="text-3xl font-bold mb-8 text-white">Your Orders</h2>
      
      <div className="space-y-6">
        {/* Active Order */}
        <div className="bg-brand/10 border border-brand/30 rounded-3xl p-5 hover:border-brand/50 transition-colors group cursor-pointer relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand/10 blur-2xl rounded-full" />
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-brand/20 rounded-xl flex items-center justify-center text-brand"><ChefHat className="w-6 h-6" /></div>
                <div>
                  <h3 className="font-bold text-lg text-white">Tuscany Courtyard</h3>
                  <p className="text-sm text-brand font-medium">Preparing your food...</p>
                </div>
              </div>
              <div className="bg-brand/20 text-brand px-3 py-1 rounded-lg text-xs font-bold border border-brand/20 animate-pulse">In Progress</div>
            </div>
            
            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex justify-between text-xs text-gray-400 mb-2 font-medium">
                <span className="text-brand">Accepted</span>
                <span className="text-brand">Preparing</span>
                <span>On the way</span>
                <span>Delivered</span>
              </div>
              <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden flex">
                <div className="h-full bg-brand w-1/2 rounded-full relative">
                  <div className="absolute inset-0 bg-white/20 animate-shimmer" />
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-brand/20">
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-brand" /> Est. 25 min</span>
                <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> F-7 Markaz</span>
              </div>
              <div className="font-bold text-white flex items-center gap-2">Rs 3,250 <ChevronRight className="w-4 h-4 text-brand group-hover:translate-x-1 transition-transform" /></div>
            </div>
          </div>
        </div>

        {/* Past Orders */}
        <h3 className="text-lg font-bold text-white mt-8 mb-4">Past Orders</h3>

        <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-5 hover:border-brand/50 transition-colors group cursor-pointer">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-zinc-800 rounded-xl flex items-center justify-center text-gray-400 group-hover:text-brand transition-colors"><Receipt className="w-6 h-6" /></div>
              <div>
                <h3 className="font-bold text-lg text-white">Burger Lab</h3>
                <p className="text-sm text-gray-400">Order #10294</p>
              </div>
            </div>
            <div className="bg-green-500/10 text-green-500 px-3 py-1 rounded-lg text-xs font-bold border border-green-500/20 flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Delivered</div>
          </div>
          <div className="flex justify-between items-center pt-4 border-t border-zinc-800">
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> 2 days ago</span>
              <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> Home</span>
            </div>
            <div className="font-bold text-white flex items-center gap-2">Rs 1,450 <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-brand transition-colors" /></div>
          </div>
        </div>

        <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-5 hover:border-brand/50 transition-colors group cursor-pointer">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-zinc-800 rounded-xl flex items-center justify-center text-gray-400 group-hover:text-brand transition-colors"><Receipt className="w-6 h-6" /></div>
              <div>
                <h3 className="font-bold text-lg text-white">Dominos</h3>
                <p className="text-sm text-gray-400">Order #09832</p>
              </div>
            </div>
            <div className="bg-green-500/10 text-green-500 px-3 py-1 rounded-lg text-xs font-bold border border-green-500/20 flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Delivered</div>
          </div>
          <div className="flex justify-between items-center pt-4 border-t border-zinc-800">
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> 1 week ago</span>
              <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> Office</span>
            </div>
            <div className="font-bold text-white flex items-center gap-2">Rs 2,100 <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-brand transition-colors" /></div>
          </div>
        </div>

        <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-5 hover:border-brand/50 transition-colors group cursor-pointer">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-zinc-800 rounded-xl flex items-center justify-center text-gray-400 group-hover:text-brand transition-colors"><Receipt className="w-6 h-6" /></div>
              <div>
                <h3 className="font-bold text-lg text-white">Chop Chop Wok</h3>
                <p className="text-sm text-gray-400">Order #08112</p>
              </div>
            </div>
            <div className="bg-green-500/10 text-green-500 px-3 py-1 rounded-lg text-xs font-bold border border-green-500/20 flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Delivered</div>
          </div>
          <div className="flex justify-between items-center pt-4 border-t border-zinc-800">
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> 2 weeks ago</span>
              <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> Home</span>
            </div>
            <div className="font-bold text-white flex items-center gap-2">Rs 4,800 <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-brand transition-colors" /></div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
