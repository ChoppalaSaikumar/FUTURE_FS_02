import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, Edit2, Trash2, Send } from 'lucide-react';
import LeadStatusBadge from '../leads/LeadStatusBadge';

const LeadDetailsModal = ({ isOpen, onClose, lead, onUpdateStatus }) => {
  if (!lead) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60]"
          />
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-xl bg-white dark:bg-slate-900 shadow-2xl z-[70] overflow-hidden flex flex-col"
          >
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/50">
              <div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-white">{lead.name}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">{lead.company}</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors text-slate-600 dark:text-slate-400">
                  <Edit2 size={18} />
                </button>
                <button className="p-2 hover:bg-rose-100 dark:hover:bg-rose-900/30 rounded-full transition-colors text-rose-500">
                  <Trash2 size={18} />
                </button>
                <div className="w-px h-6 bg-slate-300 dark:bg-slate-700 mx-2"></div>
                <button onClick={onClose} className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors">
                  <X size={20} className="text-slate-500" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              {/* Quick Info */}
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1">
                  <p className="text-xs font-bold text-slate-400 uppercase">Status</p>
                  <div className="flex items-center gap-2">
                    <LeadStatusBadge status={lead.status} />
                    <select 
                      value={lead.status}
                      onChange={(e) => onUpdateStatus(lead.id, e.target.value)}
                      className="text-xs bg-transparent border-none outline-none text-primary-600 font-medium cursor-pointer"
                    >
                      <option value="New">Change to New</option>
                      <option value="Contacted">Change to Contacted</option>
                      <option value="Converted">Change to Converted</option>
                      <option value="Lost">Change to Lost</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-bold text-slate-400 uppercase">Priority</p>
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">{lead.priority || 'Medium'}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-bold text-slate-400 uppercase">Email</p>
                  <p className="text-sm text-slate-700 dark:text-slate-200">{lead.email}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-bold text-slate-400 uppercase">Phone</p>
                  <p className="text-sm text-slate-700 dark:text-slate-200">{lead.phone}</p>
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-slate-800 dark:text-white flex items-center gap-2">
                  <Calendar size={16} /> Lead Notes
                </h4>
                <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {lead.notes || 'No notes available for this lead.'}
                  </p>
                </div>
              </div>

              {/* Activity Timeline */}
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-slate-800 dark:text-white flex items-center gap-2">
                  <Clock size={16} /> Activity History
                </h4>
                <div className="relative space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
                  {lead.history?.map((item, idx) => (
                    <div key={idx} className="relative pl-8">
                      <div className="absolute left-0 top-1 w-5 h-5 rounded-full bg-white dark:bg-slate-900 border-2 border-primary-500 z-10"></div>
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{item.activity}</p>
                      <p className="text-xs text-slate-400">{item.date}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-slate-100 dark:border-slate-800">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Add a note or comment..." 
                  className="input-field pr-12"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default LeadDetailsModal;
