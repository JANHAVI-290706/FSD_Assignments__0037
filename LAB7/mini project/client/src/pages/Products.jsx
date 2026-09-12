import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { apiService } from '../services/api';
import { useCart } from '../context/CartContext';
import ProductGrid from '../components/ProductGrid';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const CATEGORIES = ['All', 'Fashion', 'Electronics', 'Accessories', 'Home'];

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [notification, setNotification] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get('category') || 'All';

  const { addToCart } = useCart();

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiService.getProducts();
      setProducts(data);
    } catch (err) {
      setError(err.message || 'Unable to load products. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleCategoryChange = (category) => {
    if (category === 'All') {
      searchParams.delete('category');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category });
    }
  };

  const handleAddToCart = (product) => {
    const res = addToCart(product, 1);
    setNotification(res.message);
    setTimeout(() => setNotification(null), 3000);
  };

  // Filtered products list using search and category
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === 'All' ||
        product.category.toLowerCase() === selectedCategory.toLowerCase();

      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        query === '' ||
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchQuery]);

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

      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>Explore Our Products</h1>
        <p style={{ color: '#64748b' }}>Browse through our curated collection of essentials.</p>
      </div>

      {/* Toolbar: Search and Category Pills */}
      <div className="toolbar">
        <div className="search-box">
          <span className="search-icon" style={{ display: 'flex', alignItems: 'center' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </span>
          <input
            type="text"
            className="search-input"
            placeholder="Search by product name, category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="category-filter-pills">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`pill ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => handleCategoryChange(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Loading, Error, or Product Grid */}
      {loading && <LoadingSpinner message="Fetching products from CartNest server..." />}
      {error && <ErrorMessage message={error} onRetry={fetchProducts} />}

      {!loading && !error && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', color: '#64748b', fontSize: '0.9rem' }}>
            <span>Showing <strong>{filteredProducts.length}</strong> products</span>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="btn btn-outline btn-sm"
                style={{ padding: '0.2rem 0.5rem', fontSize: '0.8rem' }}
              >
                Clear Search
              </button>
            )}
          </div>

          <ProductGrid
            products={filteredProducts}
            onAddToCart={handleAddToCart}
          />
        </div>
      )}
    </div>
  );
}
