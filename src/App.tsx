import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import useStore from './store/useStore';
import Navbar from './components/shared/Navbar';
import BottomNav from './components/shared/BottomNav';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrdersPage from './pages/OrdersPage';
import AuthPages from './pages/AuthPages';
import ProfilePage from './pages/ProfilePage';
import SupportPage from './pages/SupportPage';
import FAQPage from './pages/FAQPage';
import AdminPanel from './pages/AdminPanel';

type PageType = 
  | 'home' | 'products' | 'product' | 'cart' | 'checkout' | 'orders'
  | 'login' | 'signup' | 'forgot-password' | 'profile'
  | 'support' | 'faq' | 'admin';

export default function App() {
  const { darkMode } = useStore();
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [pageParams, setPageParams] = useState<Record<string, string>>({});

  const navigate = (page: string, params: Record<string, string> = {}) => {
    setCurrentPage(page as PageType);
    setPageParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Detect dark mode and apply to html element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const hideNavPages = ['admin'];
  const showNav = !hideNavPages.includes(currentPage);

  return (
    <div className={`min-h-screen font-sans ${darkMode ? 'bg-gray-950 text-white' : 'bg-gray-50 text-gray-900'}`}
      style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}
    >
      {showNav && <Navbar onNavigate={navigate} currentPage={currentPage} />}
      {showNav && <BottomNav onNavigate={navigate} currentPage={currentPage} />}

      <main>
        {currentPage === 'home' && <HomePage onNavigate={navigate} />}
        {currentPage === 'products' && <ProductsPage onNavigate={navigate} />}
        {currentPage === 'product' && <ProductDetailPage onNavigate={navigate} productId={pageParams.id || ''} />}
        {currentPage === 'cart' && <CartPage onNavigate={navigate} />}
        {currentPage === 'checkout' && <CheckoutPage onNavigate={navigate} />}
        {currentPage === 'orders' && <OrdersPage onNavigate={navigate} />}
        {currentPage === 'login' && <AuthPages page="login" onNavigate={navigate} />}
        {currentPage === 'signup' && <AuthPages page="signup" onNavigate={navigate} />}
        {currentPage === 'forgot-password' && <AuthPages page="forgot-password" onNavigate={navigate} />}
        {currentPage === 'profile' && <ProfilePage onNavigate={navigate} />}
        {currentPage === 'support' && <SupportPage onNavigate={navigate} />}
        {currentPage === 'faq' && <FAQPage onNavigate={navigate} />}
        {currentPage === 'admin' && <AdminPanel onNavigate={navigate} />}
      </main>

      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: '12px',
            padding: '12px 16px',
            fontSize: '14px',
            fontFamily: "'Inter', sans-serif",
            background: darkMode ? '#1f2937' : '#ffffff',
            color: darkMode ? '#f9fafb' : '#111827',
            border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
            boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
          },
          success: {
            iconTheme: { primary: '#8b5cf6', secondary: '#fff' }
          },
          error: {
            iconTheme: { primary: '#ef4444', secondary: '#fff' }
          }
        }}
      />
    </div>
  );
}
