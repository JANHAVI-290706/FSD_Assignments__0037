import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { apiService } from '../services/api';
import { formatPrice } from '../utils/cartUtils';
import CartItem from '../components/CartItem';
import ErrorMessage from '../components/ErrorMessage';

export default function Cart() {
  const { cartItems, updateQuantity, removeFromCart, clearCart, cartTotal, cartItemCount } = useCart();
  const { isLoggedIn, token } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [stockNotice, setStockNotice] = useState(null);

  const handleUpdateQuantity = (productId, newQuantity) => {
    setStockNotice(null);
    const result = updateQuantity(productId, newQuantity);
    if (!result.success && result.message) {
      setStockNotice(result.message);
      setTimeout(() => setStockNotice(null), 3500);
    }
  };

  const handlePlaceOrder = async () => {
    setError(null);
    setStockNotice(null);

    // 1. Check user login
    if (!isLoggedIn) {
      navigate('/account', {
        state: { message: 'Please log in to complete your checkout.' }
      });
      return;
    }

    // 2. Check empty cart
    if (cartItems.length === 0) {
      setError('Your cart is empty. Add products before placing an order.');
      return;
    }

    // 3. Prepare items payload for backend
    const itemsPayload = cartItems.map((item) => ({
      productId: item.id,
      quantity: item.quantity
    }));

    try {
      setLoading(true);
      const response = await apiService.placeOrder(itemsPayload, token);

      if (response.success) {
        // Clear local cart
        clearCart();
        // Redirect to orders page with success notice
        navigate('/orders', {
          state: {
            orderSuccess: true,
            orderId: response.order.id,
            totalAmount: response.order.total_amount
          }
        });
      }
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
        </div>
        <h3>Your cart is empty</h3>
        <p>Explore our catalog to find items you love and add them to your cart.</p>
        <Link to="/products" className="btn btn-primary btn-lg">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>Shopping Cart</h1>
        <p style={{ color: '#64748b' }}>
          Review your items and proceed to complete your order.
        </p>
      </div>

      {stockNotice && (
        <div className="alert alert-warning" style={{ marginBottom: '1.5rem' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '0.4rem', flexShrink: 0 }}>
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
            <line x1="12" y1="9" x2="12" y2="13"></line>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
          <span>{stockNotice}</span>
        </div>
      )}

      {error && (
        <div style={{ marginBottom: '1.5rem' }}>
          <ErrorMessage message={error} />
        </div>
      )}

      <div className="cart-layout">
        {/* Left: Cart Items List */}
        <div className="cart-items-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', paddingBottom: '0.75rem', borderBottom: '1px solid #e2e8f0' }}>
            <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>
              Items ({cartItemCount})
            </span>
            <button
              onClick={clearCart}
              className="btn btn-outline btn-sm"
              style={{ color: '#dc2626', borderColor: '#fecaca' }}
            >
              Clear Cart
            </button>
          </div>

          <div className="cart-items-list">
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onUpdateQuantity={handleUpdateQuantity}
                onRemove={removeFromCart}
              />
            ))}
          </div>

          <div style={{ marginTop: '1.5rem' }}>
            <Link to="/products" className="btn btn-outline btn-sm">
              ← Continue Shopping
            </Link>
          </div>
        </div>

        {/* Right: Order Summary */}
        <div className="summary-card">
          <h3>Order Summary</h3>

          <div className="summary-row">
            <span>Total Items</span>
            <strong>{cartItemCount}</strong>
          </div>

          <div className="summary-row">
            <span>Subtotal</span>
            <span>{formatPrice(cartTotal)}</span>
          </div>

          <div className="summary-row">
            <span>Estimated Shipping</span>
            <span style={{ color: '#16a34a', fontWeight: 600 }}>FREE</span>
          </div>

          <div className="summary-row total">
            <span>Total</span>
            <span>{formatPrice(cartTotal)}</span>
          </div>

          {!isLoggedIn && (
            <div className="alert alert-warning" style={{ fontSize: '0.85rem', marginTop: '1rem', marginBottom: '1rem' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '0.4rem', flexShrink: 0 }}>
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
              <span>Please log in to your account before placing the order.</span>
            </div>
          )}

          <button
            onClick={handlePlaceOrder}
            disabled={loading || cartItems.length === 0}
            className="btn btn-accent btn-lg btn-block"
            style={{ marginTop: '1rem' }}
          >
            {loading ? 'Processing Order...' : isLoggedIn ? 'Place Order Now' : 'Login & Place Order'}
          </button>
        </div>
      </div>
    </div>
  );
}
