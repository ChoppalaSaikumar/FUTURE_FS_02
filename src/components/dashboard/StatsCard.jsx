import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

const StatsCard = ({ label, value, change, trend }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="card-gradient p-6 rounded-2xl flex flex-col gap-2"
    >
      <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">{label}</p>
      <div className="flex items-end justify-between">
        <h3 className="text-3xl font-bold text-slate-800 dark:text-white">{value}</h3>
        <div className={`flex items-center gap-1 text-sm font-semibold ${trend === 'up' ? 'text-emerald-500' : 'text-rose-500'}`}>
          {trend === 'up' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
          <span>{change}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default StatsCard;
