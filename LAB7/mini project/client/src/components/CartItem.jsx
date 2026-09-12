import React from 'react';
import { formatPrice, calculateItemSubtotal } from '../utils/cartUtils';

export default function CartItem({ item, onUpdateQuantity, onRemove }) {
  const subtotal = calculateItemSubtotal(item.price, item.quantity);
  const isMaxStock = item.quantity >= item.stock;

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = '/images/placeholder.svg';
  };

  return (
    <div className="cart-item-row">
      <img
        src={item.image}
        alt={item.name}
        className="cart-item-image"
        onError={handleImageError}
      />

      <div className="cart-item-details">
        <h4>{item.name}</h4>
        <div className="cart-item-unit-price">
          Unit Price: <strong>{formatPrice(item.price)}</strong>
        </div>
        {isMaxStock && (
          <small style={{ color: '#ea580c', fontWeight: 600 }}>
            Max available stock ({item.stock}) reached
          </small>
        )}
      </div>

      <div className="quantity-controls">
        <button
          type="button"
          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
          className="quantity-btn"
          title="Decrease quantity"
        >
          -
        </button>
        <span className="quantity-input" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {item.quantity}
        </span>
        <button
          type="button"
          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
          disabled={isMaxStock}
          className="quantity-btn"
          title={isMaxStock ? 'Maximum stock reached' : 'Increase quantity'}
        >
          +
        </button>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span className="cart-item-subtotal">{formatPrice(subtotal)}</span>
        <button
          type="button"
          onClick={() => onRemove(item.id)}
          className="cart-item-remove-btn"
          title="Remove product"
          aria-label="Remove product"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          </svg>
        </button>
      </div>
    </div>
  );
}
