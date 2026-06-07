import { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, ArrowLeft, Check } from 'lucide-react';
import useStore from '../store/useStore';
import toast from 'react-hot-toast';

interface AuthPagesProps {
  page: 'login' | 'signup' | 'forgot-password';
  onNavigate: (page: string) => void;
}

export default function AuthPages({ page, onNavigate }: AuthPagesProps) {
  const { darkMode, login, signup } = useStore();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [forgotSent, setForgotSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      if (page === 'login') {
        const result = login(form.email, form.password);
        if (result.success) {
          toast.success('Welcome back! 👋');
          onNavigate('home');
        } else {
          toast.error(result.message);
        }
      } else if (page === 'signup') {
        if (form.password !== form.confirmPassword) {
          toast.error('Passwords do not match');
          setLoading(false);
          return;
        }
        const result = signup(form.name, form.email, form.password);
        if (result.success) {
          toast.success('Account created! Welcome to YBT Digital 🎉');
          onNavigate('home');
        } else {
          toast.error(result.message);
        }
      } else {
        setForgotSent(true);
        toast.success('Password reset link sent to your email!');
      }
      setLoading(false);
    }, 1000);
  };

  const demoCredentials = [
    { label: 'User', email: 'user@ybtdigital.com', pass: 'user123' },
    { label: 'Admin', email: 'admin@ybtdigital.com', pass: 'admin123' },
  ];

  return (
    <div className={`min-h-screen pt-16 flex items-center justify-center px-4 py-12 ${darkMode ? 'bg-gray-950' : 'bg-gray-50'}`}>
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl shadow-violet-500/25">
            <span className="text-white font-black text-lg">YBT</span>
          </div>
          <h1 className={`text-2xl font-black ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {page === 'login' ? 'Welcome back!' : page === 'signup' ? 'Create account' : 'Reset password'}
          </h1>
          <p className={`mt-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {page === 'login' ? 'Sign in to your YBT Digital account'
              : page === 'signup' ? 'Join 50,000+ creators and developers'
              : 'Enter your email to receive reset instructions'}
          </p>
        </div>

        {/* Card */}
        <div className={`rounded-3xl border p-8 shadow-xl ${darkMode ? 'bg-gray-900 border-gray-800 shadow-black/20' : 'bg-white border-gray-200 shadow-gray-200/60'}`}>
          {forgotSent ? (
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check size={32} className="text-emerald-500" />
              </div>
              <h3 className={`font-bold text-lg mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Email Sent!</h3>
              <p className={`text-sm mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Check your inbox for password reset instructions.
              </p>
              <button
                onClick={() => onNavigate('login')}
                className="flex items-center gap-2 text-violet-600 hover:text-violet-700 text-sm font-medium mx-auto"
              >
                <ArrowLeft size={14} /> Back to Login
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {page === 'signup' && (
                <div>
                  <label className={`text-sm font-medium mb-1.5 block ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Full Name</label>
                  <div className="relative">
                    <User size={16} className={`absolute left-3.5 top-1/2 -translate-y-1/2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                    <input
                      type="text"
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 transition-shadow ${darkMode ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500' : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400'}`}
                      placeholder="Your full name"
                      required
                    />
                  </div>
                </div>
              )}

              <div>
                <label className={`text-sm font-medium mb-1.5 block ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Email Address</label>
                <div className="relative">
                  <Mail size={16} className={`absolute left-3.5 top-1/2 -translate-y-1/2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                  <input
                    type="email"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 transition-shadow ${darkMode ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500' : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400'}`}
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              {page !== 'forgot-password' && (
                <div>
                  <label className={`text-sm font-medium mb-1.5 block ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Password</label>
                  <div className="relative">
                    <Lock size={16} className={`absolute left-3.5 top-1/2 -translate-y-1/2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={form.password}
                      onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                      className={`w-full pl-10 pr-12 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 transition-shadow ${darkMode ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500' : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400'}`}
                      placeholder={page === 'signup' ? 'Min. 6 characters' : 'Your password'}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className={`absolute right-3.5 top-1/2 -translate-y-1/2 ${darkMode ? 'text-gray-500 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
              )}

              {page === 'signup' && (
                <div>
                  <label className={`text-sm font-medium mb-1.5 block ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Confirm Password</label>
                  <div className="relative">
                    <Lock size={16} className={`absolute left-3.5 top-1/2 -translate-y-1/2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={form.confirmPassword}
                      onChange={e => setForm(f => ({ ...f, confirmPassword: e.target.value }))}
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 transition-shadow ${darkMode ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500' : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400'}`}
                      placeholder="Confirm password"
                      required
                    />
                  </div>
                </div>
              )}

              {page === 'login' && (
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => onNavigate('forgot-password')}
                    className="text-xs text-violet-600 hover:text-violet-700 font-medium"
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-violet-600 hover:bg-violet-700 disabled:opacity-70 text-white rounded-xl font-bold text-sm transition-all shadow-lg shadow-violet-500/25 mt-2"
              >
                {loading ? 'Please wait...' : page === 'login' ? 'Sign In' : page === 'signup' ? 'Create Account' : 'Send Reset Link'}
              </button>

              {page === 'signup' && (
                <p className={`text-xs text-center ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                  By creating an account, you agree to our{' '}
                  <button className="text-violet-600 hover:underline">Terms of Service</button>
                  {' '}and{' '}
                  <button className="text-violet-600 hover:underline">Privacy Policy</button>
                </p>
              )}
            </form>
          )}

          {/* Navigation Links */}
          {!forgotSent && (
            <div className={`mt-6 pt-6 border-t text-center ${darkMode ? 'border-gray-800' : 'border-gray-100'}`}>
              {page === 'login' && (
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Don't have an account?{' '}
                  <button onClick={() => onNavigate('signup')} className="text-violet-600 hover:text-violet-700 font-semibold">
                    Sign up free
                  </button>
                </p>
              )}
              {page === 'signup' && (
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Already have an account?{' '}
                  <button onClick={() => onNavigate('login')} className="text-violet-600 hover:text-violet-700 font-semibold">
                    Sign in
                  </button>
                </p>
              )}
              {page === 'forgot-password' && (
                <button
                  onClick={() => onNavigate('login')}
                  className={`flex items-center gap-2 text-sm mx-auto ${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  <ArrowLeft size={14} /> Back to Login
                </button>
              )}
            </div>
          )}
        </div>

        {/* Demo Credentials */}
        {page === 'login' && (
          <div className={`mt-4 rounded-2xl border p-4 ${darkMode ? 'bg-gray-900/50 border-gray-800' : 'bg-white/50 border-gray-200'}`}>
            <p className={`text-xs font-semibold mb-3 text-center ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>🔑 Demo Accounts</p>
            <div className="grid grid-cols-2 gap-2">
              {demoCredentials.map(cred => (
                <button
                  key={cred.label}
                  onClick={() => {
                    setForm(f => ({ ...f, email: cred.email, password: cred.pass }));
                    toast.success(`${cred.label} credentials filled!`);
                  }}
                  className={`px-3 py-2 rounded-xl text-xs font-medium border transition-colors ${
                    darkMode ? 'border-gray-700 text-gray-300 hover:bg-gray-800' : 'border-gray-300 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <div className="font-semibold">{cred.label}</div>
                  <div className={`text-xs mt-0.5 truncate ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{cred.email}</div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
