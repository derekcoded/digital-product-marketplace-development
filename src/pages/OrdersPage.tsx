import { Download, Package, Clock, CheckCircle, XCircle, RefreshCw, FileText } from 'lucide-react';
import useStore from '../store/useStore';

interface OrdersPageProps {
  onNavigate: (page: string) => void;
}

export default function OrdersPage({ onNavigate }: OrdersPageProps) {
  const { darkMode, orders, currentUser, isAuthenticated } = useStore();

  if (!isAuthenticated) {
    return (
      <div className={`min-h-screen pt-16 flex items-center justify-center ${darkMode ? 'bg-gray-950' : 'bg-gray-50'}`}>
        <div className="text-center px-4">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className={`text-xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Login Required</h2>
          <p className={`mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Please login to view your orders</p>
          <button onClick={() => onNavigate('login')} className="px-6 py-3 bg-violet-600 text-white rounded-xl font-semibold">
            Login
          </button>
        </div>
      </div>
    );
  }

  const userOrders = orders.filter(o => o.userId === currentUser?.id);

  const statusConfig = {
    completed: { icon: CheckCircle, color: 'text-emerald-500', bg: 'bg-emerald-500/10', label: 'Completed' },
    pending: { icon: Clock, color: 'text-yellow-500', bg: 'bg-yellow-500/10', label: 'Pending' },
    failed: { icon: XCircle, color: 'text-red-500', bg: 'bg-red-500/10', label: 'Failed' },
    refunded: { icon: RefreshCw, color: 'text-blue-500', bg: 'bg-blue-500/10', label: 'Refunded' },
  };

  const handleDownload = () => {
    // Simulate download
    const link = document.createElement('a');
    link.href = '#';
    link.click();
  };

  const isExpired = (expiryDate?: string) => {
    if (!expiryDate) return false;
    return new Date(expiryDate) < new Date();
  };

  return (
    <div className={`min-h-screen pt-16 pb-24 md:pb-0 ${darkMode ? 'bg-gray-950 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>My Orders & Downloads</h1>
            <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{userOrders.length} orders total</p>
          </div>
        </div>

        {userOrders.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-violet-600/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <Package size={36} className="text-violet-600" />
            </div>
            <h3 className={`text-xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>No orders yet</h3>
            <p className={`mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Start shopping to see your orders here</p>
            <button
              onClick={() => onNavigate('products')}
              className="px-6 py-3 bg-violet-600 text-white rounded-xl font-semibold"
            >
              Browse Products
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {userOrders.map(order => {
              const status = statusConfig[order.status];
              const StatusIcon = status.icon;
              const expired = isExpired(order.downloadExpiry);

              return (
                <div key={order.id} className={`rounded-2xl border overflow-hidden ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
                  {/* Order Header */}
                  <div className={`px-6 py-4 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${darkMode ? 'border-gray-800 bg-gray-800/50' : 'border-gray-100 bg-gray-50'}`}>
                    <div className="flex items-center gap-4">
                      <div>
                        <p className={`font-mono text-sm font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{order.id}</p>
                        <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                          {new Date(order.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${status.bg} ${status.color}`}>
                        <StatusIcon size={12} />
                        {status.label}
                      </div>
                      <div className={`text-right`}>
                        <p className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>₹{order.total.toLocaleString()}</p>
                        <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{order.paymentMethod}</p>
                      </div>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="p-6">
                    <div className="space-y-4">
                      {order.items.map(item => (
                        <div key={item.product.id} className="flex items-center gap-4">
                          <img
                            src={item.product.image}
                            alt={item.product.title}
                            className="w-16 h-11 object-cover rounded-xl"
                          />
                          <div className="flex-1 min-w-0">
                            <p className={`font-medium text-sm truncate ${darkMode ? 'text-white' : 'text-gray-900'}`}>{item.product.title}</p>
                            <div className="flex items-center gap-3 mt-1">
                              <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{item.product.category}</span>
                              <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{item.product.fileType}</span>
                            </div>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <p className={`font-semibold text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>₹{item.product.price.toLocaleString()}</p>
                            {order.status === 'completed' && (
                              <button
                                onClick={handleDownload}
                                disabled={expired}
                                className={`flex items-center gap-1 text-xs mt-1 font-medium transition-colors ${
                                  expired
                                    ? 'text-gray-400 cursor-not-allowed'
                                    : 'text-violet-600 hover:text-violet-700'
                                }`}
                              >
                                <Download size={11} />
                                {expired ? 'Expired' : 'Download'}
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Order Details Footer */}
                    <div className={`mt-4 pt-4 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${darkMode ? 'border-gray-800' : 'border-gray-100'}`}>
                      <div className={`text-xs space-y-0.5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                        <p>Transaction: <span className="font-mono">{order.transactionId}</span></p>
                        {order.downloadExpiry && (
                          <p className={expired ? 'text-red-500' : ''}>
                            Downloads {expired ? 'expired' : 'expire'}: {new Date(order.downloadExpiry).toLocaleDateString('en-IN')}
                          </p>
                        )}
                        {order.couponCode && <p>Coupon: {order.couponCode} (-₹{order.discount.toLocaleString()})</p>}
                      </div>
                      <div className="flex items-center gap-2">
                        <button className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium border transition-colors ${darkMode ? 'border-gray-700 text-gray-300 hover:bg-gray-800' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}>
                          <FileText size={13} /> Invoice
                        </button>
                        {order.status === 'completed' && (
                          <button
                            onClick={handleDownload}
                            disabled={expired}
                            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                              expired
                                ? 'bg-gray-400 text-white cursor-not-allowed'
                                : 'bg-violet-600 hover:bg-violet-700 text-white shadow-lg shadow-violet-500/20'
                            }`}
                          >
                            <Download size={13} />
                            {expired ? 'Link Expired' : 'Download All'}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
