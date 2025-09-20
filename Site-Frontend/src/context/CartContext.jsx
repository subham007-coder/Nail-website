import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    // Load from localStorage on first render (synchronous)
    try {
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error('Failed to parse cart from localStorage:', error);
      return [];
    }
  });

  const [cartAnimation, setCartAnimation] = useState(null);

  // Save to localStorage whenever cartItems change
  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    } catch (error) {
      console.error('Failed to save cart to localStorage:', error);
    }
  }, [cartItems]);

  const addToCart = (product, quantity = 1) => {
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(item =>
        item.id === (product._id || product.id)
      );

      if (existingItemIndex >= 0) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        return updatedItems;
      } else {
        // Normalize fields for consistent cart display
        const resolveName = product.title?.en || product.title?.default || product.name || '';
        const resolveDesc = product.description?.en || product.description?.default || product.description || '';
        const resolvePrice = (product.prices?.price ?? product.salePrice ?? product.price) ?? 0;
        const resolveOld = (product.prices?.originalPrice ?? product.originalPrice ?? product.prices?.compareAtPrice) ?? null;

        // Resolve a reliable image URL for the cart item
        let resolveImage = '';
        if (Array.isArray(product.image) && product.image.length) {
          // Some sources provide `image` as an array
          resolveImage = product.image[0];
        } else if (typeof product.image === 'string' && product.image) {
          // Some sources provide a single image string
          resolveImage = product.image;
        } else if (Array.isArray(product.images) && product.images.length) {
          // ProductDetails normalization provides `images` array
          resolveImage = product.images[0];
        } else if (typeof product.images === 'string' && product.images) {
          // Edge-case: images provided as a string
          resolveImage = product.images;
        } else if (product.images?.default) {
          // Edge-case: object with default
          resolveImage = product.images.default;
        } else {
          // Stable fallback image (avoid via.placeholder.com DNS issues)
          resolveImage = 'https://nailknack.com/cdn/shop/files/AnyConv.com__Untitleddesign_1_e0aced8b-e2a2-407b-9cd1-89d6d6d38697.webp?v=1699194525&width=360';
        }

        const newItem = {
          id: product._id || product.id,
          name: resolveName,
          description: resolveDesc,
          price: resolvePrice,
          oldPrice: resolveOld,
          image: resolveImage,
          category: product.category || 'Nail Product',
          quantity: quantity
        };
        return [...prevItems, newItem];
      }
    });

    // Trigger animation
    setCartAnimation({
      product,
      timestamp: Date.now()
    });

    setTimeout(() => {
      setCartAnimation(null);
    }, 3000);
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart'); // clear from storage too
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      cartAnimation,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal,
      getCartCount
    }}>
      {children}
    </CartContext.Provider>
  );
};
