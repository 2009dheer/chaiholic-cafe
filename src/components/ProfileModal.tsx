import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Crown, Coins, ShoppingBag, History, Gift, ChevronRight, LogOut, X } from 'lucide-react';

interface ProfileModalProps {
  user: any;
  isOpen: boolean;
  onClose: () => void;
  onSignOut: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ user, isOpen, onClose, onSignOut }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-dark-blue/70 backdrop-blur-md"
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="w-full max-w-md bg-dark-blue/90 backdrop-blur-2xl border border-white/15 rounded-[2.5rem] shadow-2xl overflow-hidden pointer-events-auto"
            >
              {/* Header */}
              <div className="flex justify-between items-center p-6 border-b border-white/10">
                <h2 className="text-xl font-serif font-bold text-white">Loyalty Portal</h2>
                <button 
                  onClick={onClose}
                  className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors text-white/70 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Bio Panel */}
              <div className="p-8 flex flex-col items-center border-b border-white/10">
                <div className="w-24 h-24 rounded-full border-2 border-gold-accent bg-white/10 flex items-center justify-center mb-4 overflow-hidden relative">
                  {user?.photoURL ? (
                    <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-3xl font-serif text-white">{user?.displayName?.charAt(0) || 'C'}</span>
                  )}
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">{user?.displayName || 'Chai Lover'}</h3>
                <p className="text-white/50 text-sm mb-4">{user?.email}</p>
                <div className="inline-flex items-center space-x-2 bg-gold-accent/20 border border-gold-accent/30 px-4 py-1.5 rounded-full">
                  <Crown className="w-4 h-4 text-gold-accent" />
                  <span className="text-gold-accent text-sm font-semibold animate-pulse">Gold Loyalty Tier</span>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-px bg-white/10">
                <div className="bg-dark-blue/90 p-6 flex flex-col items-center text-center">
                  <Coins className="w-8 h-8 text-gold-accent mb-2" />
                  <span className="text-3xl font-display font-bold text-white mb-1">450</span>
                  <span className="text-white/60 text-xs uppercase tracking-wider">Chai Coins</span>
                </div>
                <div className="bg-dark-blue/90 p-6 flex flex-col items-center text-center">
                  <ShoppingBag className="w-8 h-8 text-primary-blue mb-2" />
                  <span className="text-3xl font-display font-bold text-white mb-1">12</span>
                  <span className="text-white/60 text-xs uppercase tracking-wider">Total Orders</span>
                </div>
              </div>

              {/* Actions */}
              <div className="p-4 space-y-2">
                <button className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-white/5 transition-colors group">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-white/10 rounded-xl group-hover:bg-primary-blue/20 transition-colors">
                      <History className="w-5 h-5 text-white/70 group-hover:text-white" />
                    </div>
                    <span className="text-white font-medium">Order History Logs</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-white/30 group-hover:text-white/70 transition-colors" />
                </button>
                
                <button className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-white/5 transition-colors group">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-white/10 rounded-xl group-hover:bg-gold-accent/20 transition-colors">
                      <Gift className="w-5 h-5 text-white/70 group-hover:text-gold-accent" />
                    </div>
                    <span className="text-white font-medium">Redeem Chai Coin Rewards</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-white/30 group-hover:text-white/70 transition-colors" />
                </button>
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-white/10">
                <button 
                  onClick={() => {
                    onSignOut();
                    onClose();
                  }}
                  className="w-full flex items-center justify-center space-x-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 font-semibold py-3.5 rounded-xl transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProfileModal;
