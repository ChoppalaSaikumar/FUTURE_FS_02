import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Mail, Globe, Phone, Building2 } from 'lucide-react';

const AddLeadModal = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    source: 'Website Form',
    status: 'New'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({
      ...formData,
      id: Date.now(),
      assignedDate: new Date().toISOString().split('T')[0]
    });
    setFormData({ name: '', email: '', company: '', phone: '', source: 'Website Form', status: 'New' });
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
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl z-[90] overflow-hidden border border-white/20"
          >
            <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex items-center justify-center relative bg-slate-50/50 dark:bg-slate-800/30">
              <h3 className="text-3xl font-extrabold font-outfit bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
                Create New Lead
              </h3>
              <button onClick={onClose} className="absolute right-8 p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                <X size={24} className="text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-10 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Full Name */}
                <div className="space-y-3 text-center">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-[0.25em] block">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="input-field text-center"
                    placeholder="John Doe"
                  />
                </div>

                {/* Email */}
                <div className="space-y-3 text-center">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-[0.25em] block">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="input-field text-center"
                    placeholder="john@example.com"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-3 text-center">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-[0.25em] block">Phone Number</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="input-field text-center"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>

                {/* Company */}
                <div className="space-y-3 text-center">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-[0.25em] block">Company</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="input-field text-center"
                    placeholder="Acme Inc."
                  />
                </div>
              </div>

              {/* Lead Source - Centered */}
              <div className="space-y-4 text-center">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-[0.25em] block">Lead Source</label>
                <div className="relative max-w-xs mx-auto">
                  <select 
                    value={formData.source}
                    onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                    className="input-field text-center appearance-none cursor-pointer border-primary-200 dark:border-primary-800 hover:border-primary-500 transition-colors"
                  >
                    <option>Website Form</option>
                    <option>LinkedIn</option>
                    <option>Referral</option>
                    <option>Direct</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-8 pt-6">
                <button 
                  type="button" 
                  onClick={onClose}
                  className="flex-1 py-5 rounded-[2rem] font-bold text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all border border-slate-200 dark:border-slate-700 active:scale-95"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="flex-[2] bg-primary-600 hover:bg-primary-700 text-white py-5 rounded-[2rem] font-bold text-2xl shadow-2xl shadow-primary-500/40 transition-all active:scale-95"
                >
                  Create Lead
                </button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AddLeadModal;
