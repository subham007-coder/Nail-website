import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function WishlistItem({ product, onRemove, onMoveToCart }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-2xl p-4 shadow-soft flex flex-col md:flex-row gap-4"
    >
      {/* Product Image */}
      <div className="w-full md:w-48 h-48 rounded-xl overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Product Details */}
      <div className="flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          <Link 
            to={`/shop/${product.id}`}
            className="text-xl font-medium text-gray-900 hover:text-pink-600 transition-colors"
          >
            {product.name}
          </Link>
          <p className="text-sm text-gray-500">{product.category}</p>
          <div className="flex items-center gap-2">
            <p className="text-lg font-medium text-gray-900">₹{product.price}</p>
            {product.oldPrice && (
              <p className="text-sm text-gray-500 line-through">₹{product.oldPrice}</p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2 mt-4">
          <button
            onClick={() => onMoveToCart(product.id)}
            className="flex-1 bg-pink-600 text-white px-6 py-2.5 rounded-xl hover:bg-pink-700 
              transition-colors duration-200 text-sm font-medium"
          >
            Move to Cart
          </button>
          <button
            onClick={() => onRemove(product.id)}
            className="flex-1 bg-gray-100 text-gray-700 px-6 py-2.5 rounded-xl hover:bg-gray-200 
              transition-colors duration-200 text-sm font-medium"
          >
            Remove
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default WishlistItem;