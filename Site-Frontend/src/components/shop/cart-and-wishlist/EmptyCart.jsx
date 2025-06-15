import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function EmptyCart() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-16 px-4"
    >
      <div className="w-24 h-24 mx-auto mb-6">
        <svg
          className="w-full h-full text-gray-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
          />
        </svg>
      </div>
      <h3 className="text-2xl font-serif text-gray-900 mb-2">Your Cart is Empty</h3>
      <p className="text-gray-600 mb-8">
        Looks like you haven't added any items to your cart yet
      </p>
      <Link
        to="/shop"
        className="inline-flex items-center justify-center px-8 py-3 rounded-xl
          bg-pink-600 text-white hover:bg-pink-700 transition-colors duration-200"
      >
        Start Shopping
      </Link>
    </motion.div>
  );
}

export default EmptyCart;