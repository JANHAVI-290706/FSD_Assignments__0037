/**
 * Cart utility calculations and formatting helpers
 */

// Format price with Indian Rupee symbol
export function formatPrice(amount) {
  if (amount == null || isNaN(amount)) return '₹0';
  return '₹' + Number(amount).toLocaleString('en-IN');
}

// Calculate subtotal for an item
export function calculateItemSubtotal(price, quantity) {
  const p = Number(price) || 0;
  const q = Number(quantity) || 0;
  return p * q;
}

// Calculate total price of all items dynamically
export function calculateCartTotal(items = []) {
  return items.reduce((sum, item) => {
    return sum + calculateItemSubtotal(item.price, item.quantity);
  }, 0);
}

// Calculate total count of items in the cart
export function calculateItemCount(items = []) {
  return items.reduce((count, item) => {
    return count + (Number(item.quantity) || 0);
  }, 0);
}
