import { Star, Download, ShoppingCart, ExternalLink, ArrowLeft, Package, Clock, FileType, Zap, Shield, Check } from 'lucide-react';
import useStore from '../store/useStore';
import ProductCard from '../components/shared/ProductCard';
import toast from 'react-hot-toast';

interface ProductDetailPageProps {
  onNavigate: (page: string, params?: Record<string, string>) => void;
  productId: string;
}

export default function ProductDetailPage({ onNavigate, productId }: ProductDetailPageProps) {
  const { darkMode, products, addToCart, cart } = useStore();
  const product = products.find(p => p.id === productId);
  const inCart = cart.some(item => item.product.id === productId);
  const relatedProducts = products.filter(p => p.id !== productId && p.category === product?.category).slice(0, 4);

  if (!product) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-950 text-white' : 'bg-gray-50 text-gray-900'}`}>
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-bold mb-4">Product not found</h2>
          <button onClick={() => onNavigate('products')} className="px-6 py-3 bg-violet-600 text-white rounded-xl font-medium">
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!inCart) {
      addToCart(product);
      toast.success(`${product.title} added to cart!`, { icon: '🛒' });
    } else {
      onNavigate('cart');
    }
  };

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  const specs = [
    { icon: Package, label: 'File Size', value: product.fileSize },
    { icon: FileType, label: 'File Type', value: product.fileType },
    { icon: Zap, label: 'Version', value: product.version },
    { icon: Clock, label: 'Last Updated', value: new Date(product.lastUpdated).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' }) },
  ];

  return (
    <div className={`min-h-screen pt-16 pb-24 md:pb-0 ${darkMode ? 'bg-gray-950 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6">
          <button
            onClick={() => onNavigate('products')}
            className={`flex items-center gap-1 text-sm font-medium hover:text-violet-600 transition-colors ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}
          >
            <ArrowLeft size={16} /> Products
          </button>
          <span className={darkMode ? 'text-gray-600' : 'text-gray-300'}>/</span>
          <span className="text-sm text-violet-600 font-medium">{product.category}</span>
          <span className={darkMode ? 'text-gray-600' : 'text-gray-300'}>/</span>
          <span className={`text-sm truncate ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{product.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Images + Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Main Image */}
            <div className={`rounded-2xl overflow-hidden border ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
              <img src={product.image} alt={product.title} className="w-full aspect-video object-cover" />
            </div>

            {/* Screenshots */}
            {product.screenshots.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-1">
                {product.screenshots.map((s, i) => (
                  <img
                    key={i}
                    src={s}
                    alt={`Screenshot ${i + 1}`}
                    className={`w-32 h-20 object-cover rounded-xl flex-shrink-0 border-2 transition-colors cursor-pointer ${i === 0 ? 'border-violet-600' : darkMode ? 'border-gray-700 hover:border-violet-500' : 'border-gray-200 hover:border-violet-400'}`}
                  />
                ))}
              </div>
            )}

            {/* Description */}
            <div className={`rounded-2xl border p-6 ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
              <h2 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>About this product</h2>
              <p className={`text-sm leading-relaxed mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{product.longDescription}</p>
              
              <h3 className={`font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>What's included</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  'Full source files',
                  'Documentation',
                  'Commercial license',
                  'Free updates',
                  'Priority support',
                  'Lifetime access',
                ].map(item => (
                  <div key={item} className="flex items-center gap-2 text-sm">
                    <div className="w-5 h-5 bg-emerald-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check size={11} className="text-emerald-500" />
                    </div>
                    <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div>
              <h3 className={`font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Tags</h3>
              <div className="flex flex-wrap gap-2">
                {product.tags.map(tag => (
                  <span key={tag} className={`px-3 py-1 rounded-full text-xs font-medium ${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Purchase Card */}
          <div className="lg:col-span-1">
            <div className={`sticky top-20 rounded-2xl border overflow-hidden ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
              <div className="p-6">
                {/* Category badge */}
                <span className="inline-block px-3 py-1 bg-violet-600/10 text-violet-600 text-xs font-semibold rounded-full mb-3">
                  {product.category}
                </span>

                <h1 className={`text-xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{product.title}</h1>
                <p className={`text-sm leading-relaxed mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{product.description}</p>

                {/* Rating */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
                      />
                    ))}
                  </div>
                  <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{product.rating}</span>
                  <span className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>({product.reviews} reviews)</span>
                </div>

                {/* Price */}
                <div className="flex items-end gap-3 mb-6">
                  <div className={`text-3xl font-black ${darkMode ? 'text-white' : 'text-gray-900'}`}>₹{product.price.toLocaleString()}</div>
                  {product.originalPrice && (
                    <>
                      <div className={`text-lg line-through ${darkMode ? 'text-gray-600' : 'text-gray-400'}`}>₹{product.originalPrice.toLocaleString()}</div>
                      <div className="px-2 py-0.5 bg-emerald-500 text-white text-xs font-bold rounded-lg">{discount}% OFF</div>
                    </>
                  )}
                </div>

                {/* CTA Buttons */}
                <div className="space-y-3 mb-6">
                  <button
                    onClick={handleAddToCart}
                    className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm transition-all ${
                      inCart
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                        : 'bg-violet-600 hover:bg-violet-700 text-white shadow-lg shadow-violet-500/30'
                    }`}
                  >
                    <ShoppingCart size={18} />
                    {inCart ? 'Go to Cart' : 'Add to Cart'}
                  </button>
                  <button
                    onClick={() => { if (!inCart) addToCart(product); onNavigate('checkout'); }}
                    className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm border transition-all ${
                      darkMode ? 'border-gray-700 text-gray-300 hover:bg-gray-800' : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Buy Now
                  </button>
                  {product.demoUrl && (
                    <button className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-medium text-sm transition-colors text-violet-600 hover:text-violet-700`}>
                      <ExternalLink size={16} /> View Demo
                    </button>
                  )}
                </div>

                {/* Specs */}
                <div className={`rounded-xl p-4 space-y-3 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                  {specs.map(spec => {
                    const Icon = spec.icon;
                    return (
                      <div key={spec.label} className="flex items-center justify-between text-sm">
                        <div className={`flex items-center gap-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          <Icon size={14} />
                          <span>{spec.label}</span>
                        </div>
                        <span className={`font-medium ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>{spec.value}</span>
                      </div>
                    );
                  })}
                  <div className="flex items-center justify-between text-sm">
                    <div className={`flex items-center gap-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      <Download size={14} />
                      <span>Downloads</span>
                    </div>
                    <span className={`font-medium ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>{product.downloads.toLocaleString()}</span>
                  </div>
                </div>

                {/* Trust badges */}
                <div className={`mt-4 pt-4 border-t ${darkMode ? 'border-gray-800' : 'border-gray-100'}`}>
                  {[
                    { icon: Shield, text: 'Secure payment' },
                    { icon: Download, text: 'Instant download' },
                    { icon: Check, text: '7-day money back' },
                  ].map(item => {
                    const Icon = item.icon;
                    return (
                      <div key={item.text} className={`flex items-center gap-2 text-xs py-1.5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        <Icon size={13} className="text-emerald-500" />
                        {item.text}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} onNavigate={onNavigate} darkMode={darkMode} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
