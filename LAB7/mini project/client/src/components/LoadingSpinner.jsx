import React from 'react';

export default function LoadingSpinner({ message = 'Loading CartNest items...' }) {
  return (
    <div className="spinner-container">
      <div className="spinner"></div>
      <p style={{ color: '#64748b', fontSize: '0.95rem', fontWeight: 500 }}>{message}</p>
    </div>
  );
}
