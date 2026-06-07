import { Product, Testimonial, FAQ, Order, Coupon, SupportTicket, User, AppSettings } from '../types';

export const CATEGORIES = ['All', 'UI Kits', 'Templates', 'Themes', 'Icons', 'Plugins', 'Scripts', 'eBooks', 'Courses'];

export const mockProducts: Product[] = [
  {
    id: '1',
    title: 'ProDash Admin UI Kit',
    description: 'Complete admin dashboard UI kit with 200+ components and dark/light mode.',
    longDescription: 'ProDash is the most comprehensive admin dashboard UI kit available. Built with modern design principles, it includes over 200 production-ready components, fully responsive layouts, dark and light mode variants, and a complete design system. Perfect for SaaS applications, admin panels, and data-rich web applications.',
    price: 2999,
    originalPrice: 5999,
    category: 'UI Kits',
    tags: ['dashboard', 'admin', 'ui kit', 'react', 'figma'],
    image: '/images/product-1.jpg',
    screenshots: ['/images/product-1.jpg', '/images/product-2.jpg'],
    rating: 4.8,
    reviews: 324,
    downloads: 1240,
    featured: true,
    status: 'active',
    fileSize: '45 MB',
    fileType: 'Figma + React',
    version: '3.2.1',
    lastUpdated: '2024-12-01',
    demoUrl: '#'
  },
  {
    id: '2',
    title: 'MobileFirst UI Components',
    description: 'Native-style mobile UI component library for React Native and Flutter.',
    longDescription: 'MobileFirst is a premium UI component library designed specifically for mobile app development. Includes 150+ components for React Native and Flutter with full customization support, gesture handling, animations, and platform-specific designs for iOS and Android.',
    price: 1999,
    originalPrice: 3999,
    category: 'UI Kits',
    tags: ['mobile', 'react native', 'flutter', 'components'],
    image: '/images/product-2.jpg',
    screenshots: ['/images/product-2.jpg', '/images/product-1.jpg'],
    rating: 4.6,
    reviews: 218,
    downloads: 890,
    featured: true,
    status: 'active',
    fileSize: '32 MB',
    fileType: 'React Native + Flutter',
    version: '2.1.0',
    lastUpdated: '2024-11-15',
    demoUrl: '#'
  },
  {
    id: '3',
    title: 'BusinessPro WordPress Theme',
    description: 'Premium multipurpose WordPress theme for businesses and agencies.',
    longDescription: 'BusinessPro is a versatile, SEO-optimized WordPress theme built for modern businesses. Features include WooCommerce integration, 30+ demo sites, drag-and-drop page builder compatibility, custom post types, and comprehensive documentation with video tutorials.',
    price: 3499,
    originalPrice: 6999,
    category: 'Themes',
    tags: ['wordpress', 'business', 'multipurpose', 'woocommerce'],
    image: '/images/product-3.jpg',
    screenshots: ['/images/product-3.jpg', '/images/product-4.jpg'],
    rating: 4.9,
    reviews: 512,
    downloads: 2100,
    featured: true,
    status: 'active',
    fileSize: '28 MB',
    fileType: 'WordPress Theme',
    version: '5.0.2',
    lastUpdated: '2024-12-10',
    demoUrl: '#'
  },
  {
    id: '4',
    title: 'SocialBoost Marketing Pack',
    description: '500+ social media templates for Instagram, Facebook, Twitter & LinkedIn.',
    longDescription: 'SocialBoost includes over 500 professionally designed social media templates for all major platforms. Available in Photoshop, Illustrator, Canva, and Figma formats. Includes post templates, story templates, cover photos, and animated graphics.',
    price: 1499,
    originalPrice: 2999,
    category: 'Templates',
    tags: ['social media', 'marketing', 'templates', 'canva', 'figma'],
    image: '/images/product-4.jpg',
    screenshots: ['/images/product-4.jpg', '/images/product-3.jpg'],
    rating: 4.7,
    reviews: 189,
    downloads: 3420,
    featured: true,
    status: 'active',
    fileSize: '120 MB',
    fileType: 'PSD + Canva + Figma',
    version: '2.0.0',
    lastUpdated: '2024-10-20',
    demoUrl: '#'
  },
  {
    id: '5',
    title: 'IconVault Premium Icons',
    description: '10,000+ premium SVG icons in multiple styles and categories.',
    longDescription: 'IconVault is the most comprehensive icon library for designers and developers. Includes 10,000+ hand-crafted SVG icons in outline, filled, duotone, and colored styles. Available in multiple formats including SVG, PNG, Webfont, and React components.',
    price: 999,
    originalPrice: 1999,
    category: 'Icons',
    tags: ['icons', 'svg', 'design', 'ui', 'vector'],
    image: '/images/product-1.jpg',
    screenshots: ['/images/product-1.jpg'],
    rating: 4.5,
    reviews: 156,
    downloads: 5600,
    featured: false,
    status: 'active',
    fileSize: '85 MB',
    fileType: 'SVG + PNG + Webfont',
    version: '4.1.0',
    lastUpdated: '2024-09-15',
  },
  {
    id: '6',
    title: 'AutoSEO WordPress Plugin',
    description: 'Advanced SEO automation plugin for WordPress with AI-powered suggestions.',
    longDescription: 'AutoSEO revolutionizes WordPress SEO with AI-powered content optimization, automatic schema markup generation, technical SEO audits, keyword rank tracking, and competitor analysis. Compatible with all major page builders and themes.',
    price: 2499,
    originalPrice: 4999,
    category: 'Plugins',
    tags: ['seo', 'wordpress', 'plugin', 'ai', 'automation'],
    image: '/images/product-2.jpg',
    screenshots: ['/images/product-2.jpg'],
    rating: 4.4,
    reviews: 98,
    downloads: 780,
    featured: false,
    status: 'active',
    fileSize: '12 MB',
    fileType: 'WordPress Plugin',
    version: '1.8.3',
    lastUpdated: '2024-11-30',
    demoUrl: '#'
  },
  {
    id: '7',
    title: 'ReactScript Starter Kit',
    description: 'Production-ready React TypeScript boilerplate with authentication and routing.',
    longDescription: 'ReactScript is a battle-tested React TypeScript starter kit that includes authentication (JWT + OAuth), routing, state management with Zustand, API integration patterns, testing setup with Vitest, Docker configuration, and CI/CD pipelines. Save weeks of initial setup time.',
    price: 1799,
    originalPrice: 3499,
    category: 'Scripts',
    tags: ['react', 'typescript', 'boilerplate', 'starter kit'],
    image: '/images/product-3.jpg',
    screenshots: ['/images/product-3.jpg'],
    rating: 4.8,
    reviews: 234,
    downloads: 1890,
    featured: false,
    status: 'active',
    fileSize: '8 MB',
    fileType: 'React + TypeScript',
    version: '2.5.0',
    lastUpdated: '2024-12-05',
    demoUrl: '#'
  },
  {
    id: '8',
    title: 'Digital Marketing Mastery',
    description: 'Complete guide to digital marketing with 200+ pages of expert strategies.',
    longDescription: 'Digital Marketing Mastery is the definitive eBook for modern marketers. Covers SEO, SEM, social media marketing, email marketing, content strategy, conversion optimization, analytics, and growth hacking techniques. Includes case studies, templates, and actionable frameworks.',
    price: 799,
    originalPrice: 1599,
    category: 'eBooks',
    tags: ['ebook', 'marketing', 'seo', 'social media', 'guide'],
    image: '/images/product-4.jpg',
    screenshots: ['/images/product-4.jpg'],
    rating: 4.6,
    reviews: 445,
    downloads: 8900,
    featured: false,
    status: 'active',
    fileSize: '15 MB',
    fileType: 'PDF + EPUB',
    version: '3rd Edition',
    lastUpdated: '2024-08-01',
  },
  {
    id: '9',
    title: 'Next.js E-Commerce Course',
    description: 'Build a full-stack e-commerce platform from scratch with Next.js 14.',
    longDescription: 'This comprehensive video course teaches you to build a production-ready e-commerce platform using Next.js 14, TypeScript, Prisma, PostgreSQL, Stripe payments, and Tailwind CSS. Includes 40+ hours of HD video content, source code, and lifetime updates.',
    price: 4999,
    originalPrice: 9999,
    category: 'Courses',
    tags: ['nextjs', 'course', 'ecommerce', 'fullstack', 'video'],
    image: '/images/product-1.jpg',
    screenshots: ['/images/product-1.jpg'],
    rating: 4.9,
    reviews: 678,
    downloads: 2340,
    featured: false,
    status: 'active',
    fileSize: '18 GB',
    fileType: 'Video Course',
    version: '2024 Edition',
    lastUpdated: '2024-12-01',
    demoUrl: '#'
  },
  {
    id: '10',
    title: 'LandingCraft Templates',
    description: '50+ high-converting landing page templates for SaaS and startups.',
    longDescription: 'LandingCraft includes 50+ professionally designed, conversion-optimized landing page templates perfect for SaaS products, mobile apps, agencies, and startups. Available in HTML, React, and Figma formats with full customization documentation.',
    price: 2199,
    originalPrice: 4399,
    category: 'Templates',
    tags: ['landing page', 'saas', 'startup', 'html', 'react'],
    image: '/images/product-2.jpg',
    screenshots: ['/images/product-2.jpg'],
    rating: 4.7,
    reviews: 301,
    downloads: 4200,
    featured: false,
    status: 'active',
    fileSize: '55 MB',
    fileType: 'HTML + React + Figma',
    version: '3.0.1',
    lastUpdated: '2024-11-20',
    demoUrl: '#'
  },
  {
    id: '11',
    title: 'AnimatePro Motion Library',
    description: 'Ready-to-use CSS and JS animation library with 300+ effects.',
    longDescription: 'AnimatePro provides 300+ smooth, performance-optimized animations for web projects. Includes scroll animations, hover effects, loading spinners, transition effects, and complex timeline animations. Works with vanilla JS, React, Vue, and Angular.',
    price: 1299,
    originalPrice: 2599,
    category: 'Scripts',
    tags: ['animation', 'css', 'javascript', 'motion', 'ui'],
    image: '/images/product-3.jpg',
    screenshots: ['/images/product-3.jpg'],
    rating: 4.5,
    reviews: 142,
    downloads: 3100,
    featured: false,
    status: 'active',
    fileSize: '6 MB',
    fileType: 'CSS + JavaScript',
    version: '2.2.0',
    lastUpdated: '2024-10-10',
    demoUrl: '#'
  },
  {
    id: '12',
    title: 'FigmaFlow Design System',
    description: 'Enterprise-grade Figma design system with tokens and components.',
    longDescription: 'FigmaFlow is an enterprise-grade Figma design system built with the latest Figma variables and design tokens. Includes 500+ components, typography system, color system, spacing system, motion guidelines, and comprehensive documentation. Perfect for product teams.',
    price: 3999,
    originalPrice: 7999,
    category: 'UI Kits',
    tags: ['figma', 'design system', 'tokens', 'enterprise', 'components'],
    image: '/images/product-4.jpg',
    screenshots: ['/images/product-4.jpg'],
    rating: 4.9,
    reviews: 267,
    downloads: 1560,
    featured: false,
    status: 'active',
    fileSize: '200 MB',
    fileType: 'Figma',
    version: '5.1.0',
    lastUpdated: '2024-12-08',
    demoUrl: '#'
  }
];

