import React from 'react';
import { User, Bell, Shield, Palette, Globe, Save } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';

const Settings = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { showToast } = useToast();
  const { user, updateProfile } = useAuth();
  const [activeSection, setActiveSection] = React.useState('Profile');
  const fileInputRef = React.useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 800 * 1024) {
        showToast('Image size exceeds 800KB', 'error');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        updateProfile({ photo: reader.result });
        showToast('Photo updated successfully!', 'success');
      };
      reader.readAsDataURL(file);
    }
  };

  const navItems = [
    { name: 'Profile', icon: User },
    { name: 'Notifications', icon: Bell },
    { name: 'Security', icon: Shield },
    { name: 'Appearance', icon: Palette },
    { name: 'Integrations', icon: Globe },
  ];

  return (
    <div className="max-w-4xl space-y-8 pb-20">
      <div>
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Settings</h1>
        <p className="text-slate-500 dark:text-slate-400">Manage your account preferences and application settings.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Navigation */}
        <div className="space-y-2">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => setActiveSection(item.name)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeSection === item.name 
                  ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/20' 
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <item.icon size={18} />
              {item.name}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="md:col-span-2 space-y-6">
          <div className="card-gradient p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-8">
            
            {activeSection === 'Profile' && (
              <section className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h3 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
                  <User className="text-primary-500" size={20} />
                  Profile Information
                </h3>
                
                <div className="flex items-center gap-8 p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800">
                  <div className="relative group">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white dark:border-slate-700 shadow-xl bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center">
                      {user?.photo ? (
                        <img src={user.photo} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-3xl font-bold text-primary-600 dark:text-primary-400">
                          {user?.name?.charAt(0) || 'A'}
                        </span>
                      )}
                    </div>
                    <button 
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute inset-0 bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-full text-xs font-bold"
                    >
                      Update
                    </button>
                  </div>
                  
                  <div>
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      onChange={handleImageChange} 
                      accept="image/*" 
                      className="hidden" 
                    />
                    <div className="flex flex-wrap items-center gap-4">
                      <button 
                        onClick={() => fileInputRef.current?.click()}
                        className="text-sm font-bold text-primary-600 hover:text-primary-700 flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-primary-50 transition-colors"
                      >
                        Change Photo
                      </button>
                      
                      {user?.photo && (
                        <button 
                          onClick={() => {
                            updateProfile({ photo: null });
                            showToast('Photo removed', 'info');
                          }}
                          className="text-sm font-bold text-rose-500 hover:text-rose-600 flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-rose-50 transition-colors"
                        >
                          Remove Photo
                        </button>
                      )}
                    </div>
                    
                    <p className="text-xs text-slate-500 mt-2 font-medium">
                      JPG, GIF or PNG. <span className="text-primary-500">Max size of 800KB</span>
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-600 dark:text-slate-400">First Name</label>
                    <input type="text" defaultValue="Admin" className="input-field" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-600 dark:text-slate-400">Last Name</label>
                    <input type="text" defaultValue="User" className="input-field" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-600 dark:text-slate-400">Email Address</label>
                  <input type="email" defaultValue="admin@leadflow.com" className="input-field" />
                </div>
              </section>
            )}

            {activeSection === 'Notifications' && (
              <section className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <h3 className="text-lg font-bold text-slate-800 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-4">Notification Preferences</h3>
                <div className="space-y-4">
                  {[
                    { label: 'Email Notifications', desc: 'Receive daily summary of new leads.' },
                    { label: 'Push Notifications', desc: 'Get instant alerts on status changes.' },
                    { label: 'Weekly Reports', desc: 'Get detailed performance analytics weekly.' }
                  ].map((pref, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">{pref.label}</p>
                        <p className="text-xs text-slate-500">{pref.desc}</p>
                      </div>
                      <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-primary-600" />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {activeSection === 'Security' && (
              <section className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <h3 className="text-lg font-bold text-slate-800 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-4">Security Settings</h3>
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-600 dark:text-slate-400">Current Password</label>
                    <input type="password" placeholder="••••••••" className="input-field" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-600 dark:text-slate-400">New Password</label>
                    <input type="password" placeholder="••••••••" className="input-field" />
                  </div>
                  <button className="text-sm font-bold text-primary-600 hover:underline">Enable Two-Factor Authentication</button>
                </div>
              </section>
            )}

            {activeSection === 'Appearance' && (
              <section className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <h3 className="text-lg font-bold text-slate-800 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-4">Appearance</h3>
                <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                  <div>
                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">Dark Mode</p>
                    <p className="text-xs text-slate-500">Switch between light and dark themes</p>
                  </div>
                  <button 
                    onClick={toggleTheme}
                    className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ${isDarkMode ? 'bg-primary-600' : 'bg-slate-300'}`}
                  >
                    <div className={`w-4 h-4 bg-white rounded-full transition-transform duration-300 ${isDarkMode ? 'translate-x-6' : 'translate-x-0'}`} />
                  </button>
                </div>
              </section>
            )}

            {activeSection === 'Integrations' && (
              <section className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                  <h3 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
                    <Globe className="text-primary-500" size={20} />
                    Connected Apps
                  </h3>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">4 Available</span>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  {[
                    { name: 'Slack', desc: 'Send lead alerts to your channels.', color: '#4A154B', icon: 'hash' },
                    { name: 'Google Calendar', desc: 'Sync follow-ups with your calendar.', color: '#4285F4', icon: 'calendar' },
                    { name: 'Mailchimp', desc: 'Automate email marketing campaigns.', color: '#FFE01B', icon: 'mail', darkText: true },
                    { name: 'Zapier', desc: 'Connect with 5000+ other apps.', color: '#FF4F00', icon: 'zap' }
                  ].map((app) => (
                    <IntegrationItem key={app.name} app={app} showToast={showToast} />
                  ))}
                </div>
              </section>
            )}

            <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
              <button 
                onClick={() => showToast(`${activeSection} settings updated successfully!`, 'success')}
                className="btn-primary w-full sm:w-auto px-8"
              >
                <Save size={18} />
                Update {activeSection}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const IntegrationItem = ({ app, showToast }) => {
  const [isConnected, setIsConnected] = React.useState(false);

  return (
    <div className="flex items-center justify-between p-5 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-primary-200 dark:hover:border-primary-900 transition-all group">
      <div className="flex items-center gap-4">
        <div 
          className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg" 
          style={{ backgroundColor: app.color, color: app.darkText ? '#000' : '#fff' }}
        >
          {app.icon === 'hash' ? <span className="text-xl font-bold">#</span> : <Bell size={24} />}
        </div>
        <div>
          <p className="font-bold text-slate-800 dark:text-slate-200">{app.name}</p>
          <p className="text-xs text-slate-500 font-medium">{app.desc}</p>
        </div>
      </div>
      <button 
        onClick={() => {
          setIsConnected(!isConnected);
          showToast(`${app.name} ${!isConnected ? 'connected' : 'disconnected'} successfully!`, 'success');
        }}
        className={`px-5 py-2 rounded-xl font-bold text-xs transition-all ${
          isConnected 
            ? 'bg-emerald-100 text-emerald-600 hover:bg-emerald-200' 
            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-primary-600 hover:text-white'
        }`}
      >
        {isConnected ? 'Connected' : 'Connect'}
      </button>
    </div>
  );
};

export default Settings;
