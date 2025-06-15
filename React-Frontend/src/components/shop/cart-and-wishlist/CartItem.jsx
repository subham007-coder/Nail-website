import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function CartItem({ product, onRemove, onQuantityChange }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-2xl p-4 shadow-soft flex flex-col md:flex-row gap-4"
    >
      {/* Product Image */}
      <Link to={`/shop/${product.id}`} className="w-full md:w-48 h-48 rounded-xl overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </Link>

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
          
          {/* Price and Quantity Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4 mt-4">
            <div className="flex items-center gap-2">
              <p className="text-lg font-medium text-gray-900">₹{product.price}</p>
              {product.oldPrice && (
                <p className="text-sm text-gray-500 line-through">₹{product.oldPrice}</p>
              )}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => onQuantityChange(product.id, product.quantity - 1)}
                disabled={product.quantity <= 1}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center
                  hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                -
              </button>
              <span className="w-12 text-center">{product.quantity}</span>
              <button
                onClick={() => onQuantityChange(product.id, product.quantity + 1)}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center
                  hover:bg-gray-200"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2 mt-4">
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

export default CartItem;