export const mockTestimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Arjun Sharma',
    role: 'Frontend Developer',
    avatar: '👨‍💻',
    rating: 5,
    comment: 'ProDash UI Kit saved me weeks of development time. The quality of components is exceptional and the documentation is crystal clear. Worth every rupee!'
  },
  {
    id: '2',
    name: 'Priya Patel',
    role: 'UI/UX Designer',
    avatar: '👩‍🎨',
    rating: 5,
    comment: 'FigmaFlow design system transformed how our team works. The consistency and attention to detail is remarkable. Our design-to-dev handoffs are now seamless.'
  },
  {
    id: '3',
    name: 'Rahul Verma',
    role: 'Digital Marketer',
    avatar: '📈',
    rating: 5,
    comment: 'The SocialBoost templates are incredible! I\'ve increased my clients\' engagement by 300% using these professionally designed social media assets.'
  },
  {
    id: '4',
    name: 'Sneha Gupta',
    role: 'Entrepreneur',
    avatar: '💼',
    rating: 4,
    comment: 'The Digital Marketing Mastery ebook completely changed my approach to online marketing. Packed with actionable strategies that actually work in the Indian market.'
  },
  {
    id: '5',
    name: 'Vikram Singh',
    role: 'Full-Stack Developer',
    avatar: '⚡',
    rating: 5,
    comment: 'ReactScript Starter Kit is a game-changer. The authentication system, routing setup, and project structure are exactly what I need for every new project.'
  },
  {
    id: '6',
    name: 'Ananya Krishnan',
    role: 'Freelance Developer',
    avatar: '🎯',
    rating: 5,
    comment: 'Downloaded the Next.js E-Commerce course and it was worth every penny. The instructor explains concepts clearly and the project is production-ready code.'
  }
];

