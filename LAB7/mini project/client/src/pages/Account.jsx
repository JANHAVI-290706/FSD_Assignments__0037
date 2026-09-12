import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Account() {
  const { isLoggedIn, currentUser, login, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState(null);
  const [loading, setLoading] = useState(false);

  const redirectMessage = location.state?.message;

  const validateForm = () => {
    const errs = {};
    if (!email.trim()) {
      errs.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errs.email = 'Please enter a valid email.';
    }

    if (!password) {
      errs.password = 'Password is required.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError(null);

    if (!validateForm()) return;

    try {
      setLoading(true);
      await login(email.trim(), password);
      // Navigate to intended destination or /orders or /products
      const destination = location.state?.from?.pathname || '/products';
      navigate(destination, { replace: true });
    } catch (err) {
      setApiError(err.message || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  const handleFillDemo = () => {
    setEmail('demo@cartnest.com');
    setPassword('demo123');
    setErrors({});
    setApiError(null);
  };

  // If user is already logged in, show user profile view
  if (isLoggedIn && currentUser) {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <h2>My Account</h2>
          <p className="auth-subtitle">Manage your session and check your order history.</p>

          <div style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.25rem', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#1e3a8a', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', fontWeight: 700 }}>
                {currentUser.name.charAt(0)}
              </div>
              <div>
                <h3 style={{ fontSize: '1.15rem' }}>{currentUser.name}</h3>
                <p style={{ color: '#64748b', fontSize: '0.9rem' }}>{currentUser.email}</p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', fontSize: '0.85rem' }}>
              <div>
                <span style={{ color: '#64748b' }}>Account Status:</span>
                <p style={{ fontWeight: 600, color: '#16a34a' }}>Active (Verified)</p>
              </div>
              <div>
                <span style={{ color: '#64748b' }}>User ID:</span>
                <p style={{ fontWeight: 600 }}>#{currentUser.id}</p>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <Link to="/orders" className="btn btn-primary btn-block">
              View My Orders
            </Link>
            <Link to="/products" className="btn btn-outline btn-block">
              Continue Shopping
            </Link>
            <button
              onClick={logout}
              className="btn btn-outline btn-block"
              style={{ color: '#dc2626', borderColor: '#fecaca', marginTop: '0.5rem' }}
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Welcome Back</h2>
        <p className="auth-subtitle">Log in to your CartNest account to place orders.</p>

        {redirectMessage && (
          <div className="alert alert-warning">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '0.4rem', flexShrink: 0 }}>
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
            <span>{redirectMessage}</span>
          </div>
        )}

        {/* Demo Credentials Box */}
        <div className="demo-credentials-box">
          <h4>
            <span>College Demo Credentials</span>
            <button
              type="button"
              onClick={handleFillDemo}
              className="btn btn-sm btn-outline-primary"
              style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem' }}
            >
              Auto Fill
            </button>
          </h4>
          <p style={{ color: '#475569', marginBottom: '0.4rem' }}>
            Email: <code>demo@cartnest.com</code>
          </p>
          <p style={{ color: '#475569' }}>
            Password: <code>demo123</code>
          </p>
        </div>

        {apiError && (
          <div className="alert alert-danger">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '0.4rem', flexShrink: 0 }}>
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
              <line x1="12" y1="9" x2="12" y2="13"></line>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
            <span>{apiError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label className="form-label" htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              className="form-control"
              placeholder="demo@cartnest.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
            {errors.email && (
              <span style={{ color: '#dc2626', fontSize: '0.8rem', marginTop: '0.25rem', display: 'block' }}>
                {errors.email}
              </span>
            )}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="form-control"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            {errors.password && (
              <span style={{ color: '#dc2626', fontSize: '0.8rem', marginTop: '0.25rem', display: 'block' }}>
                {errors.password}
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary btn-lg btn-block"
            style={{ marginTop: '1.5rem' }}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
