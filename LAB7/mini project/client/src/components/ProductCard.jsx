import React from 'react';
import { Link } from 'react-router-dom';
import { formatPrice } from '../utils/cartUtils';

export default function ProductCard({ product, onAddToCart }) {
  const isOutOfStock = product.stock <= 0;

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = '/images/placeholder.svg';
  };

  return (
    <div className="product-card">
      <div className="product-card-image-wrap">
        <span className="product-card-badge">{product.category}</span>
        <img
          src={product.image}
          alt={product.name}
          className="product-card-image"
          onError={handleImageError}
          loading="lazy"
        />
      </div>

      <div className="product-card-body">
        <h3 className="product-card-title">{product.name}</h3>

        <div className="product-card-meta">
          <span className="product-card-price">{formatPrice(product.price)}</span>
          <span className={`stock-status ${isOutOfStock ? 'stock-out' : 'stock-in'}`}>
            {isOutOfStock ? 'Out of Stock' : `In Stock (${product.stock})`}
          </span>
        </div>

        <div className="product-card-actions">
          <Link to={`/products/${product.id}`} className="btn btn-outline btn-sm">
            View Details
          </Link>
          <button
            onClick={() => onAddToCart(product)}
            disabled={isOutOfStock}
            className="btn btn-accent btn-sm"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
