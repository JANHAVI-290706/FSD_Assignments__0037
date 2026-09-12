import React, { createContext, useContext, useState, useEffect } from 'react';
import { calculateCartTotal, calculateItemCount } from '../utils/cartUtils';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem('cartnest_cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      return [];
    }
  });

  // Keep localStorage synchronized whenever cartItems changes
  useEffect(() => {
    localStorage.setItem('cartnest_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Add product to cart with quantity & stock limit check
  const addToCart = (product, quantity = 1) => {
    const qtyToAdd = Math.max(1, parseInt(quantity, 10) || 1);
    const existingIndex = cartItems.findIndex((item) => item.id === product.id);

    if (existingIndex > -1) {
      const currentQty = cartItems[existingIndex].quantity;
      const newTotalQty = currentQty + qtyToAdd;

      if (newTotalQty > product.stock) {
        return {
          success: false,
          message: `Insufficient stock available. Only ${product.stock} items in stock.`
        };
      }

      const updated = [...cartItems];
      updated[existingIndex] = {
        ...updated[existingIndex],
        quantity: newTotalQty
      };
      setCartItems(updated);
      return { success: true, message: `Updated quantity to ${newTotalQty} in cart!` };
    } else {
      if (qtyToAdd > product.stock) {
        return {
          success: false,
          message: `Insufficient stock available. Only ${product.stock} items in stock.`
        };
      }

      setCartItems((prev) => [
        ...prev,
        {
          id: product.id,
          name: product.name,
          category: product.category,
          price: product.price,
          stock: product.stock,
          image: product.image,
          quantity: qtyToAdd
        }
      ]);
      return { success: true, message: `Added "${product.name}" to cart!` };
    }
  };

  // Update item quantity directly (with stock ceiling check)
  const updateQuantity = (productId, newQuantity) => {
    const qty = parseInt(newQuantity, 10);
    const item = cartItems.find((i) => i.id === productId);
    if (!item) return { success: false, message: 'Item not found in cart.' };

    if (qty <= 0) {
      removeFromCart(productId);
      return { success: true, message: 'Item removed from cart.' };
    }

    if (qty > item.stock) {
      return {
        success: false,
        message: `Insufficient stock available. Maximum stock is ${item.stock}.`
      };
    }

    setCartItems((prev) =>
      prev.map((i) => (i.id === productId ? { ...i, quantity: qty } : i))
    );
    return { success: true };
  };

  // Remove single item from cart
  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  // Clear all items in cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Dynamic calculations
  const cartTotal = calculateCartTotal(cartItems);
  const cartItemCount = calculateItemCount(cartItems);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartTotal,
        cartItemCount
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
