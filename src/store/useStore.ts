import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product, User, Order, AppSettings, Coupon } from '../types';
import { mockOrders, mockUsers, defaultSettings, mockCoupons, mockProducts } from '../data/mockData';

interface AppStore {
  // Theme
  darkMode: boolean;
  toggleDarkMode: () => void;

  // Auth
  currentUser: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => { success: boolean; message: string };
  signup: (name: string, email: string, password: string) => { success: boolean; message: string };
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: () => number;
  cartCount: () => number;

  // Orders
  orders: Order[];
  addOrder: (order: Order) => void;

  // Coupon
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string, total: number) => { success: boolean; message: string; discount?: number };
  removeCoupon: () => void;

  // Settings
  settings: AppSettings;
  updateSettings: (settings: Partial<AppSettings>) => void;

  // Admin
  allUsers: User[];
  blockUser: (userId: string) => void;
  unblockUser: (userId: string) => void;
  coupons: Coupon[];
  addCoupon: (coupon: Coupon) => void;
  updateCoupon: (coupon: Coupon) => void;
  deleteCoupon: (id: string) => void;
  
  // Products (admin)
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;

  // Navigation
  activeAdminTab: string;
  setActiveAdminTab: (tab: string) => void;
  
  mobileNavTab: string;
  setMobileNavTab: (tab: string) => void;
}

const useStore = create<AppStore>()(
  persist(
    (set, get) => ({
      // Theme
      darkMode: false,
      toggleDarkMode: () => set(s => ({ darkMode: !s.darkMode })),

      // Auth
      currentUser: null,
      isAuthenticated: false,
      login: (email, password) => {
        const users = [
          { id: '1', name: 'Demo User', email: 'user@ybtdigital.com', password: 'user123', role: 'user' as const, blocked: false, createdAt: '2024-01-15T00:00:00Z' },
          { id: '2', name: 'Admin User', email: 'admin@ybtdigital.com', password: 'admin123', role: 'admin' as const, blocked: false, createdAt: '2023-06-01T00:00:00Z' },
          { id: '3', name: 'Super Admin', email: 'super@ybtdigital.com', password: 'super123', role: 'super_admin' as const, blocked: false, createdAt: '2023-01-01T00:00:00Z' },
        ];
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
          if (user.blocked) return { success: false, message: 'Your account has been blocked.' };
          const { password: _, ...userWithoutPassword } = user;
          set({ currentUser: userWithoutPassword, isAuthenticated: true });
          return { success: true, message: 'Login successful!' };
        }
        return { success: false, message: 'Invalid email or password.' };
      },
      signup: (name, email, password) => {
        if (!name || !email || !password) return { success: false, message: 'All fields are required.' };
        if (password.length < 6) return { success: false, message: 'Password must be at least 6 characters.' };
        const newUser: User = {
          id: Date.now().toString(),
          name,
          email,
          role: 'user',
          blocked: false,
          createdAt: new Date().toISOString()
        };
        set({ currentUser: newUser, isAuthenticated: true });
        return { success: true, message: 'Account created successfully!' };
      },
      logout: () => set({ currentUser: null, isAuthenticated: false, cart: [], appliedCoupon: null }),
      updateProfile: (data) => set(s => ({ currentUser: s.currentUser ? { ...s.currentUser, ...data } : null })),

      // Cart
      cart: [],
      addToCart: (product) => {
        const existing = get().cart.find(item => item.product.id === product.id);
        if (existing) return;
        set(s => ({ cart: [...s.cart, { product, quantity: 1 }] }));
      },
      removeFromCart: (productId) => set(s => ({ cart: s.cart.filter(i => i.product.id !== productId) })),
      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) { get().removeFromCart(productId); return; }
        set(s => ({ cart: s.cart.map(i => i.product.id === productId ? { ...i, quantity } : i) }));
      },
      clearCart: () => set({ cart: [], appliedCoupon: null }),
      cartTotal: () => get().cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
      cartCount: () => get().cart.reduce((sum, item) => sum + item.quantity, 0),

      // Orders
      orders: mockOrders,
      addOrder: (order) => set(s => ({ orders: [order, ...s.orders] })),

      // Coupon
      appliedCoupon: null,
      applyCoupon: (code, total) => {
        const coupons = get().coupons;
        const coupon = coupons.find(c => c.code.toUpperCase() === code.toUpperCase());
        if (!coupon) return { success: false, message: 'Invalid coupon code.' };
        if (!coupon.active) return { success: false, message: 'This coupon is no longer active.' };
        if (new Date(coupon.expiryDate) < new Date()) return { success: false, message: 'This coupon has expired.' };
        if (coupon.usedCount >= coupon.maxUses) return { success: false, message: 'This coupon has reached its usage limit.' };
        if (total < coupon.minOrder) return { success: false, message: `Minimum order of ₹${coupon.minOrder} required.` };
        const discount = coupon.type === 'flat' ? coupon.value : Math.round(total * coupon.value / 100);
        set({ appliedCoupon: coupon });
        return { success: true, message: `Coupon applied! You saved ₹${discount}`, discount };
      },
      removeCoupon: () => set({ appliedCoupon: null }),

      // Settings
      settings: defaultSettings,
      updateSettings: (data) => set(s => ({ settings: { ...s.settings, ...data } })),

      // Admin
      allUsers: mockUsers,
      blockUser: (userId) => set(s => ({ allUsers: s.allUsers.map(u => u.id === userId ? { ...u, blocked: true } : u) })),
      unblockUser: (userId) => set(s => ({ allUsers: s.allUsers.map(u => u.id === userId ? { ...u, blocked: false } : u) })),
      coupons: mockCoupons,
      addCoupon: (coupon) => set(s => ({ coupons: [...s.coupons, coupon] })),
      updateCoupon: (coupon) => set(s => ({ coupons: s.coupons.map(c => c.id === coupon.id ? coupon : c) })),
      deleteCoupon: (id) => set(s => ({ coupons: s.coupons.filter(c => c.id !== id) })),

      products: mockProducts,
      addProduct: (product) => set(s => ({ products: [...s.products, product] })),
      updateProduct: (product) => set(s => ({ products: s.products.map(p => p.id === product.id ? product : p) })),
      deleteProduct: (id) => set(s => ({ products: s.products.filter(p => p.id !== id) })),

      // Navigation
      activeAdminTab: 'dashboard',
      setActiveAdminTab: (tab) => set({ activeAdminTab: tab }),
      mobileNavTab: 'home',
      setMobileNavTab: (tab) => set({ mobileNavTab: tab }),
    }),
    {
      name: 'ybt-digital-store',
      partialize: (state) => ({
        darkMode: state.darkMode,
        cart: state.cart,
        currentUser: state.currentUser,
        isAuthenticated: state.isAuthenticated,
        orders: state.orders,
        settings: state.settings,
        allUsers: state.allUsers,
        coupons: state.coupons,
        products: state.products,
      })
    }
  )
);

export default useStore;