export const mockFAQs: FAQ[] = [
  {
    id: '1',
    question: 'How do I download my purchased products?',
    answer: 'After successful payment, you\'ll receive an email with download links. You can also access all purchases from your Orders/Downloads page in your profile dashboard. Download links are valid for 30 days.',
    category: 'Downloads'
  },
  {
    id: '2',
    question: 'What payment methods do you accept?',
    answer: 'We accept all major payment methods including Credit/Debit Cards, UPI, Net Banking via Razorpay, as well as Stripe and PayPal for international customers.',
    category: 'Payment'
  },
  {
    id: '3',
    question: 'Do you offer refunds?',
    answer: 'Yes, we offer a 7-day money-back guarantee for all digital products. If you\'re not satisfied with your purchase, contact our support team within 7 days for a full refund.',
    category: 'Refunds'
  },
  {
    id: '4',
    question: 'Can I use the products for commercial projects?',
    answer: 'Yes! All our products come with a commercial license. You can use them in unlimited commercial projects. However, you cannot resell or redistribute the raw files.',
    category: 'Licensing'
  },
  {
    id: '5',
    question: 'How many times can I download a product?',
    answer: 'You can download each purchased product up to 5 times. If you need more downloads, please contact our support team and we\'ll be happy to help.',
    category: 'Downloads'
  },
  {
    id: '6',
    question: 'Do products receive updates?',
    answer: 'Yes! Most of our products receive regular updates. Once you purchase a product, you\'ll receive all future updates at no additional cost through your downloads page.',
    category: 'Updates'
  },
  {
    id: '7',
    question: 'How do coupon codes work?',
    answer: 'Enter your coupon code in the checkout page before completing payment. Valid coupon codes will automatically apply the discount to your order total.',
    category: 'Payment'
  },
  {
    id: '8',
    question: 'Is my payment information secure?',
    answer: 'Absolutely! We use industry-standard SSL encryption and trusted payment gateways (Razorpay, Stripe, PayPal). We never store your card details on our servers.',
    category: 'Security'
  }
];

