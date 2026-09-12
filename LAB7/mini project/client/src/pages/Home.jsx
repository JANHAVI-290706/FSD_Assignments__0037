import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiService } from '../services/api';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);

  const { addToCart } = useCart();
  const navigate = useNavigate();

  const fetchFeatured = async () => {
    try {
      setLoading(true);
      setError(null);
      const all = await apiService.getProducts();
      // Pick first 4 products as featured
      setFeaturedProducts(all.slice(0, 4));
    } catch (err) {
      setError(err.message || 'Unable to load products. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeatured();
  }, []);

  const handleAddToCart = (product) => {
    const res = addToCart(product, 1);
    setNotification(res.message);
    setTimeout(() => setNotification(null), 3000);
  };

  const categories = [
    {
      name: 'Fashion',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"></path>
        </svg>
      ),
      count: 'T-Shirts, Shoes'
    },
    {
      name: 'Electronics',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
          <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
        </svg>
      ),
      count: 'Headphones, Mouse'
    },
    {
      name: 'Accessories',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 10a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V10z"></path>
          <path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"></path>
        </svg>
      ),
      count: 'Backpacks, Bottles'
    },
    {
      name: 'Home',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
      ),
      count: 'LED Lamps, Mugs'
    }
  ];

  return (
    <div>
      {/* Toast Notification */}
      {notification && (
        <div className="alert alert-success" style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 99, boxShadow: 'var(--shadow-lg)' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '0.4rem' }}>
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          {notification}
        </div>
      )}

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <span className="hero-badge">Welcome to CartNest</span>
          <h1 className="hero-title">Everything You Need, In One Cart</h1>
          <p className="hero-subtitle">
            Explore quality products, discover great deals, and enjoy a simple shopping experience with CartNest.
          </p>
          <div className="hero-buttons">
            <Link to="/products" className="btn btn-accent btn-lg">
              Shop Now →
            </Link>
            <Link to="/products" className="btn btn-outline" style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.4)' }}>
              View Products
            </Link>
          </div>
        </div>
      </section>

      {/* Category Highlights */}
      <section style={{ marginBottom: '3.5rem' }}>
        <div className="section-header">
          <div>
            <h2 className="section-title">Shop by Category</h2>
            <p className="section-subtitle">Discover popular essentials curated for everyday life</p>
          </div>
        </div>

        <div className="category-grid">
          {categories.map((cat) => (
            <div
              key={cat.name}
              className="category-card"
              onClick={() => navigate(`/products?category=${cat.name}`)}
              role="button"
              tabIndex={0}
            >
              <div className="category-icon">{cat.icon}</div>
              <div className="category-info">
                <h4>{cat.name}</h4>
                <span>{cat.count}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section style={{ marginBottom: '3.5rem' }}>
        <div className="section-header">
          <div>
            <h2 className="section-title">Featured Products</h2>
            <p className="section-subtitle">Handpicked selections from our official store</p>
          </div>
          <Link to="/products" className="btn btn-outline-primary btn-sm">
            View All Products →
          </Link>
        </div>

        {loading && <LoadingSpinner message="Fetching featured products..." />}
        {error && <ErrorMessage message={error} onRetry={fetchFeatured} />}

        {!loading && !error && (
          <div className="product-grid">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        )}
      </section>

      {/* Why Choose Us Section */}
      <section className="features-section">
        <h3 style={{ fontSize: '1.4rem', marginBottom: '1.5rem', textAlign: 'center' }}>
          Why Choose CartNest?
        </h3>
        <div className="features-grid">
          <div className="feature-item">
            <div className="feature-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="1" y="3" width="15" height="13"></rect>
                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                <circle cx="5.5" cy="18.5" r="2.5"></circle>
                <circle cx="18.5" cy="18.5" r="2.5"></circle>
              </svg>
            </div>
            <h4>Fast Delivery</h4>
            <p>Reliable and prompt dispatch right to your doorstep with real-time updates.</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
            </div>
            <h4>Quality Assured</h4>
            <p>Every product is verified for top quality, durable materials, and satisfaction.</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                <line x1="1" y1="10" x2="23" y2="10"></line>
              </svg>
            </div>
            <h4>Secure Checkout</h4>
            <p>Protected session management and simulated secure transaction flow.</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
              </svg>
            </div>
            <h4>24/7 Support</h4>
            <p>Dedicated assistance whenever you need guidance with your orders.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
