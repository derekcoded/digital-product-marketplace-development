export interface Product {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  price: number;
  originalPrice?: number;
  category: string;
  tags: string[];
  image: string;
  screenshots: string[];
  rating: number;
  reviews: number;
  downloads: number;
  featured: boolean;
  status: 'active' | 'inactive';
  fileSize: string;
  fileType: string;
  version: string;
  lastUpdated: string;
  demoUrl?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin' | 'super_admin';
  avatar?: string;
  createdAt: string;
  blocked: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  tax: number;
  discount: number;
  couponCode?: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  paymentMethod: string;
  transactionId: string;
  createdAt: string;
  downloadExpiry?: string;
}

export interface Coupon {
  id: string;
  code: string;
  type: 'flat' | 'percentage';
  value: number;
  minOrder: number;
  maxUses: number;
  usedCount: number;
  expiryDate: string;
  active: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  comment: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface SupportTicket {
  id: string;
  userId: string;
  userName: string;
  subject: string;
  message: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  replies: TicketReply[];
}

export interface TicketReply {
  id: string;
  message: string;
  isAdmin: boolean;
  createdAt: string;
}

export type PaymentGateway = 'razorpay' | 'stripe' | 'paypal';

export interface AppSettings {
  siteName: string;
  siteTagline: string;
  logo: string;
  footerText: string;
  currency: string;
  currencySymbol: string;
  taxRate: number;
  taxType: 'GST' | 'VAT' | 'None';
  activeGateway: PaymentGateway;
  gateways: {
    razorpay: { keyId: string; keySecret: string };
    stripe: { publishableKey: string; secretKey: string };
    paypal: { clientId: string; clientSecret: string };
  };
  emailNotifications: {
    orderConfirmation: boolean;
    failedPayment: boolean;
    refund: boolean;
  };
}
