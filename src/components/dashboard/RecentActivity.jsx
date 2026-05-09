import React from 'react';
import { RECENT_ACTIVITY } from '../../data/mockData';
import { User, Calendar, MessageSquare, CheckCircle2 } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

const RecentActivity = () => {
  const { showToast } = useToast();
  const getIcon = (type) => {
    switch (type) {
      case 'conversion': return <CheckCircle2 className="text-emerald-500" size={18} />;
      case 'schedule': return <Calendar className="text-blue-500" size={18} />;
      case 'message': return <MessageSquare className="text-purple-500" size={18} />;
      default: return <User className="text-slate-500" size={18} />;
    }
  };

  return (
    <div className="card-gradient p-6 rounded-2xl h-full">
      <h3 className="text-lg font-bold mb-6 text-slate-800 dark:text-white">Recent Activity</h3>
      <div className="space-y-6">
        {RECENT_ACTIVITY.map((activity) => (
          <div key={activity.id} className="flex gap-4">
            <div className="mt-1 p-2 rounded-full bg-slate-100 dark:bg-slate-800 flex-shrink-0">
              {getIcon(activity.type)}
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                {activity.user}
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {activity.action}
              </p>
              <p className="text-xs text-slate-400 mt-1">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
      <button 
        onClick={() => showToast('Loading full activity history...', 'info')}
        className="w-full mt-6 py-2 text-sm font-medium text-primary-600 hover:text-primary-700 hover:bg-primary-50 dark:hover:bg-primary-900/10 rounded-lg transition-colors"
      >
        View All Activity
      </button>
    </div>
  );
};

export default RecentActivity;
