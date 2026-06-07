import { Star, ShoppingCart, Download, Heart } from 'lucide-react';
import { useState } from 'react';
import useStore from '../../store/useStore';
import { Product } from '../../types';
import toast from 'react-hot-toast';

interface ProductCardProps {
  product: Product;
  onNavigate: (page: string, params?: Record<string, string>) => void;
  darkMode: boolean;
}

export default function ProductCard({ product, onNavigate, darkMode }: ProductCardProps) {
  const { addToCart, cart } = useStore();
  const [liked, setLiked] = useState(false);
  const inCart = cart.some(item => item.product.id === product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!inCart) {
      addToCart(product);
      toast.success(`${product.title} added to cart!`, {
        icon: '🛒',
        style: { borderRadius: '12px', fontSize: '14px' }
      });
    } else {
      onNavigate('cart');
    }
  };

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  return (
    <div
      className={`group relative flex flex-col rounded-2xl overflow-hidden border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer ${
        darkMode
          ? 'bg-gray-800 border-gray-700 hover:border-violet-500/50 hover:shadow-violet-500/10'
          : 'bg-white border-gray-200 hover:border-violet-200 hover:shadow-violet-100'
      }`}
      onClick={() => onNavigate('product', { id: product.id })}
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-video">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex gap-1">
          {product.featured && (
            <span className="px-2 py-0.5 bg-violet-600 text-white text-xs rounded-full font-semibold">Featured</span>
          )}
          {discount > 0 && (
            <span className="px-2 py-0.5 bg-emerald-500 text-white text-xs rounded-full font-semibold">{discount}% OFF</span>
          )}
        </div>

        {/* Wishlist */}
        <button
          onClick={(e) => { e.stopPropagation(); setLiked(!liked); }}
          className={`absolute top-2 right-2 p-1.5 rounded-full transition-all ${
            liked ? 'bg-red-500 text-white' : 'bg-white/80 text-gray-600 hover:bg-white'
          }`}
        >
          <Heart size={14} fill={liked ? 'currentColor' : 'none'} />
        </button>

        {/* Category */}
        <div className="absolute bottom-2 left-2">
          <span className={`px-2 py-0.5 text-xs rounded-full font-medium backdrop-blur-sm ${
            darkMode ? 'bg-gray-900/70 text-gray-300' : 'bg-white/70 text-gray-700'
          }`}>
            {product.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4">
        <h3 className={`font-semibold text-sm leading-snug mb-1 line-clamp-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          {product.title}
        </h3>
        <p className={`text-xs leading-relaxed mb-3 line-clamp-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          {product.description}
        </p>

        {/* Stats */}
        <div className={`flex items-center gap-3 text-xs mb-3 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          <div className="flex items-center gap-1">
            <Star size={11} className="text-yellow-400 fill-yellow-400" />
            <span className="font-medium">{product.rating}</span>
            <span>({product.reviews})</span>
          </div>
          <div className="flex items-center gap-1">
            <Download size={11} />
            <span>{product.downloads.toLocaleString()}</span>
          </div>
        </div>

        {/* Price & Action */}
        <div className="mt-auto flex items-center justify-between gap-2">
          <div>
            <div className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              ₹{product.price.toLocaleString()}
            </div>
            {product.originalPrice && (
              <div className={`text-xs line-through ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                ₹{product.originalPrice.toLocaleString()}
              </div>
            )}
          </div>
          <button
            onClick={handleAddToCart}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
              inCart
                ? 'bg-emerald-500 hover:bg-emerald-600 text-white'
                : 'bg-violet-600 hover:bg-violet-700 text-white shadow-lg shadow-violet-500/20'
            }`}
          >
            <ShoppingCart size={13} />
            {inCart ? 'In Cart' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  );
}
