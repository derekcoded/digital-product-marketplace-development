import { useState } from 'react';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';
import useStore from '../store/useStore';
import { mockFAQs } from '../data/mockData';

interface FAQPageProps {
  onNavigate: (page: string) => void;
}

export default function FAQPage({ onNavigate }: FAQPageProps) {
  const { darkMode } = useStore();
  const [search, setSearch] = useState('');
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', ...Array.from(new Set(mockFAQs.map(f => f.category)))];

  const filtered = mockFAQs.filter(faq => {
    const matchesSearch = !search || faq.question.toLowerCase().includes(search.toLowerCase()) || faq.answer.toLowerCase().includes(search.toLowerCase());
    const matchesCat = activeCategory === 'All' || faq.category === activeCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className={`min-h-screen pt-16 pb-24 md:pb-0 ${darkMode ? 'bg-gray-950 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Hero */}
      <div className={`py-14 px-4 text-center ${darkMode ? 'bg-gray-900' : 'bg-white'} border-b ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
        <h1 className={`text-3xl sm:text-4xl font-black mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Frequently Asked Questions</h1>
        <p className={`mb-8 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Find answers to common questions about YBT Digital</p>
        
        {/* Search */}
        <div className={`max-w-md mx-auto flex items-center gap-3 px-4 py-3 rounded-2xl border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-300'}`}>
          <Search size={18} className={darkMode ? 'text-gray-400' : 'text-gray-400'} />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search questions..."
            className={`flex-1 bg-transparent text-sm outline-none ${darkMode ? 'text-white placeholder-gray-500' : 'text-gray-900 placeholder-gray-400'}`}
          />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Category Filters */}
        <div className="flex gap-2 flex-wrap mb-8">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat
                  ? 'bg-violet-600 text-white'
                  : darkMode ? 'bg-gray-800 text-gray-400 hover:bg-gray-700' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQs */}
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-4xl mb-4">🔍</div>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>No questions found matching "{search}"</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map(faq => (
              <div
                key={faq.id}
                className={`rounded-2xl border overflow-hidden transition-all ${
                  darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
                } ${openFaq === faq.id ? darkMode ? 'border-violet-800' : 'border-violet-200' : ''}`}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                  className={`w-full flex items-center justify-between gap-4 px-6 py-4 text-left`}
                >
                  <div className="flex items-start gap-3">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0 mt-0.5 ${
                      darkMode ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {faq.category}
                    </span>
                    <span className={`font-semibold text-sm leading-snug ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {faq.question}
                    </span>
                  </div>
                  <div className={`flex-shrink-0 ${openFaq === faq.id ? 'text-violet-600' : darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                    {openFaq === faq.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </div>
                </button>
                {openFaq === faq.id && (
                  <div className={`px-6 pb-5 pt-0`}>
                    <div className={`h-px mb-4 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`} />
                    <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Still need help? */}
        <div className={`mt-12 rounded-3xl p-8 text-center ${darkMode ? 'bg-gray-900 border border-gray-800' : 'bg-white border border-gray-200'}`}>
          <div className="text-4xl mb-4">💬</div>
          <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Still have questions?</h3>
          <p className={`mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Can't find the answer you're looking for? Our support team is here to help.</p>
          <button
            onClick={() => onNavigate('support')}
            className="px-8 py-3.5 bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-bold transition-colors shadow-lg shadow-violet-500/25"
          >
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
}
