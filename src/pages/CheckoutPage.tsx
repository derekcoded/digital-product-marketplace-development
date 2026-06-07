import { useState } from 'react';
import { Shield, CreditCard, CheckCircle, ArrowLeft, Loader2, Lock } from 'lucide-react';
import useStore from '../store/useStore';
import toast from 'react-hot-toast';

interface CheckoutPageProps {
  onNavigate: (page: string) => void;
}

export default function CheckoutPage({ onNavigate }: CheckoutPageProps) {
  const { darkMode, cart, cartTotal, appliedCoupon, clearCart, addOrder, currentUser, settings } = useStore();
  type StepType = 'details' | 'payment' | 'success';
  const [step, setStep] = useState<StepType>('details');
  const [processing, setProcessing] = useState(false);
  const [form, setForm] = useState({ name: currentUser?.name || '', email: currentUser?.email || '', phone: '' });
  const [paymentMethod, setPaymentMethod] = useState<'razorpay' | 'stripe' | 'paypal'>('razorpay');
  const [orderId, setOrderId] = useState('');

  const subtotal = cartTotal();
  const discount = appliedCoupon
    ? appliedCoupon.type === 'flat' ? appliedCoupon.value : Math.round(subtotal * appliedCoupon.value / 100)
    : 0;
  const taxableAmount = subtotal - discount;
  const tax = Math.round(taxableAmount * settings.taxRate / 100);
  const total = taxableAmount + tax;

  if (cart.length === 0 && step !== 'success') {
    onNavigate('cart');
    return null;
  }

  const handlePayment = () => {
    if (!form.name || !form.email) {
      toast.error('Please fill in all required fields');
      return;
    }
    setStep('payment');
  };

  const processPayment = () => {
    setProcessing(true);
    setTimeout(() => {
      const newOrderId = 'ORD-' + Date.now();
      setOrderId(newOrderId);
      addOrder({
        id: newOrderId,
        userId: currentUser?.id || 'guest',
        items: [...cart],
        total,
        tax,
        discount,
        couponCode: appliedCoupon?.code,
        status: 'completed',
        paymentMethod,
        transactionId: 'txn_' + Math.random().toString(36).substr(2, 12),
        createdAt: new Date().toISOString(),
        downloadExpiry: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
      });
      clearCart();
      setProcessing(false);
      setStep('success');
    }, 2500);
  };

  const paymentGateways = [
    { id: 'razorpay' as const, name: 'Razorpay', desc: 'Cards, UPI, Net Banking, Wallets', badge: '🇮🇳 Recommended' },
    { id: 'stripe' as const, name: 'Stripe', desc: 'International Cards', badge: '🌍 Global' },
    { id: 'paypal' as const, name: 'PayPal', desc: 'PayPal Balance & Cards', badge: '💰 Trusted' },
  ];

  if (step === 'success') {
    return (
      <div className={`min-h-screen pt-16 flex items-center justify-center px-4 ${darkMode ? 'bg-gray-950' : 'bg-gray-50'}`}>
        <div className={`max-w-md w-full rounded-3xl border p-8 text-center ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
          <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={48} className="text-emerald-500" />
          </div>
          <h2 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Payment Successful! 🎉</h2>
          <p className={`mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Your order has been confirmed.</p>
          <div className={`inline-block px-4 py-2 rounded-xl text-sm font-mono mb-6 ${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'}`}>
            Order ID: {orderId}
          </div>
          <div className={`rounded-xl p-4 mb-6 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              📧 Order confirmation sent to <strong>{form.email}</strong>
            </p>
          </div>
          <div className="space-y-3">
            <button
              onClick={() => onNavigate('orders')}
              className="w-full py-3.5 bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-bold transition-colors"
            >
              View Downloads
            </button>
            <button
              onClick={() => onNavigate('home')}
              className={`w-full py-3.5 rounded-xl font-medium text-sm border transition-colors ${darkMode ? 'border-gray-700 text-gray-300' : 'border-gray-300 text-gray-700'}`}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen pt-16 pb-24 md:pb-0 ${darkMode ? 'bg-gray-950 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => step === 'payment' ? setStep('details') : onNavigate('cart')}
          className={`flex items-center gap-2 mb-6 text-sm font-medium hover:text-violet-600 transition-colors ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}
        >
          <ArrowLeft size={16} /> Back
        </button>

        <h1 className={`text-2xl font-bold mb-8 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          {step === 'details' ? 'Checkout' : 'Payment'}
        </h1>

        {/* Progress Steps */}
        <div className="flex items-center gap-4 mb-8">
          {['Details', 'Payment', 'Confirm'].map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                (step === 'details' && i === 0) || (step === 'payment' && i <= 1) || (step as string) === 'success'
                  ? 'bg-violet-600 text-white'
                  : darkMode ? 'bg-gray-800 text-gray-500' : 'bg-gray-200 text-gray-400'
              }`}>
                {i + 1}
              </div>
              <span className={`text-sm hidden sm:block ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{s}</span>
              {i < 2 && <div className={`w-8 h-0.5 hidden sm:block ${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`} />}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left */}
          <div className="lg:col-span-2">
            {step === 'details' && (
              <div className={`rounded-2xl border p-6 ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
                <h2 className={`font-bold text-lg mb-5 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Contact Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className={`text-sm font-medium mb-1.5 block ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Full Name *</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'}`}
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className={`text-sm font-medium mb-1.5 block ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Email Address *</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'}`}
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className={`text-sm font-medium mb-1.5 block ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Phone (optional)</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                      className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'}`}
                      placeholder="+91 00000 00000"
                    />
                  </div>
                </div>
                <button
                  onClick={handlePayment}
                  className="w-full mt-6 py-4 bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-bold transition-colors shadow-lg shadow-violet-500/25"
                >
                  Continue to Payment
                </button>
              </div>
            )}

            {step === 'payment' && (
              <div className={`rounded-2xl border p-6 ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
                <h2 className={`font-bold text-lg mb-5 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Select Payment Method</h2>
                
                <div className="space-y-3 mb-6">
                  {paymentGateways.map(gw => (
                    <label
                      key={gw.id}
                      className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        paymentMethod === gw.id
                          ? 'border-violet-600 bg-violet-600/5'
                          : darkMode ? 'border-gray-700 hover:border-gray-600' : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="gateway"
                        value={gw.id}
                        checked={paymentMethod === gw.id}
                        onChange={() => setPaymentMethod(gw.id)}
                        className="sr-only"
                      />
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${paymentMethod === gw.id ? 'border-violet-600' : darkMode ? 'border-gray-600' : 'border-gray-300'}`}>
                        {paymentMethod === gw.id && <div className="w-2.5 h-2.5 bg-violet-600 rounded-full" />}
                      </div>
                      <CreditCard size={20} className={paymentMethod === gw.id ? 'text-violet-600' : darkMode ? 'text-gray-400' : 'text-gray-400'} />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className={`font-semibold text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>{gw.name}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${darkMode ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>{gw.badge}</span>
                        </div>
                        <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{gw.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>

                <div className={`flex items-center gap-2 p-3 rounded-xl mb-6 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                  <Lock size={14} className="text-emerald-500" />
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Your payment is secured with 256-bit SSL encryption. We never store your card details.
                  </p>
                </div>

                <button
                  onClick={processPayment}
                  disabled={processing}
                  className="w-full py-4 bg-violet-600 hover:bg-violet-700 disabled:opacity-70 text-white rounded-xl font-bold transition-colors shadow-lg shadow-violet-500/25 flex items-center justify-center gap-3"
                >
                  {processing ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      Processing Payment...
                    </>
                  ) : (
                    <>
                      <Shield size={18} />
                      Pay ₹{total.toLocaleString()} Securely
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className={`rounded-2xl border p-5 sticky top-20 ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
              <h3 className={`font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Order Summary</h3>
              <div className="space-y-3 mb-5">
                {cart.map(item => (
                  <div key={item.product.id} className="flex gap-3">
                    <img src={item.product.image} alt={item.product.title} className="w-12 h-8 object-cover rounded-lg" />
                    <div className="flex-1 min-w-0">
                      <p className={`text-xs font-medium truncate ${darkMode ? 'text-white' : 'text-gray-900'}`}>{item.product.title}</p>
                      <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>₹{item.product.price.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className={`space-y-2 pt-4 border-t text-sm ${darkMode ? 'border-gray-800' : 'border-gray-100'}`}>
                <div className={`flex justify-between ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  <span>Subtotal</span><span>₹{subtotal.toLocaleString()}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-500">
                    <span>Discount</span><span>-₹{discount.toLocaleString()}</span>
                  </div>
                )}
                <div className={`flex justify-between ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  <span>{settings.taxType} ({settings.taxRate}%)</span><span>₹{tax.toLocaleString()}</span>
                </div>
                <div className={`flex justify-between font-bold text-base pt-2 border-t ${darkMode ? 'border-gray-800 text-white' : 'border-gray-100 text-gray-900'}`}>
                  <span>Total</span><span className="text-violet-600">₹{total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
