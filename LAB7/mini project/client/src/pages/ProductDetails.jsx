import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { apiService } from '../services/api';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/cartUtils';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [qtyError, setQtyError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiService.getProductById(id);
      setProduct(data);
      setQuantity(1);
    } catch (err) {
      setError(err.message || 'Product not found.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const handleQuantityChange = (newVal) => {
    setQtyError(null);
    const parsed = parseInt(newVal, 10);

    if (isNaN(parsed) || parsed < 1) {
      setQtyError('Please select a valid quantity.');
      setQuantity(1);
      return;
    }

    if (product && parsed > product.stock) {
      setQtyError(`Insufficient stock available. Only ${product.stock} items available.`);
      setQuantity(product.stock);
      return;
    }

    setQuantity(parsed);
  };

  const handleAddToCart = () => {
    if (!product) return;
    if (quantity < 1 || quantity > product.stock) {
      setQtyError('Please select a valid quantity.');
      return;
    }

    const res = addToCart(product, quantity);
    if (res.success) {
      setSuccessMessage(res.message);
      setQtyError(null);
      setTimeout(() => setSuccessMessage(null), 3500);
    } else {
      setQtyError(res.message);
    }
  };

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = '/images/placeholder.svg';
  };

  if (loading) {
    return <LoadingSpinner message="Fetching product details..." />;
  }

  if (error || !product) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
            <line x1="12" y1="9" x2="12" y2="13"></line>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
        </div>
        <h3>Product not found</h3>
        <p>{error || 'The requested product does not exist or has been removed.'}</p>
        <Link to="/products" className="btn btn-primary">
          ← Back to Products
        </Link>
      </div>
    );
  }

  const isOutOfStock = product.stock <= 0;

  return (
    <div>
      {/* Breadcrumb Navigation */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: '#64748b', marginBottom: '1.5rem' }}>
        <Link to="/" style={{ color: '#1e3a8a' }}>Home</Link>
        <span>/</span>
        <Link to="/products" style={{ color: '#1e3a8a' }}>Products</Link>
        <span>/</span>
        <span style={{ color: '#0f172a', fontWeight: 600 }}>{product.name}</span>
      </div>

      <div className="product-details-container">
        {/* Left: Product Image */}
        <div className="product-details-image-wrap">
          <img
            src={product.image}
            alt={product.name}
            className="product-details-image"
            onError={handleImageError}
          />
        </div>

        {/* Right: Product Details Info */}
        <div className="product-details-info">
          <div>
            <span className="pill" style={{ pointerEvents: 'none', backgroundColor: '#eff6ff', color: '#1e3a8a', borderColor: '#bfdbfe' }}>
              {product.category}
            </span>
          </div>

          <h1 className="product-details-title">{product.name}</h1>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <span className="product-details-price">{formatPrice(product.price)}</span>
            <span className={`stock-status ${isOutOfStock ? 'stock-out' : 'stock-in'}`}>
              {isOutOfStock ? 'Out of Stock' : `${product.stock} in stock`}
            </span>
          </div>

          <p className="product-details-description">{product.description}</p>

          <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0', margin: '0.5rem 0' }} />

          {/* Quantity Selector */}
          {!isOutOfStock && (
            <div>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                Quantity:
              </label>
              <div className="quantity-selector">
                <div className="quantity-controls">
                  <button
                    type="button"
                    className="quantity-btn"
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    className="quantity-input"
                    value={quantity}
                    onChange={(e) => handleQuantityChange(e.target.value)}
                    min="1"
                    max={product.stock}
                  />
                  <button
                    type="button"
                    className="quantity-btn"
                    onClick={() => handleQuantityChange(quantity + 1)}
                    disabled={quantity >= product.stock}
                  >
                    +
                  </button>
                </div>
                <span style={{ fontSize: '0.85rem', color: '#64748b' }}>
                  (Max: {product.stock})
                </span>
              </div>
            </div>
          )}

          {/* Validation & Feedback Alerts */}
          {qtyError && (
            <div className="alert alert-danger">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '0.4rem', flexShrink: 0 }}>
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                <line x1="12" y1="9" x2="12" y2="13"></line>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
              <span>{qtyError}</span>
            </div>
          )}
          {successMessage && (
            <div className="alert alert-success">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '0.4rem', flexShrink: 0 }}>
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>{successMessage}</span>
            </div>
          )}

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className="btn btn-accent btn-lg"
              style={{ flex: 1 }}
            >
              {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
            </button>
            <Link to="/products" className="btn btn-outline btn-lg">
              Back to Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
