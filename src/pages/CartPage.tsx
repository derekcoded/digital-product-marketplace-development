import { ShoppingCart, Trash2, ArrowRight, ShoppingBag, Tag, X } from 'lucide-react';
import { useState } from 'react';
import useStore from '../store/useStore';
import toast from 'react-hot-toast';

interface CartPageProps {
  onNavigate: (page: string) => void;
}

export default function CartPage({ onNavigate }: CartPageProps) {
  const { darkMode, cart, removeFromCart, clearCart, cartTotal, applyCoupon, removeCoupon, appliedCoupon, isAuthenticated, settings } = useStore();
  const [couponInput, setCouponInput] = useState('');
  const [couponLoading, setCouponLoading] = useState(false);

  const subtotal = cartTotal();
  const discount = appliedCoupon
    ? appliedCoupon.type === 'flat'
      ? appliedCoupon.value
      : Math.round(subtotal * appliedCoupon.value / 100)
    : 0;
  const taxableAmount = subtotal - discount;
  const tax = Math.round(taxableAmount * settings.taxRate / 100);
  const total = taxableAmount + tax;

  const handleApplyCoupon = () => {
    setCouponLoading(true);
    setTimeout(() => {
      const result = applyCoupon(couponInput.trim(), subtotal);
      if (result.success) {
        toast.success(result.message, { icon: '🎉' });
        setCouponInput('');
      } else {
        toast.error(result.message);
      }
      setCouponLoading(false);
    }, 800);
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      toast.error('Please login to proceed with checkout');
      onNavigate('login');
      return;
    }
    onNavigate('checkout');
  };

  if (cart.length === 0) {
    return (
      <div className={`min-h-screen pt-16 pb-24 md:pb-0 flex items-center justify-center ${darkMode ? 'bg-gray-950' : 'bg-gray-50'}`}>
        <div className="text-center px-4">
          <div className="w-24 h-24 bg-violet-600/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <ShoppingCart size={40} className="text-violet-600" />
          </div>
          <h2 className={`text-2xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Your cart is empty</h2>
          <p className={`mb-8 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Add some amazing digital products to get started!</p>
          <button
            onClick={() => onNavigate('products')}
            className="flex items-center gap-2 px-8 py-4 bg-violet-600 hover:bg-violet-700 text-white rounded-2xl font-semibold mx-auto transition-colors shadow-lg shadow-violet-500/25"
          >
            <ShoppingBag size={20} /> Browse Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen pt-16 pb-24 md:pb-0 ${darkMode ? 'bg-gray-950 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Shopping Cart <span className={`text-base font-normal ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>({cart.length} items)</span>
          </h1>
          <button onClick={clearCart} className={`flex items-center gap-1 text-sm text-red-500 hover:text-red-600 transition-colors`}>
            <Trash2 size={14} /> Clear All
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map(item => (
              <div key={item.product.id} className={`flex gap-4 p-4 rounded-2xl border ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
                <img
                  src={item.product.image}
                  alt={item.product.title}
                  className="w-20 h-14 sm:w-24 sm:h-16 object-cover rounded-xl flex-shrink-0 cursor-pointer"
                  onClick={() => onNavigate('product')}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h3 className={`font-semibold text-sm leading-snug truncate ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {item.product.title}
                      </h3>
                      <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{item.product.category}</span>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className={`p-1.5 rounded-lg transition-colors flex-shrink-0 ${darkMode ? 'text-gray-500 hover:text-red-400 hover:bg-red-900/20' : 'text-gray-400 hover:text-red-500 hover:bg-red-50'}`}
                    >
                      <X size={15} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-1">
                      <span className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        ₹{item.product.price.toLocaleString()}
                      </span>
                      {item.product.originalPrice && (
                        <span className={`text-xs line-through ${darkMode ? 'text-gray-600' : 'text-gray-400'}`}>
                          ₹{item.product.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${darkMode ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>
                      {item.product.fileType}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className={`rounded-2xl border sticky top-20 overflow-hidden ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
              <div className="p-6">
                <h2 className={`font-bold text-lg mb-5 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Order Summary</h2>

                {/* Coupon */}
                <div className="mb-5">
                  {appliedCoupon ? (
                    <div className={`flex items-center justify-between px-4 py-3 rounded-xl ${darkMode ? 'bg-emerald-900/20 border border-emerald-800' : 'bg-emerald-50 border border-emerald-200'}`}>
                      <div className="flex items-center gap-2">
                        <Tag size={14} className="text-emerald-500" />
                        <span className="text-sm font-semibold text-emerald-600">{appliedCoupon.code}</span>
                      </div>
                      <button onClick={removeCoupon} className="text-emerald-600 hover:text-red-500">
                        <X size={14} />
                      </button>
                    </div>
                  ) : (
                    <div className={`flex gap-2`}>
                      <input
                        type="text"
                        value={couponInput}
                        onChange={e => setCouponInput(e.target.value.toUpperCase())}
                        placeholder="Coupon code"
                        onKeyDown={e => e.key === 'Enter' && handleApplyCoupon()}
                        className={`flex-1 px-4 py-2.5 rounded-xl text-sm border ${darkMode ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500' : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400'}`}
                      />
                      <button
                        onClick={handleApplyCoupon}
                        disabled={!couponInput || couponLoading}
                        className="px-4 py-2.5 bg-violet-600 hover:bg-violet-700 disabled:opacity-50 text-white rounded-xl text-sm font-medium transition-colors flex-shrink-0"
                      >
                        {couponLoading ? '...' : 'Apply'}
                      </button>
                    </div>
                  )}
                  <p className={`text-xs mt-2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Try: WELCOME20, SAVE500, YBT30</p>
                </div>

                {/* Price Breakdown */}
                <div className={`space-y-3 pb-5 border-b ${darkMode ? 'border-gray-800' : 'border-gray-100'}`}>
                  <div className="flex justify-between text-sm">
                    <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>Subtotal</span>
                    <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>₹{subtotal.toLocaleString()}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-emerald-500">Discount ({appliedCoupon?.code})</span>
                      <span className="text-emerald-500 font-medium">-₹{discount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>{settings.taxType} ({settings.taxRate}%)</span>
                    <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>₹{tax.toLocaleString()}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center pt-4 mb-6">
                  <span className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>Total</span>
                  <span className="font-black text-2xl text-violet-600">₹{total.toLocaleString()}</span>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full flex items-center justify-center gap-2 py-4 bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-bold text-sm transition-all shadow-lg shadow-violet-500/30"
                >
                  Proceed to Checkout <ArrowRight size={18} />
                </button>
                <button
                  onClick={() => onNavigate('products')}
                  className={`w-full py-3 rounded-xl text-sm font-medium mt-3 transition-colors ${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
