/**
 * Utility functions for cart operations
 */

/**
 * Groups cart items by mm length and returns a breakdown
 * @param {Array} cartItems - Array of cart items
 * @returns {Object} Object with mm lengths as keys and arrays of items as values
 */
export const groupCartItemsByLength = (cartItems) => {
  const grouped = {};
  
  cartItems.forEach(item => {
    if (item.selectedLength) {
      if (!grouped[item.selectedLength]) {
        grouped[item.selectedLength] = [];
      }
      grouped[item.selectedLength].push(item);
    }
  });
  
  return grouped;
};

/**
 * Gets the total quantity for each mm length
 * @param {Array} cartItems - Array of cart items
 * @returns {Object} Object with mm lengths as keys and total quantities as values
 */
export const getLengthQuantityBreakdown = (cartItems) => {
  const breakdown = {};
  
  cartItems.forEach(item => {
    if (item.selectedLength) {
      if (!breakdown[item.selectedLength]) {
        breakdown[item.selectedLength] = 0;
      }
      breakdown[item.selectedLength] += item.quantity;
    }
  });
  
  return breakdown;
};

/**
 * Gets the total pieces count across all lengths
 * @param {Array} cartItems - Array of cart items
 * @returns {Number} Total number of pieces
 */
export const getTotalPiecesCount = (cartItems) => {
  return cartItems.reduce((total, item) => total + item.quantity, 0);
};

/**
 * Sorts mm lengths in ascending order
 * @param {Array} lengths - Array of length strings (e.g., ['10mm', '8mm', '12mm'])
 * @returns {Array} Sorted array of lengths
 */
export const sortLengths = (lengths) => {
  return lengths.sort((a, b) => {
    const numA = parseInt(a.replace('mm', ''));
    const numB = parseInt(b.replace('mm', ''));
    return numA - numB;
  });
};
