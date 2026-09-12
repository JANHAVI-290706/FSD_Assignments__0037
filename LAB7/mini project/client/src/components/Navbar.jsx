import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { isLoggedIn, currentUser, logout } = useAuth();
  const { cartItemCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/account');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <svg width="28" height="28" viewBox="0 0 48 48" fill="none">
            <rect width="48" height="48" rx="10" fill="#1e3a8a"/>
            <path d="M14 16H34L31 27H17L14 16Z" stroke="#f97316" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="19" cy="32" r="2.5" fill="#ffffff"/>
            <circle cx="29" cy="32" r="2.5" fill="#ffffff"/>
            <path d="M12 12H15L17 27" stroke="#ffffff" strokeWidth="3" strokeLinecap="round"/>
          </svg>
          Cart<span>Nest</span>
        </Link>

        <ul className="navbar-links">
          <li>
            <NavLink to="/" className={({ isActive }) => (isActive ? 'navbar-link active' : 'navbar-link')} end>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/products" className={({ isActive }) => (isActive ? 'navbar-link active' : 'navbar-link')}>
              Products
            </NavLink>
          </li>
          <li>
            <NavLink to="/orders" className={({ isActive }) => (isActive ? 'navbar-link active' : 'navbar-link')}>
              Orders
            </NavLink>
          </li>
          <li>
            <NavLink to="/account" className={({ isActive }) => (isActive ? 'navbar-link active' : 'navbar-link')}>
              Account
            </NavLink>
          </li>
        </ul>

        <div className="navbar-actions">
          <Link to="/cart" className="cart-link-btn" title="View Cart">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            <span>Cart</span>
            {cartItemCount > 0 && <span className="cart-badge">{cartItemCount}</span>}
          </Link>

          {isLoggedIn ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <span className="nav-user-chip" title={currentUser?.email}>
                Hi, {currentUser?.name?.split(' ')[0] || 'User'}
              </span>
              <button onClick={handleLogout} className="btn btn-outline btn-sm">
                Logout
              </button>
            </div>
          ) : (
            <Link to="/account" className="btn btn-primary btn-sm">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
