import { ArrowRight, Star, Download, Shield, Zap, Headphones, Check, ChevronDown, ChevronUp, Quote } from 'lucide-react';
import { useState } from 'react';
import useStore from '../store/useStore';
import ProductCard from '../components/shared/ProductCard';
import { mockTestimonials, mockFAQs } from '../data/mockData';

interface HomePageProps {
  onNavigate: (page: string, params?: Record<string, string>) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const { darkMode, products } = useStore();
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const featuredProducts = products.filter(p => p.featured);

  const stats = [
    { label: 'Products', value: '500+' },
    { label: 'Customers', value: '50K+' },
    { label: 'Downloads', value: '2M+' },
    { label: 'Rating', value: '4.9★' },
  ];

  const features = [
    { icon: Shield, title: 'Secure Downloads', desc: 'Military-grade encryption and expiry links keep your purchases safe.' },
    { icon: Zap, title: 'Instant Access', desc: 'Download immediately after payment with no waiting time.' },
    { icon: Headphones, title: '24/7 Support', desc: 'Our expert team is always ready to help you succeed.' },
    { icon: Download, title: 'Free Updates', desc: 'All future updates included free with your purchase.' },
  ];

  const categories = [
    { name: 'UI Kits', emoji: '🎨', count: 45 },
    { name: 'Templates', emoji: '📄', count: 120 },
    { name: 'Themes', emoji: '🖥️', count: 89 },
    { name: 'Icons', emoji: '✨', count: 230 },
    { name: 'Plugins', emoji: '🔌', count: 67 },
    { name: 'Courses', emoji: '🎓', count: 34 },
    { name: 'eBooks', emoji: '📚', count: 78 },
    { name: 'Scripts', emoji: '⚡', count: 156 },
  ];

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-950 text-white' : 'bg-gray-50 text-gray-900'}`}>
      
