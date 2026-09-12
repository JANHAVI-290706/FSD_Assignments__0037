const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      const errorMsg = data.message || `Request failed with status ${response.status}`;
      const error = new Error(errorMsg);
      error.status = response.status;
      error.data = data;
      throw error;
    }

    return data;
  } catch (error) {
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('Server is unavailable. Please check your connection.');
    }
    throw error;
  }
}

export const apiService = {
  // Get all products
  getProducts: async () => {
    try {
      const data = await request('/products');
      return data.products || [];
    } catch (err) {
      if (err.message.includes('unavailable')) throw err;
      throw new Error('Unable to load products. Please try again.');
    }
  },

  // Get product by ID
  getProductById: async (id) => {
    try {
      const data = await request(`/products/${id}`);
      return data.product;
    } catch (err) {
      if (err.status === 404) {
        throw new Error('Product not found.');
      }
      if (err.message.includes('unavailable')) throw err;
      throw new Error('Something went wrong. Please try again.');
    }
  },

  // Login
  login: async (email, password) => {
    return await request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
  },

  // Place order
  placeOrder: async (items, token) => {
    return await request('/orders', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ items })
    });
  },

  // Get user orders
  getOrders: async (token) => {
    const data = await request('/orders', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return data.orders || [];
  }
};
