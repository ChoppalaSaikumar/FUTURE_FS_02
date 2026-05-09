import React, { useState } from 'react';
import { motion } from 'framer-motion';
import StatsCard from '../components/dashboard/StatsCard';
import AnalyticsCharts from '../components/dashboard/AnalyticsCharts';
import RecentActivity from '../components/dashboard/RecentActivity';
import AddLeadModal from '../components/modals/AddLeadModal';
import { DASHBOARD_STATS } from '../data/mockData';
import { Calendar, BellRing, ArrowRight, Plus, RotateCw } from 'lucide-react';
import { useToast } from '../context/ToastContext';

const Dashboard = () => {
  const { showToast } = useToast();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Dashboard Overview</h1>
          <p className="text-slate-500 dark:text-slate-400">Welcome back! Here's what's happening today.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => showToast('Syncing latest data...', 'success')}
            className="p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            title="Refresh Data"
          >
            <RotateCw size={18} />
          </button>
          <button 
            onClick={() => showToast('Date filtering is currently in demo mode.', 'info')}
            className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
          >
            <Calendar size={18} />
            <span>Last 30 Days</span>
          </button>
          <button 
            onClick={() => showToast('Generating report... Check your downloads folder.', 'success')}
            className="btn-primary"
          >
            <span>Download Report</span>
          </button>
        </div>
      </div>

      <div className="h-4"></div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {DASHBOARD_STATS.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          <AnalyticsCharts />
          
          {/* Reminders/Tasks */}
          <div className="card-gradient p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
                <BellRing size={20} className="text-primary-500" />
                Upcoming Follow-ups
              </h3>
              <button 
                onClick={() => showToast('Redirecting to full calendar...', 'info')}
                className="text-sm font-medium text-primary-600 hover:underline flex items-center gap-1"
              >
                View Calendar <ArrowRight size={14} />
              </button>
            </div>
            <div className="space-y-4">
              {[
                { name: 'Alex Thompson', time: 'Today, 2:00 PM', task: 'Product Demo' },
                { name: 'Sarah Jenkins', time: 'Tomorrow, 10:30 AM', task: 'Contract Review' },
              ].map((reminder, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 font-bold">
                      {reminder.name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">{reminder.name}</p>
                      <p className="text-xs text-slate-500">{reminder.task}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-slate-400 uppercase">Scheduled</p>
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-300">{reminder.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="h-full">
          <RecentActivity />
        </div>
      </div>



      <AddLeadModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        onAdd={(newLead) => {
          showToast(`Lead for ${newLead.name} created successfully!`, 'success');
          setIsAddModalOpen(false);
        }} 
      />
    </div>
  );
};

export default Dashboard;
