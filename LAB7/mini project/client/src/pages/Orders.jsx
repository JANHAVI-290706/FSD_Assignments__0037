import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { apiService } from '../services/api';
import { formatPrice } from '../utils/cartUtils';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

export default function Orders() {
  const { isLoggedIn, token } = useAuth();
  const location = useLocation();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if routed after placing an order
  const newOrderSuccess = location.state?.orderSuccess;
  const newOrderId = location.state?.orderId;

  const fetchOrders = async () => {
    if (!token) return;
    try {
      setLoading(true);
      setError(null);
      const data = await apiService.getOrders(token);
      setOrders(data);
    } catch (err) {
      setError(err.message || 'Unable to load orders. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn && token) {
      fetchOrders();
    } else {
      setLoading(false);
    }
  }, [isLoggedIn, token]);

  if (!isLoggedIn) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
        </div>
        <h3>Please log in to view your orders</h3>
        <p>Access your past order history, receipts, and order status by logging in.</p>
        <Link to="/account" className="btn btn-primary btn-lg">
          Log In to Account
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>Your Orders</h1>
        <p style={{ color: '#64748b' }}>Track and review all purchases placed with your account.</p>
      </div>

      {newOrderSuccess && (
        <div className="alert alert-success" style={{ marginBottom: '1.5rem', padding: '1rem 1.25rem' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '0.5rem', flexShrink: 0 }}>
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span>
            <strong>Order placed successfully!</strong> Your order ID is <strong>#{newOrderId}</strong>. Thank you for shopping with CartNest!
          </span>
        </div>
      )}

      {loading && <LoadingSpinner message="Loading your order history..." />}
      {error && <ErrorMessage message={error} onRetry={fetchOrders} />}

      {!loading && !error && orders.length === 0 && (
        <div className="empty-state">
          <div className="empty-state-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line>
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
              <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
              <line x1="12" y1="22.08" x2="12" y2="12"></line>
            </svg>
          </div>
          <h3>No orders yet</h3>
          <p>Your orders will appear here after you place your first order.</p>
          <Link to="/products" className="btn btn-primary btn-lg">
            Start Shopping
          </Link>
        </div>
      )}

      {!loading && !error && orders.length > 0 && (
        <div className="orders-list">
          {orders.map((order) => {
            const formattedDate = new Date(order.created_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            });

            return (
              <div key={order.id} className="order-card">
                <div className="order-card-header">
                  <div className="order-id-date">
                    <h4>Order #{order.id}</h4>
                    <span className="order-date">Placed on {formattedDate}</span>
                  </div>

                  <div className="order-total-status">
                    <div>
                      <span className="order-status-badge">
                        ● {order.status}
                      </span>
                    </div>
                    <span className="order-total-val">{formatPrice(order.total_amount)}</span>
                  </div>
                </div>

                <div className="order-card-body">
                  <table className="order-items-table">
                    <thead>
                      <tr>
                        <th>Item</th>
                        <th style={{ textAlign: 'center' }}>Qty</th>
                        <th style={{ textAlign: 'right' }}>Price</th>
                        <th style={{ textAlign: 'right' }}>Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.items?.map((item) => (
                        <tr key={item.id}>
                          <td>
                            <strong>{item.product_name}</strong>
                          </td>
                          <td style={{ textAlign: 'center' }}>{item.quantity}</td>
                          <td style={{ textAlign: 'right' }}>{formatPrice(item.price)}</td>
                          <td style={{ textAlign: 'right' }}><strong>{formatPrice(item.subtotal)}</strong></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
