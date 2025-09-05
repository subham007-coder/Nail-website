import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CartAnimation = ({ product, onAnimationComplete }) => {
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    // Get the position of the cart icon in the navbar
    const cartIcon = document.querySelector('.cart-icon');
    if (cartIcon) {
      const cartRect = cartIcon.getBoundingClientRect();
      setStartPosition({
        x: window.innerWidth - cartRect.right + cartRect.width/2,
        y: cartRect.top - window.scrollY
      });
    }
  }, []);

  if (!product) return null;

  // Get product image
  let productImage;
  if (product.image && product.image.length > 0) {
    productImage = product.image[0].replace(/\s+/g, "").replace(/`/g, "");
  } else if (product.images) {
    productImage = product.images.default;
  } else {
    productImage = "https://via.placeholder.com/300";
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed z-50 pointer-events-none"
        initial={{ 
          opacity: 1, 
          scale: 1,
          x: 0, 
          y: 0 
        }}
        animate={{
          opacity: 0,
          scale: 0.5,
          x: startPosition.x,
          y: startPosition.y,
          rotate: 360
        }}
        transition={{ 
          duration: 0.8, 
          ease: "easeInOut",
          opacity: { duration: 0.7 }
        }}
        onAnimationComplete={onAnimationComplete}
        style={{
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}
      >
        <div className="relative">
          <div className="absolute inset-0 bg-pink-500 rounded-full animate-ping opacity-30"></div>
          <img 
            src={productImage} 
            alt="Added to cart" 
            className="w-16 h-16 object-cover rounded-full border-2 border-white shadow-lg"
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CartAnimation;