export const mockOrders: Order[] = [
  {
    id: 'ORD-2024-001',
    userId: '1',
    items: [{ product: mockProducts[0], quantity: 1 }],
    total: 2999,
    tax: 539.82,
    discount: 0,
    status: 'completed',
    paymentMethod: 'Razorpay',
    transactionId: 'pay_OBuJ6HQo0kY0',
    createdAt: '2024-12-01T10:30:00Z',
    downloadExpiry: '2025-01-01T10:30:00Z'
  },
  {
    id: 'ORD-2024-002',
    userId: '1',
    items: [{ product: mockProducts[2], quantity: 1 }, { product: mockProducts[3], quantity: 1 }],
    total: 4998,
    tax: 899.64,
    discount: 500,
    couponCode: 'SAVE500',
    status: 'completed',
    paymentMethod: 'Stripe',
    transactionId: 'pi_3OBuKFLkdIwHu',
    createdAt: '2024-11-15T14:20:00Z',
    downloadExpiry: '2024-12-15T14:20:00Z'
  },
  {
    id: 'ORD-2024-003',
    userId: '1',
    items: [{ product: mockProducts[8], quantity: 1 }],
    total: 4999,
    tax: 899.82,
    discount: 0,
    status: 'completed',
    paymentMethod: 'PayPal',
    transactionId: 'PAYID-M3XZPWA',
    createdAt: '2024-10-22T09:15:00Z',
    downloadExpiry: '2024-11-22T09:15:00Z'
  }
];

