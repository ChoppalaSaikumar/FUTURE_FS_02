import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, MessageSquare, Bell } from 'lucide-react';

const FollowUpModal = ({ isOpen, onClose, leadName }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, we would save this to the database
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[80]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl z-[90] overflow-hidden border border-white/20"
          >
            <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex items-center justify-center relative bg-amber-50/50 dark:bg-amber-900/10">
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white font-outfit flex items-center gap-2">
                <Calendar className="text-amber-500" size={24} />
                Schedule Follow-up
              </h3>
              <button onClick={onClose} className="absolute right-6 p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                <X size={20} className="text-slate-500" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-10 space-y-6">
              <div className="text-center mb-4">
                <p className="text-sm text-slate-500">Scheduling a follow-up task for:</p>
                <p className="text-lg font-bold text-primary-600">{leadName}</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block ml-1">Follow-up Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input type="date" required className="input-field pl-12" defaultValue={new Date().toISOString().split('T')[0]} />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block ml-1">Time</label>
                  <div className="relative">
                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input type="time" required className="input-field pl-12" defaultValue="09:00" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block ml-1">Reminder Note</label>
                  <div className="relative">
                    <MessageSquare className="absolute left-4 top-3 text-slate-400" size={18} />
                    <textarea placeholder="e.g., Call to discuss the new proposal..." className="input-field pl-12 min-h-[100px] resize-none pt-2" />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
                <Bell size={18} className="text-primary-500" />
                <span className="text-xs text-slate-500">Enable browser notifications for this reminder</span>
                <input type="checkbox" className="ml-auto w-4 h-4 rounded accent-primary-600" />
              </div>

              <div className="pt-4 flex gap-4">
                <button 
                  type="button" 
                  onClick={onClose}
                  className="flex-1 py-4 rounded-2xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="flex-[2] bg-amber-500 hover:bg-amber-600 text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-amber-500/20 transition-all active:scale-95"
                >
                  Schedule
                </button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default FollowUpModal;
