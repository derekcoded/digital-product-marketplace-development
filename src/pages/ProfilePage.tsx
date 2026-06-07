import { useState } from 'react';
import { User, Mail, Lock, Camera, Save, Package, ShoppingCart, Star, LogOut } from 'lucide-react';
import useStore from '../store/useStore';
import toast from 'react-hot-toast';

interface ProfilePageProps {
  onNavigate: (page: string) => void;
}

export default function ProfilePage({ onNavigate }: ProfilePageProps) {
  const { darkMode, currentUser, isAuthenticated, updateProfile, logout, orders } = useStore();
  const [tab, setTab] = useState<'profile' | 'security'>('profile');
  const [form, setForm] = useState({ name: currentUser?.name || '', email: currentUser?.email || '' });
  const [passwords, setPasswords] = useState({ current: '', newPass: '', confirm: '' });
  const [saving, setSaving] = useState(false);

  if (!isAuthenticated || !currentUser) {
    return (
      <div className={`min-h-screen pt-16 flex items-center justify-center ${darkMode ? 'bg-gray-950' : 'bg-gray-50'}`}>
        <div className="text-center px-4">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className={`text-xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Login Required</h2>
          <button onClick={() => onNavigate('login')} className="px-6 py-3 bg-violet-600 text-white rounded-xl font-semibold">Login</button>
        </div>
      </div>
    );
  }

  const userOrders = orders.filter(o => o.userId === currentUser.id);
  const totalSpent = userOrders.filter(o => o.status === 'completed').reduce((sum, o) => sum + o.total, 0);
  const totalDownloads = userOrders.filter(o => o.status === 'completed').reduce((sum, o) => sum + o.items.length, 0);

  const handleSaveProfile = () => {
    setSaving(true);
    setTimeout(() => {
      updateProfile({ name: form.name, email: form.email });
      toast.success('Profile updated successfully!');
      setSaving(false);
    }, 800);
  };

  const handleChangePassword = () => {
    if (!passwords.current) { toast.error('Enter current password'); return; }
    if (passwords.newPass.length < 6) { toast.error('New password must be at least 6 characters'); return; }
    if (passwords.newPass !== passwords.confirm) { toast.error('Passwords do not match'); return; }
    setSaving(true);
    setTimeout(() => {
      toast.success('Password changed successfully!');
      setPasswords({ current: '', newPass: '', confirm: '' });
      setSaving(false);
    }, 800);
  };

  const handleLogout = () => {
    logout();
    onNavigate('home');
    toast.success('Signed out successfully');
  };

  const stats = [
    { icon: Package, label: 'Orders', value: userOrders.length },
    { icon: ShoppingCart, label: 'Products', value: totalDownloads },
    { icon: Star, label: 'Spent', value: `₹${totalSpent.toLocaleString()}` },
  ];

  return (
    <div className={`min-h-screen pt-16 pb-24 md:pb-0 ${darkMode ? 'bg-gray-950 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className={`rounded-2xl border overflow-hidden mb-6 ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
          <div className="h-24 bg-gradient-to-r from-violet-600 to-indigo-600" />
          <div className="px-6 pb-6 -mt-12">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div className="flex items-end gap-4">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-violet-500 to-indigo-500 rounded-2xl flex items-center justify-center border-4 border-white dark:border-gray-900 shadow-lg">
                    <span className="text-white text-3xl font-black">{currentUser.name.charAt(0).toUpperCase()}</span>
                  </div>
                  <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-violet-600 rounded-xl flex items-center justify-center shadow-lg hover:bg-violet-700 transition-colors">
                    <Camera size={13} className="text-white" />
                  </button>
                </div>
                <div className="mb-1">
                  <h1 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{currentUser.name}</h1>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{currentUser.email}</p>
                  <span className={`inline-block mt-1 px-2 py-0.5 text-xs font-semibold rounded-full ${
                    currentUser.role === 'super_admin' ? 'bg-red-500/10 text-red-500'
                    : currentUser.role === 'admin' ? 'bg-violet-500/10 text-violet-600'
                    : 'bg-emerald-500/10 text-emerald-600'
                  }`}>
                    {currentUser.role === 'super_admin' ? 'Super Admin' : currentUser.role === 'admin' ? 'Admin' : 'Customer'}
                  </span>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-500 border border-red-200 hover:bg-red-50 dark:border-red-800 dark:hover:bg-red-900/20 rounded-xl transition-colors"
              >
                <LogOut size={15} /> Sign Out
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              {stats.map(stat => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className={`p-4 rounded-xl text-center ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                    <Icon size={20} className="text-violet-600 mx-auto mb-1" />
                    <div className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{stat.value}</div>
                    <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className={`flex gap-1 p-1 rounded-xl mb-6 ${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
          {[
            { id: 'profile' as const, label: 'Profile Settings' },
            { id: 'security' as const, label: 'Security' },
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                tab === t.id
                  ? `${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} shadow`
                  : `${darkMode ? 'text-gray-400' : 'text-gray-600'}`
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className={`rounded-2xl border p-6 ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
          {tab === 'profile' && (
            <div className="space-y-5">
              <h2 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>Profile Information</h2>
              
              <div>
                <label className={`text-sm font-medium mb-1.5 block ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Full Name</label>
                <div className="relative">
                  <User size={16} className={`absolute left-3.5 top-1/2 -translate-y-1/2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                  <input
                    type="text"
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'}`}
                  />
                </div>
              </div>

              <div>
                <label className={`text-sm font-medium mb-1.5 block ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Email Address</label>
                <div className="relative">
                  <Mail size={16} className={`absolute left-3.5 top-1/2 -translate-y-1/2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                  <input
                    type="email"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'}`}
                  />
                </div>
              </div>

              <div>
                <label className={`text-sm font-medium mb-1.5 block ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Member Since</label>
                <div className={`px-4 py-3 rounded-xl text-sm ${darkMode ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-600'}`}>
                  {new Date(currentUser.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
              </div>

              <button
                onClick={handleSaveProfile}
                disabled={saving}
                className="flex items-center gap-2 px-6 py-3 bg-violet-600 hover:bg-violet-700 disabled:opacity-70 text-white rounded-xl font-semibold text-sm transition-colors shadow-lg shadow-violet-500/20"
              >
                <Save size={16} />
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          )}

          {tab === 'security' && (
            <div className="space-y-5">
              <h2 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>Change Password</h2>

              {[
                { label: 'Current Password', key: 'current', placeholder: 'Enter current password' },
                { label: 'New Password', key: 'newPass', placeholder: 'Min. 6 characters' },
                { label: 'Confirm New Password', key: 'confirm', placeholder: 'Repeat new password' },
              ].map(field => (
                <div key={field.key}>
                  <label className={`text-sm font-medium mb-1.5 block ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{field.label}</label>
                  <div className="relative">
                    <Lock size={16} className={`absolute left-3.5 top-1/2 -translate-y-1/2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                    <input
                      type="password"
                      value={passwords[field.key as keyof typeof passwords]}
                      onChange={e => setPasswords(p => ({ ...p, [field.key]: e.target.value }))}
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 ${darkMode ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500' : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400'}`}
                      placeholder={field.placeholder}
                    />
                  </div>
                </div>
              ))}

              <button
                onClick={handleChangePassword}
                disabled={saving}
                className="flex items-center gap-2 px-6 py-3 bg-violet-600 hover:bg-violet-700 disabled:opacity-70 text-white rounded-xl font-semibold text-sm transition-colors shadow-lg shadow-violet-500/20"
              >
                <Lock size={16} />
                {saving ? 'Updating...' : 'Update Password'}
              </button>
            </div>
          )}
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <button
            onClick={() => onNavigate('orders')}
            className={`p-4 rounded-2xl border flex items-center gap-3 transition-colors hover:border-violet-400 ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}
          >
            <Package className="text-violet-600" size={22} />
            <div className="text-left">
              <p className={`font-semibold text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>My Orders</p>
              <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{userOrders.length} orders</p>
            </div>
          </button>
          {(currentUser.role === 'admin' || currentUser.role === 'super_admin') && (
            <button
              onClick={() => onNavigate('admin')}
              className={`p-4 rounded-2xl border flex items-center gap-3 transition-colors hover:border-violet-400 ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}
            >
              <div className="text-violet-600 text-xl">⚙️</div>
              <div className="text-left">
                <p className={`font-semibold text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>Admin Panel</p>
                <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Manage site</p>
              </div>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
