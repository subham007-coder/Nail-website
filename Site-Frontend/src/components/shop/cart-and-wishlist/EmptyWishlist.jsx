import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function EmptyWishlist() {
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
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </div>
      <h3 className="text-2xl font-serif text-gray-900 mb-2">Your Wishlist is Empty</h3>
      <p className="text-gray-600 mb-8">
        Explore our collection and add your favorite items to the wishlist
      </p>
      <Link
        to="/shop"
        className="inline-flex items-center justify-center px-8 py-3 rounded-xl
          bg-pink-600 text-white hover:bg-pink-700 transition-colors duration-200"
      >
        Continue Shopping
      </Link>
    </motion.div>
  );
}

export default EmptyWishlist;