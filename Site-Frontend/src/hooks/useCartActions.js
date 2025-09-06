import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useNavigate, useLocation } from 'react-router-dom';

export const useCartActions = () => {
  const { isAuthenticated } = useAuth();
  const { addToCart: addToCartOriginal } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const addToCartWithAuth = (product, quantity = 1, showAuthPrompt = true) => {
    if (!isAuthenticated && showAuthPrompt) {
      // Store the intended action in state for after login
      const returnTo = location.pathname + location.search;
      navigate('/login', { 
        state: { 
          from: { pathname: returnTo }, 
          message: 'Please log in to add items to your cart.',
          pendingAction: {
            type: 'addToCart',
            product,
            quantity
          }
        } 
      });
      return false;
    }
    
    // If authenticated or not showing auth prompt, proceed with adding to cart
    addToCartOriginal(product, quantity);
    return true;
  };

  const addToWishlistWithAuth = (product, showAuthPrompt = true) => {
    if (!isAuthenticated && showAuthPrompt) {
      const returnTo = location.pathname + location.search;
      navigate('/login', { 
        state: { 
          from: { pathname: returnTo }, 
          message: 'Please log in to add items to your wishlist.',
          pendingAction: {
            type: 'addToWishlist',
            product
          }
        } 
      });
      return false;
    }
    
    // For now, we'll just show a message - you can implement wishlist context later
    console.log('Added to wishlist:', product);
    // TODO: Implement actual wishlist functionality
    return true;
  };

  return {
    addToCartWithAuth,
    addToWishlistWithAuth,
    isAuthenticated
  };
};
