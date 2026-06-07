import { useState, useMemo } from 'react';
import { Search, X, SlidersHorizontal, Grid3X3, List } from 'lucide-react';
import useStore from '../store/useStore';
import ProductCard from '../components/shared/ProductCard';
import { CATEGORIES } from '../data/mockData';

interface ProductsPageProps {
  onNavigate: (page: string, params?: Record<string, string>) => void;
}

export default function ProductsPage({ onNavigate }: ProductsPageProps) {
  const { darkMode, products } = useStore();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('popular');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filtered = useMemo(() => {
    let result = products.filter(p => p.status === 'active');

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    if (category !== 'All') {
      result = result.filter(p => p.category === category);
    }

    if (minPrice) result = result.filter(p => p.price >= parseInt(minPrice));
    if (maxPrice) result = result.filter(p => p.price <= parseInt(maxPrice));

    switch (sort) {
      case 'popular': result = [...result].sort((a, b) => b.downloads - a.downloads); break;
      case 'rating': result = [...result].sort((a, b) => b.rating - a.rating); break;
      case 'price-low': result = [...result].sort((a, b) => a.price - b.price); break;
      case 'price-high': result = [...result].sort((a, b) => b.price - a.price); break;
      case 'newest': result = [...result].sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()); break;
    }

    return result;
  }, [products, search, category, sort, minPrice, maxPrice]);

  const clearFilters = () => {
    setSearch('');
    setCategory('All');
    setMinPrice('');
    setMaxPrice('');
    setSort('popular');
  };

  const hasFilters = search || category !== 'All' || minPrice || maxPrice;

  return (
    <div className={`min-h-screen pt-16 pb-24 md:pb-0 ${darkMode ? 'bg-gray-950 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Header */}
      <div className={`border-b ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div>
              <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Digital Products</h1>
              <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{filtered.length} products found</p>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              {/* Search */}
              <div className={`flex items-center gap-2 flex-1 sm:flex-none sm:w-72 px-4 py-2.5 rounded-xl border ${
                darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-300'
              }`}>
                <Search size={16} className={darkMode ? 'text-gray-400' : 'text-gray-400'} />
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search products..."
                  className={`flex-1 text-sm bg-transparent outline-none ${darkMode ? 'text-white placeholder-gray-500' : 'text-gray-900 placeholder-gray-400'}`}
                />
                {search && <button onClick={() => setSearch('')}><X size={14} /></button>}
              </div>
              {/* Filter Toggle (mobile) */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-sm font-medium transition-colors lg:hidden ${
                  darkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-gray-50 border-gray-300 text-gray-700'
                }`}
              >
                <SlidersHorizontal size={16} />
                Filters
              </button>
              {/* View Mode */}
              <div className={`hidden sm:flex items-center border rounded-xl overflow-hidden ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2.5 transition-colors ${viewMode === 'grid' ? 'bg-violet-600 text-white' : darkMode ? 'text-gray-400 hover:bg-gray-800' : 'text-gray-500 hover:bg-gray-50'}`}
                >
                  <Grid3X3 size={16} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2.5 transition-colors ${viewMode === 'list' ? 'bg-violet-600 text-white' : darkMode ? 'text-gray-400 hover:bg-gray-800' : 'text-gray-500 hover:bg-gray-50'}`}
                >
                  <List size={16} />
                </button>
              </div>
            </div>
          </div>
          
          {/* Categories */}
          <div className="flex gap-2 mt-4 overflow-x-auto pb-1 scrollbar-none">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  category === cat
                    ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/20'
                    : darkMode ? 'bg-gray-800 text-gray-400 hover:bg-gray-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6">
          {/* Sidebar Filters - Desktop */}
          <div className={`hidden lg:block w-64 flex-shrink-0`}>
            <div className={`rounded-2xl border p-5 sticky top-20 ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
              <div className="flex items-center justify-between mb-5">
                <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Filters</h3>
                {hasFilters && (
                  <button onClick={clearFilters} className="text-xs text-violet-600 font-medium">Clear all</button>
                )}
              </div>

              {/* Sort */}
              <div className="mb-5">
                <label className={`text-sm font-medium mb-2 block ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Sort by</label>
                <select
                  value={sort}
                  onChange={e => setSort(e.target.value)}
                  className={`w-full px-3 py-2 rounded-xl text-sm border ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'}`}
                >
                  <option value="popular">Most Popular</option>
                  <option value="rating">Highest Rated</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest First</option>
                </select>
              </div>

              {/* Price Range */}
              <div className="mb-5">
                <label className={`text-sm font-medium mb-2 block ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Price Range (₹)</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={minPrice}
                    onChange={e => setMinPrice(e.target.value)}
                    className={`w-full px-3 py-2 rounded-xl text-sm border ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'}`}
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={maxPrice}
                    onChange={e => setMaxPrice(e.target.value)}
                    className={`w-full px-3 py-2 rounded-xl text-sm border ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'}`}
                  />
                </div>
              </div>

              {/* Quick Price Filters */}
              <div>
                <label className={`text-sm font-medium mb-2 block ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Quick Select</label>
                <div className="space-y-1.5">
                  {[['Under ₹1,000', '0', '1000'], ['₹1,000 - ₹2,000', '1000', '2000'], ['₹2,000 - ₹5,000', '2000', '5000'], ['Above ₹5,000', '5000', '']].map(([label, min, max]) => (
                    <button
                      key={label}
                      onClick={() => { setMinPrice(min); setMaxPrice(max); }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        minPrice === min && maxPrice === max
                          ? 'bg-violet-600 text-white'
                          : darkMode ? 'text-gray-400 hover:bg-gray-800' : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Filters */}
          {showFilters && (
            <div className={`lg:hidden fixed inset-0 z-50 ${darkMode ? 'bg-black/60' : 'bg-black/40'}`} onClick={() => setShowFilters(false)}>
              <div
                className={`absolute bottom-0 left-0 right-0 rounded-t-3xl p-6 max-h-[80vh] overflow-y-auto ${darkMode ? 'bg-gray-900' : 'bg-white'}`}
                onClick={e => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>Filters</h3>
                  <button onClick={() => setShowFilters(false)}><X size={20} /></button>
                </div>
                <div className="space-y-5">
                  <div>
                    <label className={`text-sm font-medium mb-2 block ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Sort by</label>
                    <select value={sort} onChange={e => setSort(e.target.value)} className={`w-full px-3 py-2 rounded-xl text-sm border ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 border-gray-300'}`}>
                      <option value="popular">Most Popular</option>
                      <option value="rating">Highest Rated</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="newest">Newest First</option>
                    </select>
                  </div>
                  <div>
                    <label className={`text-sm font-medium mb-2 block ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Price Range (₹)</label>
                    <div className="flex gap-2">
                      <input type="number" placeholder="Min" value={minPrice} onChange={e => setMinPrice(e.target.value)} className={`w-full px-3 py-2 rounded-xl text-sm border ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 border-gray-300'}`} />
                      <input type="number" placeholder="Max" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} className={`w-full px-3 py-2 rounded-xl text-sm border ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 border-gray-300'}`} />
                    </div>
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button onClick={clearFilters} className={`flex-1 py-3 rounded-xl border font-semibold text-sm ${darkMode ? 'border-gray-700 text-gray-300' : 'border-gray-300 text-gray-700'}`}>Clear</button>
                    <button onClick={() => setShowFilters(false)} className="flex-1 py-3 rounded-xl bg-violet-600 text-white font-semibold text-sm">Apply</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Products Grid */}
          <div className="flex-1">
            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>No products found</h3>
                <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Try adjusting your filters or search query.</p>
                <button onClick={clearFilters} className="px-4 py-2 bg-violet-600 text-white rounded-xl text-sm font-medium">Clear Filters</button>
              </div>
            ) : (
              <div className={viewMode === 'grid'
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                : 'flex flex-col gap-4'
              }>
                {filtered.map(product => (
                  <ProductCard key={product.id} product={product} onNavigate={onNavigate} darkMode={darkMode} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