      {/* HERO SECTION */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/hero-bg.jpg" alt="" className="w-full h-full object-cover opacity-20" />
          <div className={`absolute inset-0 ${darkMode ? 'bg-gradient-to-b from-gray-950/80 via-gray-950/60 to-gray-950' : 'bg-gradient-to-b from-white/80 via-white/60 to-gray-50'}`} />
        </div>
        
        {/* Animated bg blobs */}
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-violet-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-1/4 w-72 h-72 bg-indigo-600/20 rounded-full blur-3xl animate-pulse delay-1000" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-600/10 border border-violet-600/20 text-violet-600 text-sm font-medium mb-8">
            <span className="w-2 h-2 bg-violet-500 rounded-full animate-pulse" />
            Premium Digital Products Marketplace
          </div>
          
          <h1 className={`text-4xl sm:text-5xl lg:text-7xl font-black mb-6 leading-tight ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Your Digital
            <span className="block bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Product Store
            </span>
          </h1>
          
          <p className={`text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Discover premium UI kits, templates, themes, plugins, and digital tools crafted by expert designers and developers.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button
              onClick={() => onNavigate('products')}
              className="flex items-center justify-center gap-2 px-8 py-4 bg-violet-600 hover:bg-violet-700 text-white rounded-2xl font-semibold text-lg transition-all shadow-xl shadow-violet-500/30 hover:shadow-violet-500/50 hover:-translate-y-0.5"
            >
              Explore Products <ArrowRight size={20} />
            </button>
            <button
              onClick={() => onNavigate('signup')}
              className={`flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-semibold text-lg transition-all border ${
                darkMode ? 'border-gray-700 text-gray-300 hover:bg-gray-800' : 'border-gray-300 text-gray-700 hover:bg-gray-100'
              }`}
            >
              Get Started Free
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl mx-auto">
            {stats.map((stat) => (
              <div key={stat.label} className={`rounded-2xl p-4 ${darkMode ? 'bg-gray-800/60' : 'bg-white/60'} backdrop-blur-sm border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className={`text-2xl font-black ${darkMode ? 'text-white' : 'text-gray-900'}`}>{stat.value}</div>
                <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className={`text-3xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Browse Categories</h2>
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Find exactly what you need</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {categories.map(cat => (
            <button
              key={cat.name}
              onClick={() => onNavigate('products')}
              className={`flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all hover:-translate-y-1 hover:shadow-lg ${
                darkMode
                  ? 'bg-gray-800 border-gray-700 hover:border-violet-500/50 hover:shadow-violet-500/10'
                  : 'bg-white border-gray-200 hover:border-violet-200 hover:shadow-violet-100'
              }`}
            >
              <span className="text-2xl">{cat.emoji}</span>
              <span className={`text-xs font-semibold text-center ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{cat.name}</span>
              <span className="text-xs text-violet-500 font-medium">{cat.count}</span>
            </button>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className={`py-16 ${darkMode ? 'bg-gray-900/50' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Featured Products</h2>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Handpicked by our team</p>
            </div>
            <button
              onClick={() => onNavigate('products')}
              className="flex items-center gap-2 text-violet-600 hover:text-violet-700 font-semibold text-sm transition-colors"
            >
              View All <ArrowRight size={16} />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} onNavigate={onNavigate} darkMode={darkMode} />
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className={`text-3xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Why Choose YBT Digital?</h2>
          <p className={`max-w-xl mx-auto ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Everything you need to create amazing digital products</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map(f => {
            const Icon = f.icon;
            return (
              <div key={f.title} className={`p-6 rounded-2xl border transition-all hover:-translate-y-1 ${
                darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              }`}>
                <div className="w-12 h-12 bg-violet-600/10 rounded-xl flex items-center justify-center mb-4">
                  <Icon size={24} className="text-violet-600" />
                </div>
                <h3 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{f.title}</h3>
                <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{f.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className={`py-16 ${darkMode ? 'bg-gray-900/50' : 'bg-gradient-to-br from-violet-50 to-indigo-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className={`text-3xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>What Our Customers Say</h2>
            <div className="flex items-center justify-center gap-1">
              {[1,2,3,4,5].map(i => <Star key={i} size={20} className="text-yellow-400 fill-yellow-400" />)}
              <span className={`ml-2 font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>4.9/5 from 5,000+ reviews</span>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockTestimonials.map(t => (
              <div key={t.id} className={`p-6 rounded-2xl border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <Quote size={24} className="text-violet-400 mb-4" />
                <p className={`text-sm leading-relaxed mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>"{t.comment}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-violet-100 rounded-full flex items-center justify-center text-xl">
                    {t.avatar}
                  </div>
                  <div>
                    <p className={`font-semibold text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>{t.name}</p>
                    <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{t.role}</p>
                  </div>
                  <div className="ml-auto flex items-center gap-0.5">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} size={12} className="text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className={`text-3xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Frequently Asked Questions</h2>
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Got questions? We've got answers.</p>
        </div>
        <div className="space-y-3">
          {mockFAQs.slice(0, 6).map(faq => (
            <div
              key={faq.id}
              className={`rounded-2xl border overflow-hidden ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
            >
              <button
                onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                className={`w-full flex items-center justify-between px-6 py-4 text-left font-semibold text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}
              >
                {faq.question}
                {openFaq === faq.id ? <ChevronUp size={16} className="text-violet-600 flex-shrink-0" /> : <ChevronDown size={16} className="flex-shrink-0" />}
              </button>
              {openFaq === faq.id && (
                <div className={`px-6 pb-4 text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <button onClick={() => onNavigate('faq')} className="text-violet-600 hover:text-violet-700 font-semibold text-sm flex items-center gap-1 mx-auto">
            View all FAQs <ArrowRight size={14} />
          </button>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden p-10 text-center bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-600">
            <div className="absolute inset-0 bg-[url('/images/hero-bg.jpg')] bg-cover opacity-10" />
            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">Ready to Create Something Amazing?</h2>
              <p className="text-violet-200 text-lg mb-8 max-w-xl mx-auto">Join 50,000+ creators and developers using YBT Digital products.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => onNavigate('products')}
                  className="px-8 py-4 bg-white text-violet-600 hover:bg-gray-50 rounded-2xl font-bold text-lg transition-all shadow-xl hover:-translate-y-0.5"
                >
                  Browse Products
                </button>
                <button
                  onClick={() => onNavigate('signup')}
                  className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-2xl font-bold text-lg transition-all border border-white/20"
                >
                  Create Free Account
                </button>
              </div>
              <div className="mt-8 flex items-center justify-center gap-6 flex-wrap">
                {['No subscription needed', 'Instant downloads', '7-day money back'].map(item => (
                  <div key={item} className="flex items-center gap-2 text-violet-200 text-sm">
                    <Check size={14} className="text-green-400" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className={`border-t py-12 px-4 sm:px-6 lg:px-8 ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-10">
            <div className="col-span-2 sm:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-black text-xs">YBT</span>
                </div>
                <span className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>YBT Digital</span>
              </div>
              <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Premium digital products for creators and developers worldwide.
              </p>
            </div>
            {[
              { title: 'Products', links: ['UI Kits', 'Templates', 'Themes', 'Icons', 'Plugins'] },
              { title: 'Company', links: ['About', 'Blog', 'Careers', 'Press'] },
              { title: 'Support', links: ['Help Center', 'Contact', 'Privacy', 'Terms'] },
            ].map(col => (
              <div key={col.title}>
                <h4 className={`font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map(link => (
                    <li key={link}>
                      <button className={`text-sm hover:text-violet-600 transition-colors ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {link}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className={`pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4 ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
            <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>© 2025 YBT Digital. All rights reserved.</p>
            <div className="flex items-center gap-4">
              {['Twitter', 'GitHub', 'LinkedIn', 'Discord'].map(social => (
                <button key={social} className={`text-sm hover:text-violet-600 transition-colors ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                  {social}
                </button>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
