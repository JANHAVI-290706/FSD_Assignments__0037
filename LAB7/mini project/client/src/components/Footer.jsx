import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <h3>CartNest</h3>
          <p>Simple Shopping. Smarter Cart.</p>
        </div>

        <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.9rem', color: '#64748b' }}>
          <Link to="/" style={{ textDecoration: 'none' }}>Home</Link>
          <Link to="/products" style={{ textDecoration: 'none' }}>Products</Link>
          <Link to="/cart" style={{ textDecoration: 'none' }}>Cart</Link>
          <Link to="/account" style={{ textDecoration: 'none' }}>Account</Link>
        </div>

        <div className="footer-copy">
          © {new Date().getFullYear()} CartNest. College Full Stack Development Project.
        </div>
      </div>
    </footer>
  );
}
