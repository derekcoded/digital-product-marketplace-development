import { useState } from 'react';
import { MessageSquare, Send, Clock, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import useStore from '../store/useStore';
import toast from 'react-hot-toast';

interface SupportPageProps {
  onNavigate: (page: string) => void;
}

export default function SupportPage({ onNavigate }: SupportPageProps) {
  const { darkMode, currentUser } = useStore();
  const [form, setForm] = useState({ name: currentUser?.name || '', email: currentUser?.email || '', subject: '', message: '', priority: 'medium' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.subject || !form.message) {
      toast.error('Please fill all required fields');
      return;
    }
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
      toast.success('Support ticket submitted! We\'ll respond within 24 hours.', { icon: '🎫' });
    }, 1500);
  };

  const supportOptions = [
    { icon: '💬', title: 'Live Chat', desc: 'Chat with our team', tag: 'Online now', action: () => toast.success('Chat feature coming soon!') },
    { icon: '📧', title: 'Email Support', desc: 'support@ybtdigital.com', tag: 'Reply in 24h', action: () => {} },
    { icon: '📚', title: 'Documentation', desc: 'Browse our help center', tag: 'Self-service', action: () => onNavigate('faq') },
    { icon: '💼', title: 'Business Support', desc: 'Priority enterprise support', tag: 'Premium', action: () => {} },
  ];

  return (
    <div className={`min-h-screen pt-16 pb-24 md:pb-0 ${darkMode ? 'bg-gray-950 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className={`text-3xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>How can we help?</h1>
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Our support team is here to assist you 24/7</p>
        </div>

        {/* Support Options */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {supportOptions.map(opt => (
            <button
              key={opt.title}
              onClick={opt.action}
              className={`p-5 rounded-2xl border text-left transition-all hover:-translate-y-1 hover:shadow-lg ${
                darkMode ? 'bg-gray-900 border-gray-800 hover:border-violet-500/50' : 'bg-white border-gray-200 hover:border-violet-200'
              }`}
            >
              <div className="text-2xl mb-3">{opt.icon}</div>
              <h3 className={`font-semibold text-sm mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{opt.title}</h3>
              <p className={`text-xs mb-2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{opt.desc}</p>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${darkMode ? 'bg-violet-900/30 text-violet-400' : 'bg-violet-100 text-violet-600'}`}>
                {opt.tag}
              </span>
            </button>
          ))}
        </div>

        {/* Contact Form */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3">
            <div className={`rounded-2xl border p-6 ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
              <h2 className={`text-xl font-bold mb-6 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                <MessageSquare size={20} className="text-violet-600" />
                Submit a Support Ticket
              </h2>

              {sent ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={32} className="text-emerald-500" />
                  </div>
                  <h3 className={`font-bold text-lg mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Ticket Submitted!</h3>
                  <p className={`text-sm mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    We'll get back to you at <strong>{form.email}</strong> within 24 hours.
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="px-6 py-3 bg-violet-600 text-white rounded-xl font-semibold text-sm"
                  >
                    Submit Another Ticket
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={`text-sm font-medium mb-1.5 block ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Name *</label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 border-gray-300'}`}
                        placeholder="Your name"
                        required
                      />
                    </div>
                    <div>
                      <label className={`text-sm font-medium mb-1.5 block ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Email *</label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                        className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 border-gray-300'}`}
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className={`text-sm font-medium mb-1.5 block ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Subject *</label>
                    <input
                      type="text"
                      value={form.subject}
                      onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                      className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 border-gray-300'}`}
                      placeholder="Brief description of your issue"
                      required
                    />
                  </div>
                  <div>
                    <label className={`text-sm font-medium mb-1.5 block ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Priority</label>
                    <select
                      value={form.priority}
                      onChange={e => setForm(f => ({ ...f, priority: e.target.value }))}
                      className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 border-gray-300'}`}
                    >
                      <option value="low">Low – General inquiry</option>
                      <option value="medium">Medium – Issue affecting use</option>
                      <option value="high">High – Cannot access purchase</option>
                    </select>
                  </div>
                  <div>
                    <label className={`text-sm font-medium mb-1.5 block ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Message *</label>
                    <textarea
                      value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      rows={5}
                      className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none ${darkMode ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500' : 'bg-gray-50 border-gray-300 placeholder-gray-400'}`}
                      placeholder="Describe your issue in detail..."
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full flex items-center justify-center gap-2 py-3.5 bg-violet-600 hover:bg-violet-700 disabled:opacity-70 text-white rounded-xl font-bold text-sm transition-colors shadow-lg shadow-violet-500/25"
                  >
                    {sending ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                    {sending ? 'Submitting...' : 'Submit Ticket'}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Help Tips */}
          <div className="lg:col-span-2 space-y-4">
            <div className={`rounded-2xl border p-5 ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
              <h3 className={`font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Before You Submit</h3>
              <div className="space-y-3">
                {[
                  { icon: Clock, text: 'Response time: Within 24 hours on weekdays' },
                  { icon: AlertCircle, text: 'For urgent issues, use Live Chat for faster help' },
                  { icon: CheckCircle, text: 'Check our FAQ page for instant answers' },
                  { icon: MessageSquare, text: 'Include your order ID for purchase-related issues' },
                ].map((tip, i) => {
                  const Icon = tip.icon;
                  return (
                    <div key={i} className={`flex items-start gap-3 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      <Icon size={14} className="text-violet-600 mt-0.5 flex-shrink-0" />
                      {tip.text}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className={`rounded-2xl p-5 bg-gradient-to-br from-violet-600 to-indigo-600 text-white`}>
              <h3 className="font-bold mb-2">Need Quick Help?</h3>
              <p className="text-sm text-violet-200 mb-4">Browse our comprehensive FAQ page for instant answers to common questions.</p>
              <button
                onClick={() => onNavigate('faq')}
                className="w-full py-2.5 bg-white text-violet-600 rounded-xl font-semibold text-sm hover:bg-violet-50 transition-colors"
              >
                Browse FAQ
              </button>
            </div>

            <div className={`rounded-2xl border p-5 ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
              <h3 className={`font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Support Hours</h3>
              <div className="space-y-2 text-sm">
                {[
                  { day: 'Monday - Friday', time: '9 AM - 8 PM IST' },
                  { day: 'Saturday', time: '10 AM - 6 PM IST' },
                  { day: 'Sunday', time: 'Email only' },
                ].map(h => (
                  <div key={h.day} className={`flex justify-between ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    <span>{h.day}</span>
                    <span className="font-medium">{h.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