export const mockCoupons: Coupon[] = [
  {
    id: '1',
    code: 'WELCOME20',
    type: 'percentage',
    value: 20,
    minOrder: 999,
    maxUses: 100,
    usedCount: 45,
    expiryDate: '2025-12-31',
    active: true
  },
  {
    id: '2',
    code: 'SAVE500',
    type: 'flat',
    value: 500,
    minOrder: 2000,
    maxUses: 50,
    usedCount: 12,
    expiryDate: '2025-06-30',
    active: true
  },
  {
    id: '3',
    code: 'YBT30',
    type: 'percentage',
    value: 30,
    minOrder: 1500,
    maxUses: 200,
    usedCount: 89,
    expiryDate: '2025-03-31',
    active: true
  }
];

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Demo User',
    email: 'user@ybtdigital.com',
    role: 'user',
    avatar: '👤',
    createdAt: '2024-01-15T00:00:00Z',
    blocked: false
  },
  {
    id: '2',
    name: 'Admin User',
    email: 'admin@ybtdigital.com',
    role: 'admin',
    avatar: '👑',
    createdAt: '2023-06-01T00:00:00Z',
    blocked: false
  },
  {
    id: '3',
    name: 'Arjun Sharma',
    email: 'arjun@example.com',
    role: 'user',
    createdAt: '2024-02-10T00:00:00Z',
    blocked: false
  },
  {
    id: '4',
    name: 'Priya Patel',
    email: 'priya@example.com',
    role: 'user',
    createdAt: '2024-03-22T00:00:00Z',
    blocked: false
  },
  {
    id: '5',
    name: 'Blocked User',
    email: 'blocked@example.com',
    role: 'user',
    createdAt: '2024-04-01T00:00:00Z',
    blocked: true
  }
];

export const mockTickets: SupportTicket[] = [
  {
    id: 'TKT-001',
    userId: '3',
    userName: 'Arjun Sharma',
    subject: 'Download link expired',
    message: 'My download link for ProDash UI Kit has expired. Can you please regenerate it?',
    status: 'resolved',
    priority: 'medium',
    createdAt: '2024-12-01T10:00:00Z',
    replies: [
      {
        id: 'r1',
        message: 'We have regenerated your download link. Please check your email.',
        isAdmin: true,
        createdAt: '2024-12-01T11:30:00Z'
      }
    ]
  },
  {
    id: 'TKT-002',
    userId: '4',
    userName: 'Priya Patel',
    subject: 'Refund request for WordPress theme',
    message: 'The theme is not compatible with my WordPress version. I need a refund.',
    status: 'in-progress',
    priority: 'high',
    createdAt: '2024-12-05T14:00:00Z',
    replies: []
  }
];

export const defaultSettings: AppSettings = {
  siteName: 'YBT Digital',
  siteTagline: 'Premium Digital Products for Creators & Developers',
  logo: '/images/logo.png',
  footerText: '© 2025 YBT Digital. All rights reserved.',
  currency: 'INR',
  currencySymbol: '₹',
  taxRate: 18,
  taxType: 'GST',
  activeGateway: 'razorpay',
  gateways: {
    razorpay: { keyId: 'rzp_test_xxxx', keySecret: '****' },
    stripe: { publishableKey: 'pk_test_xxxx', secretKey: '****' },
    paypal: { clientId: 'client_xxxx', clientSecret: '****' }
  },
  emailNotifications: {
    orderConfirmation: true,
    failedPayment: true,
    refund: true
  }
};
