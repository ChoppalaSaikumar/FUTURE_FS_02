import React from 'react';

const LeadStatusBadge = ({ status }) => {
  const styles = {
    New: 'bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800/50',
    Contacted: 'bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800/50',
    Converted: 'bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800/50',
    Lost: 'bg-rose-50 text-rose-700 border-rose-100 dark:bg-rose-900/20 dark:text-rose-400 dark:border-rose-800/50',
  };

  const dotColors = {
    New: 'bg-blue-500',
    Contacted: 'bg-amber-500',
    Converted: 'bg-emerald-500',
    Lost: 'bg-rose-500',
  };

  return (
    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border flex items-center w-fit gap-1.5 ${styles[status] || 'bg-slate-100 text-slate-700'}`}>
      <span className={`w-1.5 h-1.5 rounded-full animate-pulse-subtle ${dotColors[status] || 'bg-slate-400'}`}></span>
      {status}
    </span>
  );
};

export default LeadStatusBadge;
