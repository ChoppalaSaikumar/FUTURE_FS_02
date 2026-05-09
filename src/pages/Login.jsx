import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, TrendingUp, ArrowRight, User, Loader2 } from 'lucide-react';
import { useToast } from '../context/ToastContext';

const Login = () => {
  const { showToast } = useToast();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('admin@leadflow.com');
  const [password, setPassword] = useState('password123');
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    try {
      if (isLogin) {
        if (login(email, password)) {
          showToast('Successfully signed in!', 'success');
          navigate('/');
        } else {
          showToast('Invalid credentials. Please try again.', 'error');
        }
      } else {
        if (!name || !email || !password) {
          showToast('Please fill in all fields.', 'error');
          setIsLoading(false);
          return;
        }
        if (register(name, email, password)) {
          showToast('Account created successfully!', 'success');
          navigate('/');
        } else {
          showToast('Registration failed. Try again.', 'error');
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-950 relative overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-primary-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-emerald-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-8 relative z-10"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-600 text-white mb-4 shadow-lg shadow-primary-600/30">
            <TrendingUp size={32} />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2 font-outfit">LeadFlow CRM</h1>
          <p className="text-slate-400">{isLogin ? 'Enter your credentials to access your dashboard' : 'Join thousands of sales teams worldwide'}</p>
        </div>

        <form onSubmit={handleAuth} className="glass p-8 rounded-[2.5rem] space-y-6 border border-white/10 shadow-2xl">
          <h2 className="text-xl font-bold text-white text-center mb-2">{isLogin ? 'Sign In' : 'Create Account'}</h2>
          
          {!isLogin && (
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block ml-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-2xl py-4 pl-12 pr-4 text-white focus:ring-2 focus:ring-primary-500/50 focus:border-transparent outline-none transition-all"
                  placeholder="John Doe"
                  required={!isLogin}
                />
              </div>
            </motion.div>
          )}

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-800/50 border border-slate-700 rounded-2xl py-4 pl-12 pr-4 text-white focus:ring-2 focus:ring-primary-500/50 focus:border-transparent outline-none transition-all"
                placeholder="admin@leadflow.com"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block ml-1">Password</label>
              {isLogin && <a href="#" className="text-xs text-primary-400 hover:text-primary-300">Forgot password?</a>}
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-800/50 border border-slate-700 rounded-2xl py-4 pl-12 pr-4 text-white focus:ring-2 focus:ring-primary-500/50 focus:border-transparent outline-none transition-all"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          {isLogin && (
            <div className="flex items-center gap-2 ml-1">
              <input type="checkbox" id="remember" className="rounded border-slate-700 bg-slate-800 text-primary-600 focus:ring-primary-500/50" />
              <label htmlFor="remember" className="text-sm text-slate-400">Remember me for 30 days</label>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary-600 hover:bg-primary-700 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 group transition-all shadow-xl shadow-primary-600/20 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <Loader2 className="animate-spin" size={24} />
            ) : (
              <>
                <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <p className="text-center mt-8 text-slate-500 text-sm">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-primary-400 hover:text-primary-300 font-bold transition-colors"
          >
            {isLogin ? 'Create Account' : 'Sign In Now'}
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
