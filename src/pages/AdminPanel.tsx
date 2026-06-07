import { useState } from 'react';
import {
  LayoutDashboard, Package, ShoppingBag, Users, Tag, BarChart3, MessageSquare, Settings,
  Plus, Edit2, Trash2, Eye, ChevronRight, TrendingUp, DollarSign, Download, ArrowLeft,
  Check, X, Save, Globe, CreditCard, Bell
} from 'lucide-react';
import useStore from '../store/useStore';
import { mockTickets } from '../data/mockData';
import { Product, Coupon } from '../types';
import toast from 'react-hot-toast';

interface AdminPanelProps {
  onNavigate: (page: string) => void;
}

type AdminTab = 'dashboard' | 'products' | 'orders' | 'users' | 'coupons' | 'analytics' | 'support' | 'settings';

export default function AdminPanel({ onNavigate }: AdminPanelProps) {
  const { darkMode, currentUser, isAuthenticated, products, orders, allUsers, coupons, settings,
    deleteProduct, blockUser, unblockUser, addCoupon, deleteCoupon, updateSettings } = useStore();
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [_sidebarOpen, _setSidebarOpen] = useState(false);
  const [productModal, setProductModal] = useState<{ open: boolean; product?: Product }>({ open: false });
  const [couponModal, setCouponModal] = useState<{ open: boolean; coupon?: Coupon }>({ open: false });
  const [newProduct, setNewProduct] = useState<Partial<Product>>({});
  const [newCoupon, setNewCoupon] = useState<Partial<Coupon>>({});
  const [settingsForm, setSettingsForm] = useState(settings);

  if (!isAuthenticated || !currentUser || currentUser.role === 'user') {
    return (
      <div className={`min-h-screen pt-16 flex items-center justify-center ${darkMode ? 'bg-gray-950' : 'bg-gray-50'}`}>
        <div className="text-center px-4">
          <div className="text-6xl mb-4">🚫</div>
          <h2 className={`text-xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Access Denied</h2>
          <p className={`mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Admin access required</p>
          <button onClick={() => onNavigate('home')} className="px-6 py-3 bg-violet-600 text-white rounded-xl font-semibold">Go Home</button>
        </div>
      </div>
    );
  }

  const tabs: { id: AdminTab; label: string; icon: React.ElementType }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'orders', label: 'Orders', icon: ShoppingBag },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'coupons', label: 'Coupons', icon: Tag },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'support', label: 'Support', icon: MessageSquare },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const totalRevenue = orders.filter(o => o.status === 'completed').reduce((s, o) => s + o.total, 0);
  const completedOrders = orders.filter(o => o.status === 'completed').length;
  const activeUsers = allUsers.filter(u => !u.blocked).length;
  const activeProducts = products.filter(p => p.status === 'active').length;

  const dashStats = [
    { label: 'Total Revenue', value: `₹${totalRevenue.toLocaleString()}`, icon: DollarSign, change: '+24%', positive: true },
    { label: 'Total Orders', value: orders.length, icon: ShoppingBag, change: '+12%', positive: true },
    { label: 'Active Users', value: activeUsers, icon: Users, change: '+8%', positive: true },
    { label: 'Products', value: activeProducts, icon: Package, change: '+3', positive: true },
  ];

  const topProducts = [...products].sort((a, b) => b.downloads - a.downloads).slice(0, 5);

  const handleSaveProduct = () => {
    if (!newProduct.title || !newProduct.price) {
      toast.error('Please fill required fields');
      return;
    }
    toast.success('Product saved!');
    setProductModal({ open: false });
    setNewProduct({});
  };

  const handleSaveCoupon = () => {
    if (!newCoupon.code || !newCoupon.value) {
      toast.error('Please fill required fields');
      return;
    }
    const coupon: Coupon = {
      id: Date.now().toString(),
      code: (newCoupon.code || '').toUpperCase(),
      type: newCoupon.type as 'flat' | 'percentage' || 'flat',
      value: Number(newCoupon.value),
      minOrder: Number(newCoupon.minOrder) || 0,
      maxUses: Number(newCoupon.maxUses) || 100,
      usedCount: 0,
      expiryDate: newCoupon.expiryDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      active: true
    };
    addCoupon(coupon);
    toast.success('Coupon created!');
    setCouponModal({ open: false });
    setNewCoupon({});
  };

  const handleSaveSettings = () => {
    updateSettings(settingsForm);
    toast.success('Settings saved!');
  };

  return (
    <div className={`min-h-screen pt-16 ${darkMode ? 'bg-gray-950 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="flex">
        {/* Sidebar */}
        <aside className={`fixed left-0 top-16 bottom-0 z-40 w-64 border-r flex-col transition-transform duration-300 hidden lg:flex ${
          darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
        }`}>
          <div className={`p-4 border-b ${darkMode ? 'border-gray-800' : 'border-gray-100'}`}>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-gradient-to-br from-violet-500 to-indigo-500 rounded-xl flex items-center justify-center text-white text-sm font-bold">
                {currentUser.name.charAt(0)}
              </div>
              <div>
                <p className={`font-semibold text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>{currentUser.name}</p>
                <p className="text-xs text-violet-600 font-medium">{currentUser.role === 'super_admin' ? 'Super Admin' : 'Admin'}</p>
              </div>
            </div>
          </div>
          <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/20'
                      : darkMode ? 'text-gray-400 hover:bg-gray-800 hover:text-white' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <Icon size={18} />
                  {tab.label}
                  {activeTab === tab.id && <ChevronRight size={14} className="ml-auto" />}
                </button>
              );
            })}
          </nav>
          <div className={`p-3 border-t ${darkMode ? 'border-gray-800' : 'border-gray-100'}`}>
            <button
              onClick={() => onNavigate('home')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                darkMode ? 'text-gray-400 hover:bg-gray-800 hover:text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <ArrowLeft size={18} /> Back to Site
            </button>
          </div>
        </aside>

        {/* Mobile Tab Bar */}
        <div className={`lg:hidden fixed bottom-0 left-0 right-0 z-50 border-t flex overflow-x-auto ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
          {tabs.slice(0, 6).map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center gap-0.5 px-3 py-2 flex-shrink-0 text-xs font-medium transition-colors ${
                  activeTab === tab.id ? 'text-violet-600' : darkMode ? 'text-gray-500' : 'text-gray-400'
                }`}
              >
                <Icon size={18} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Main Content */}
        <main className="lg:ml-64 flex-1 p-6 pb-24 lg:pb-6">
          {/* DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Dashboard Overview</h1>
              
              {/* Stats Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {dashStats.map(stat => {
                  const Icon = stat.icon;
                  return (
                    <div key={stat.label} className={`p-5 rounded-2xl border ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-10 h-10 bg-violet-600/10 rounded-xl flex items-center justify-center">
                          <Icon size={20} className="text-violet-600" />
                        </div>
                        <span className={`text-xs font-semibold ${stat.positive ? 'text-emerald-500' : 'text-red-500'}`}>{stat.change}</span>
                      </div>
                      <div className={`text-2xl font-black mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{stat.value}</div>
                      <div className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{stat.label}</div>
                    </div>
                  );
                })}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Top Products */}
                <div className={`rounded-2xl border p-5 ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
                  <h3 className={`font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Top Products</h3>
                  <div className="space-y-3">
                    {topProducts.map((p, i) => (
                      <div key={p.id} className="flex items-center gap-3">
                        <span className={`text-sm font-bold w-5 ${darkMode ? 'text-gray-500' : 'text-gray-300'}`}>#{i + 1}</span>
                        <img src={p.image} alt={p.title} className="w-10 h-7 object-cover rounded-lg" />
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-medium truncate ${darkMode ? 'text-white' : 'text-gray-900'}`}>{p.title}</p>
                          <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{p.downloads.toLocaleString()} downloads</p>
                        </div>
                        <span className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>₹{p.price.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Orders */}
                <div className={`rounded-2xl border p-5 ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
                  <h3 className={`font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Recent Orders</h3>
                  <div className="space-y-3">
                    {orders.slice(0, 5).map(order => (
                      <div key={order.id} className="flex items-center gap-3">
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-medium font-mono ${darkMode ? 'text-white' : 'text-gray-900'}`}>{order.id}</p>
                          <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{new Date(order.createdAt).toLocaleDateString('en-IN')}</p>
                        </div>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                          order.status === 'completed' ? 'bg-emerald-500/10 text-emerald-500'
                          : order.status === 'pending' ? 'bg-yellow-500/10 text-yellow-500'
                          : 'bg-red-500/10 text-red-500'
                        }`}>{order.status}</span>
                        <span className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>₹{order.total.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* PRODUCTS */}
          {activeTab === 'products' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Products ({products.length})</h1>
                <button
                  onClick={() => { setNewProduct({}); setProductModal({ open: true }); }}
                  className="flex items-center gap-2 px-4 py-2.5 bg-violet-600 hover:bg-violet-700 text-white rounded-xl text-sm font-semibold transition-colors"
                >
                  <Plus size={16} /> Add Product
                </button>
              </div>

              <div className={`rounded-2xl border overflow-hidden ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className={`text-xs font-semibold border-b ${darkMode ? 'bg-gray-800 border-gray-700 text-gray-400' : 'bg-gray-50 border-gray-200 text-gray-500'}`}>
                        {['Product', 'Category', 'Price', 'Downloads', 'Rating', 'Status', 'Actions'].map(h => (
                          <th key={h} className="text-left px-4 py-3">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                      {products.map(p => (
                        <tr key={p.id} className={`text-sm ${darkMode ? 'hover:bg-gray-800/50' : 'hover:bg-gray-50'} transition-colors`}>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <img src={p.image} alt={p.title} className="w-10 h-7 object-cover rounded-lg" />
                              <span className={`font-medium truncate max-w-[150px] ${darkMode ? 'text-white' : 'text-gray-900'}`}>{p.title}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`text-xs px-2 py-0.5 rounded-full ${darkMode ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-600'}`}>{p.category}</span>
                          </td>
                          <td className={`px-4 py-3 font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>₹{p.price.toLocaleString()}</td>
                          <td className={`px-4 py-3 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{p.downloads.toLocaleString()}</td>
                          <td className={`px-4 py-3 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>⭐ {p.rating}</td>
                          <td className="px-4 py-3">
                            <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${p.status === 'active' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-gray-500/10 text-gray-500'}`}>
                              {p.status}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => onNavigate('product')}
                                className={`p-1.5 rounded-lg transition-colors ${darkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-500'}`}
                              >
                                <Eye size={14} />
                              </button>
                              <button
                                onClick={() => { setNewProduct(p); setProductModal({ open: true, product: p }); }}
                                className={`p-1.5 rounded-lg transition-colors ${darkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-500'}`}
                              >
                                <Edit2 size={14} />
                              </button>
                              <button
                                onClick={() => { deleteProduct(p.id); toast.success('Product deleted'); }}
                                className="p-1.5 rounded-lg transition-colors hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ORDERS */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>All Orders ({orders.length})</h1>
              <div className={`rounded-2xl border overflow-hidden ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className={`text-xs font-semibold border-b ${darkMode ? 'bg-gray-800 border-gray-700 text-gray-400' : 'bg-gray-50 border-gray-200 text-gray-500'}`}>
                        {['Order ID', 'User', 'Items', 'Total', 'Payment', 'Status', 'Date'].map(h => (
                          <th key={h} className="text-left px-4 py-3">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                      {orders.map(order => (
                        <tr key={order.id} className={`text-sm ${darkMode ? 'hover:bg-gray-800/50' : 'hover:bg-gray-50'}`}>
                          <td className={`px-4 py-3 font-mono text-xs font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{order.id}</td>
                          <td className={`px-4 py-3 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{order.userId}</td>
                          <td className={`px-4 py-3 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{order.items.length} items</td>
                          <td className={`px-4 py-3 font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>₹{order.total.toLocaleString()}</td>
                          <td className={`px-4 py-3 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{order.paymentMethod}</td>
                          <td className="px-4 py-3">
                            <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                              order.status === 'completed' ? 'bg-emerald-500/10 text-emerald-500'
                              : order.status === 'pending' ? 'bg-yellow-500/10 text-yellow-500'
                              : 'bg-red-500/10 text-red-500'
                            }`}>{order.status}</span>
                          </td>
                          <td className={`px-4 py-3 text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                            {new Date(order.createdAt).toLocaleDateString('en-IN')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* USERS */}
          {activeTab === 'users' && (
            <div className="space-y-6">
              <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Users ({allUsers.length})</h1>
              <div className={`rounded-2xl border overflow-hidden ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className={`text-xs font-semibold border-b ${darkMode ? 'bg-gray-800 border-gray-700 text-gray-400' : 'bg-gray-50 border-gray-200 text-gray-500'}`}>
                        {['User', 'Email', 'Role', 'Joined', 'Status', 'Actions'].map(h => (
                          <th key={h} className="text-left px-4 py-3">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                      {allUsers.map(user => (
                        <tr key={user.id} className={`text-sm ${darkMode ? 'hover:bg-gray-800/50' : 'hover:bg-gray-50'}`}>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 bg-violet-600/20 rounded-full flex items-center justify-center text-sm font-bold text-violet-600">
                                {user.name.charAt(0)}
                              </div>
                              <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{user.name}</span>
                            </div>
                          </td>
                          <td className={`px-4 py-3 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{user.email}</td>
                          <td className="px-4 py-3">
                            <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                              user.role === 'super_admin' ? 'bg-red-500/10 text-red-500'
                              : user.role === 'admin' ? 'bg-violet-500/10 text-violet-600'
                              : 'bg-gray-500/10 text-gray-500'
                            }`}>{user.role}</span>
                          </td>
                          <td className={`px-4 py-3 text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                            {new Date(user.createdAt).toLocaleDateString('en-IN')}
                          </td>
                          <td className="px-4 py-3">
                            <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${user.blocked ? 'bg-red-500/10 text-red-500' : 'bg-emerald-500/10 text-emerald-500'}`}>
                              {user.blocked ? 'Blocked' : 'Active'}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            {user.role !== 'super_admin' && (
                              <button
                                onClick={() => {
                                  if (user.blocked) { unblockUser(user.id); toast.success(`${user.name} unblocked`); }
                                  else { blockUser(user.id); toast.success(`${user.name} blocked`); }
                                }}
                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                                  user.blocked
                                    ? 'border-emerald-600 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20'
                                    : 'border-red-500 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20'
                                }`}
                              >
                                {user.blocked ? <><Check size={11} /> Unblock</> : <><X size={11} /> Block</>}
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* COUPONS */}
          {activeTab === 'coupons' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Coupons ({coupons.length})</h1>
                <button
                  onClick={() => { setNewCoupon({ type: 'flat', active: true }); setCouponModal({ open: true }); }}
                  className="flex items-center gap-2 px-4 py-2.5 bg-violet-600 hover:bg-violet-700 text-white rounded-xl text-sm font-semibold"
                >
                  <Plus size={16} /> Create Coupon
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {coupons.map(coupon => (
                  <div key={coupon.id} className={`rounded-2xl border p-5 ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className={`font-mono font-bold text-lg tracking-wider ${darkMode ? 'text-white' : 'text-gray-900'}`}>{coupon.code}</div>
                        <div className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                          {coupon.type === 'flat' ? `₹${coupon.value} off` : `${coupon.value}% off`}
                        </div>
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${coupon.active ? 'bg-emerald-500/10 text-emerald-500' : 'bg-gray-500/10 text-gray-500'}`}>
                        {coupon.active ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    <div className={`text-xs space-y-1 ${darkMode ? 'text-gray-500' : 'text-gray-400'} mb-4`}>
                      <div className="flex justify-between">
                        <span>Min Order:</span><span>₹{coupon.minOrder.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Used:</span><span>{coupon.usedCount}/{coupon.maxUses}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Expires:</span><span>{new Date(coupon.expiryDate).toLocaleDateString('en-IN')}</span>
                      </div>
                    </div>
                    <div className={`w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mb-4`}>
                      <div className="bg-violet-600 h-1.5 rounded-full" style={{ width: `${Math.min(100, (coupon.usedCount / coupon.maxUses) * 100)}%` }} />
                    </div>
                    <button
                      onClick={() => { deleteCoupon(coupon.id); toast.success('Coupon deleted'); }}
                      className="flex items-center gap-1.5 text-xs text-red-500 hover:text-red-600 font-medium transition-colors"
                    >
                      <Trash2 size={12} /> Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ANALYTICS */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Analytics & Reports</h1>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { label: 'This Month Revenue', value: `₹${Math.round(totalRevenue * 0.4).toLocaleString()}`, icon: DollarSign, color: 'violet' },
                  { label: 'Total Downloads', value: products.reduce((s, p) => s + p.downloads, 0).toLocaleString(), icon: Download, color: 'emerald' },
                  { label: 'Avg Order Value', value: `₹${Math.round(totalRevenue / Math.max(1, completedOrders)).toLocaleString()}`, icon: TrendingUp, color: 'blue' },
                ].map(s => {
                  const Icon = s.icon;
                  return (
                    <div key={s.label} className={`p-5 rounded-2xl border ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 bg-${s.color}-600/10`}>
                        <Icon size={20} className={`text-${s.color}-600`} />
                      </div>
                      <div className={`text-2xl font-black mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{s.value}</div>
                      <div className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{s.label}</div>
                    </div>
                  );
                })}
              </div>

              <div className={`rounded-2xl border p-6 ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
                <h3 className={`font-bold mb-5 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Revenue by Category</h3>
                <div className="space-y-3">
                  {['UI Kits', 'Templates', 'Themes', 'Courses', 'eBooks'].map((cat, i) => {
                    const pct = [85, 72, 65, 58, 42][i];
                    return (
                      <div key={cat}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>{cat}</span>
                          <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{pct}%</span>
                        </div>
                        <div className={`w-full rounded-full h-2 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                          <div className="bg-gradient-to-r from-violet-600 to-indigo-600 h-2 rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className={`rounded-2xl border p-6 ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
                <h3 className={`font-bold mb-5 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Tax Collection Summary</h3>
                <div className={`grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm`}>
                  {[
                    { label: 'Total Revenue', value: `₹${totalRevenue.toLocaleString()}` },
                    { label: 'Total Tax (GST 18%)', value: `₹${Math.round(totalRevenue * 0.18).toLocaleString()}` },
                    { label: 'Net Revenue', value: `₹${Math.round(totalRevenue * 0.82).toLocaleString()}` },
                  ].map(item => (
                    <div key={item.label} className={`p-4 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                      <p className={`text-xs mb-1 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{item.label}</p>
                      <p className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* SUPPORT */}
          {activeTab === 'support' && (
            <div className="space-y-6">
              <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Support Tickets</h1>
              <div className="space-y-4">
                {mockTickets.map(ticket => (
                  <div key={ticket.id} className={`rounded-2xl border p-5 ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`font-mono text-xs font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{ticket.id}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                            ticket.priority === 'high' ? 'bg-red-500/10 text-red-500'
                            : ticket.priority === 'medium' ? 'bg-yellow-500/10 text-yellow-500'
                            : 'bg-gray-500/10 text-gray-500'
                          }`}>{ticket.priority}</span>
                        </div>
                        <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{ticket.subject}</h3>
                        <p className={`text-xs mt-0.5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>From: {ticket.userName}</p>
                      </div>
                      <span className={`text-xs px-3 py-1.5 rounded-full font-semibold flex-shrink-0 ${
                        ticket.status === 'resolved' ? 'bg-emerald-500/10 text-emerald-500'
                        : ticket.status === 'in-progress' ? 'bg-blue-500/10 text-blue-500'
                        : 'bg-yellow-500/10 text-yellow-500'
                      }`}>{ticket.status}</span>
                    </div>
                    <p className={`text-sm mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{ticket.message}</p>
                    {ticket.replies.length > 0 && (
                      <div className={`pl-4 border-l-2 border-violet-600/30 space-y-3`}>
                        {ticket.replies.map(reply => (
                          <div key={reply.id}>
                            <span className={`text-xs font-semibold ${reply.isAdmin ? 'text-violet-600' : darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                              {reply.isAdmin ? '👑 Admin' : '👤 User'}
                            </span>
                            <p className={`text-sm mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{reply.message}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SETTINGS */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Settings</h1>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* General Settings */}
                <div className={`rounded-2xl border p-6 ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
                  <div className="flex items-center gap-2 mb-5">
                    <Globe size={18} className="text-violet-600" />
                    <h3 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>General & Branding</h3>
                  </div>
                  <div className="space-y-4">
                    {[
                      { label: 'Site Name', key: 'siteName', type: 'text' },
                      { label: 'Site Tagline', key: 'siteTagline', type: 'text' },
                      { label: 'Footer Text', key: 'footerText', type: 'text' },
                    ].map(field => (
                      <div key={field.key}>
                        <label className={`text-sm font-medium mb-1.5 block ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{field.label}</label>
                        <input
                          type={field.type}
                          value={settingsForm[field.key as keyof typeof settingsForm] as string}
                          onChange={e => setSettingsForm(s => ({ ...s, [field.key]: e.target.value }))}
                          className={`w-full px-4 py-2.5 rounded-xl border text-sm ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 border-gray-300'}`}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tax Settings */}
                <div className={`rounded-2xl border p-6 ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
                  <div className="flex items-center gap-2 mb-5">
                    <DollarSign size={18} className="text-violet-600" />
                    <h3 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Currency & Tax</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className={`text-sm font-medium mb-1.5 block ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Currency</label>
                        <select value={settingsForm.currency} onChange={e => setSettingsForm(s => ({ ...s, currency: e.target.value }))}
                          className={`w-full px-3 py-2.5 rounded-xl border text-sm ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 border-gray-300'}`}>
                          <option value="INR">INR (₹)</option>
                          <option value="USD">USD ($)</option>
                          <option value="EUR">EUR (€)</option>
                          <option value="GBP">GBP (£)</option>
                        </select>
                      </div>
                      <div>
                        <label className={`text-sm font-medium mb-1.5 block ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Tax Type</label>
                        <select value={settingsForm.taxType} onChange={e => setSettingsForm(s => ({ ...s, taxType: e.target.value as 'GST' | 'VAT' | 'None' }))}
                          className={`w-full px-3 py-2.5 rounded-xl border text-sm ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 border-gray-300'}`}>
                          <option value="GST">GST</option>
                          <option value="VAT">VAT</option>
                          <option value="None">None</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className={`text-sm font-medium mb-1.5 block ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Tax Rate (%)</label>
                      <input type="number" value={settingsForm.taxRate} onChange={e => setSettingsForm(s => ({ ...s, taxRate: Number(e.target.value) }))}
                        className={`w-full px-4 py-2.5 rounded-xl border text-sm ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 border-gray-300'}`} />
                    </div>
                  </div>
                </div>

                {/* Payment Gateway */}
                <div className={`rounded-2xl border p-6 ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
                  <div className="flex items-center gap-2 mb-5">
                    <CreditCard size={18} className="text-violet-600" />
                    <h3 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Payment Gateway</h3>
                  </div>
                  <div className="space-y-3">
                    {(['razorpay', 'stripe', 'paypal'] as const).map(gw => (
                      <label key={gw} className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                        settingsForm.activeGateway === gw ? 'border-violet-600 bg-violet-600/5' : darkMode ? 'border-gray-700' : 'border-gray-200'
                      }`}>
                        <input type="radio" checked={settingsForm.activeGateway === gw} onChange={() => setSettingsForm(s => ({ ...s, activeGateway: gw }))} className="sr-only" />
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${settingsForm.activeGateway === gw ? 'border-violet-600' : darkMode ? 'border-gray-600' : 'border-gray-300'}`}>
                          {settingsForm.activeGateway === gw && <div className="w-2 h-2 bg-violet-600 rounded-full" />}
                        </div>
                        <span className={`font-medium text-sm capitalize ${darkMode ? 'text-white' : 'text-gray-900'}`}>{gw}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Email Notifications */}
                <div className={`rounded-2xl border p-6 ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
                  <div className="flex items-center gap-2 mb-5">
                    <Bell size={18} className="text-violet-600" />
                    <h3 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Email Notifications</h3>
                  </div>
                  <div className="space-y-3">
                    {[
                      { key: 'orderConfirmation', label: 'Order Confirmation' },
                      { key: 'failedPayment', label: 'Failed Payment Alert' },
                      { key: 'refund', label: 'Refund Notification' },
                    ].map(notif => (
                      <label key={notif.key} className="flex items-center justify-between cursor-pointer">
                        <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{notif.label}</span>
                        <div
                          onClick={() => setSettingsForm(s => ({
                            ...s,
                            emailNotifications: { ...s.emailNotifications, [notif.key]: !s.emailNotifications[notif.key as keyof typeof s.emailNotifications] }
                          }))}
                          className={`w-11 h-6 rounded-full transition-colors cursor-pointer relative ${
                            settingsForm.emailNotifications[notif.key as keyof typeof settingsForm.emailNotifications]
                              ? 'bg-violet-600' : darkMode ? 'bg-gray-700' : 'bg-gray-300'
                          }`}
                        >
                          <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${
                            settingsForm.emailNotifications[notif.key as keyof typeof settingsForm.emailNotifications] ? 'translate-x-6' : 'translate-x-1'
                          }`} />
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={handleSaveSettings}
                className="flex items-center gap-2 px-6 py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-bold text-sm transition-colors shadow-lg shadow-violet-500/25"
              >
                <Save size={16} /> Save All Settings
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Product Modal */}
      {productModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className={`w-full max-w-lg rounded-3xl border max-h-[90vh] overflow-y-auto ${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'}`}>
            <div className={`flex items-center justify-between p-6 border-b ${darkMode ? 'border-gray-800' : 'border-gray-100'}`}>
              <h3 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {productModal.product ? 'Edit Product' : 'Add New Product'}
              </h3>
              <button onClick={() => setProductModal({ open: false })}><X size={20} /></button>
            </div>
            <div className="p-6 space-y-4">
              {[
                { label: 'Title', key: 'title', type: 'text', placeholder: 'Product title' },
                { label: 'Price (₹)', key: 'price', type: 'number', placeholder: '0' },
                { label: 'Original Price (₹)', key: 'originalPrice', type: 'number', placeholder: '0' },
              ].map(f => (
                <div key={f.key}>
                  <label className={`text-sm font-medium mb-1.5 block ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{f.label}</label>
                  <input
                    type={f.type}
                    placeholder={f.placeholder}
                    defaultValue={productModal.product ? String((productModal.product as unknown as Record<string, unknown>)[f.key] || '') : ''}
                    onChange={e => setNewProduct(p => ({ ...p, [f.key]: f.type === 'number' ? Number(e.target.value) : e.target.value }))}
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 border-gray-300'}`}
                  />
                </div>
              ))}
              <div>
                <label className={`text-sm font-medium mb-1.5 block ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Category</label>
                <select
                  onChange={e => setNewProduct(p => ({ ...p, category: e.target.value }))}
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 border-gray-300'}`}
                >
                  {['UI Kits', 'Templates', 'Themes', 'Icons', 'Plugins', 'Scripts', 'eBooks', 'Courses'].map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={`text-sm font-medium mb-1.5 block ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Description</label>
                <textarea
                  rows={3}
                  onChange={e => setNewProduct(p => ({ ...p, description: e.target.value }))}
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm resize-none ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 border-gray-300'}`}
                  placeholder="Short product description"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setProductModal({ open: false })} className={`flex-1 py-3 rounded-xl border font-semibold text-sm ${darkMode ? 'border-gray-700 text-gray-300' : 'border-gray-300 text-gray-700'}`}>Cancel</button>
                <button onClick={handleSaveProduct} className="flex-1 py-3 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-bold text-sm">
                  {productModal.product ? 'Update' : 'Create'} Product
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Coupon Modal */}
      {couponModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className={`w-full max-w-md rounded-3xl border ${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'}`}>
            <div className={`flex items-center justify-between p-6 border-b ${darkMode ? 'border-gray-800' : 'border-gray-100'}`}>
              <h3 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>Create Coupon</h3>
              <button onClick={() => setCouponModal({ open: false })}><X size={20} /></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className={`text-sm font-medium mb-1.5 block ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Coupon Code *</label>
                <input
                  type="text"
                  placeholder="e.g. SUMMER30"
                  onChange={e => setNewCoupon(c => ({ ...c, code: e.target.value.toUpperCase() }))}
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 border-gray-300'}`}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={`text-sm font-medium mb-1.5 block ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Type</label>
                  <select onChange={e => setNewCoupon(c => ({ ...c, type: e.target.value as 'flat' | 'percentage' }))}
                    className={`w-full px-3 py-2.5 rounded-xl border text-sm ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 border-gray-300'}`}>
                    <option value="flat">Flat (₹)</option>
                    <option value="percentage">Percentage (%)</option>
                  </select>
                </div>
                <div>
                  <label className={`text-sm font-medium mb-1.5 block ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Value *</label>
                  <input type="number" placeholder="0" onChange={e => setNewCoupon(c => ({ ...c, value: Number(e.target.value) }))}
                    className={`w-full px-3 py-2.5 rounded-xl border text-sm ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 border-gray-300'}`} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={`text-sm font-medium mb-1.5 block ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Min Order (₹)</label>
                  <input type="number" placeholder="0" onChange={e => setNewCoupon(c => ({ ...c, minOrder: Number(e.target.value) }))}
                    className={`w-full px-3 py-2.5 rounded-xl border text-sm ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 border-gray-300'}`} />
                </div>
                <div>
                  <label className={`text-sm font-medium mb-1.5 block ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Max Uses</label>
                  <input type="number" placeholder="100" onChange={e => setNewCoupon(c => ({ ...c, maxUses: Number(e.target.value) }))}
                    className={`w-full px-3 py-2.5 rounded-xl border text-sm ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 border-gray-300'}`} />
                </div>
              </div>
              <div>
                <label className={`text-sm font-medium mb-1.5 block ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Expiry Date</label>
                <input type="date" onChange={e => setNewCoupon(c => ({ ...c, expiryDate: e.target.value }))}
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 border-gray-300'}`} />
              </div>
              <div className="flex gap-3">
                <button onClick={() => setCouponModal({ open: false })} className={`flex-1 py-3 rounded-xl border font-semibold text-sm ${darkMode ? 'border-gray-700 text-gray-300' : 'border-gray-300 text-gray-700'}`}>Cancel</button>
                <button onClick={handleSaveCoupon} className="flex-1 py-3 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-bold text-sm">Create Coupon</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
