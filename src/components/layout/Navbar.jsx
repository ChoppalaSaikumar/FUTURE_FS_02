import React from 'react';
import { Bell, Search, Moon, Sun, User } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { user } = useAuth();
  const { showToast } = useToast();

  return (
    <header className="sticky top-0 z-40 h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="h-full px-6 flex items-center justify-between">
        <div className="flex-1 max-w-xl">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-500 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search leads, tasks, or analytics..." 
              className="w-full bg-slate-100 dark:bg-slate-800/50 border-none rounded-full py-2 pl-10 pr-4 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all duration-200 text-sm"
              onKeyDown={(e) => e.key === 'Enter' && showToast(`Searching for: ${e.target.value}`, 'info')}
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          <button 
            onClick={() => showToast('No new notifications', 'info')}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 relative"
          >
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
          </button>

          <div className="h-8 w-px bg-slate-200 dark:bg-slate-800 mx-2"></div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">{user?.name || 'Admin User'}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{user?.role || 'Administrator'}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400 border border-primary-200 dark:border-primary-800 font-bold overflow-hidden">
              {user?.photo ? (
                <img src={user.photo} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                user?.name?.charAt(0) || 'A'
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
