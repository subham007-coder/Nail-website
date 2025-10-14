import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';

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
    // Get product name for toast notification
    const productName = product.title?.en || product.title?.default || product.name || 'Product';
    
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(item =>
        item.id === (product._id || product.id) &&
        item.selectedLength === product.selectedLength &&
        item.selectedCurl === product.selectedCurl &&
        item.selectedColor === product.selectedColor
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
          quantity: quantity,
          selectedLength: product.selectedLength,
          selectedCurl: product.selectedCurl,
          selectedColor: product.selectedColor
        };
        return [...prevItems, newItem];
      }
    });

    // Show success toast
    toast.success(`${productName} added to cart!`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
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

  const removeFromCart = (item) => {
    setCartItems(prevItems => prevItems.filter(cartItem =>
      !(cartItem.id === item.id &&
        cartItem.selectedLength === item.selectedLength &&
        cartItem.selectedCurl === item.selectedCurl &&
        cartItem.selectedColor === item.selectedColor)
    ));
    
    // Show removal toast
    toast.info(`${item.name} removed from cart`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const updateQuantity = (item, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(prevItems =>
      prevItems.map(cartItem =>
        (cartItem.id === item.id &&
         cartItem.selectedLength === item.selectedLength &&
         cartItem.selectedCurl === item.selectedCurl &&
         cartItem.selectedColor === item.selectedColor)
          ? { ...cartItem, quantity: newQuantity }
          : cartItem
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
