import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function ProductCard({ product }) {
  const [showColors, setShowColors] = useState(false);

  return (
    <div className="group relative">
      <div className="aspect-square overflow-hidden rounded-2xl bg-gray-100 relative">
        {/* Product Labels */}
        <div className="absolute top-2 left-2 z-10 flex flex-col gap-2">
          {product.isNew && (
            <span className="bg-pink-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              New
            </span>
          )}
          {product.isPopular && (
            <span className="bg-purple-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              Popular
            </span>
          )}
        </div>

        {/* Product Image */}
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
        />

        {/* Quick Actions Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 
                      transition-opacity duration-300 flex flex-col items-center justify-center gap-3">
          <button className="bg-white/90 backdrop-blur-sm px-6 py-2 rounded-full text-sm 
                         font-medium text-gray-900 hover:bg-white transform hover:scale-105 
                         transition-all duration-200">
            Quick View
          </button>
          <button className="bg-pink-500/90 backdrop-blur-sm px-6 py-2 rounded-full text-sm 
                         font-medium text-white hover:bg-pink-500 transform hover:scale-105 
                         transition-all duration-200">
            Add to Cart
          </button>
        </div>

        {/* Wishlist Button */}
        <button className="absolute top-2 right-2 p-2 rounded-full bg-white/90 backdrop-blur-sm
                       hover:bg-white transition-colors duration-200">
          <svg className="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>

      {/* Product Info */}
      <div className="mt-4 space-y-2">
        <h3 className="text-lg font-medium text-gray-900">
          <Link to={`/shop/${product.id}`} className="hover:text-pink-600 transition-colors">
            {product.name}
          </Link>
        </h3>
        <p className="text-sm text-gray-500">{product.category}</p>
        <p className="text-lg font-medium text-gray-900">₹{product.price}</p>

        {/* Color Options */}
        {product.colors && (
          <div className="relative">
            <button
              onClick={() => setShowColors(!showColors)}
              className="text-sm text-gray-600 hover:text-pink-600 transition-colors"
            >
              See More Colors ({product.colors.length})
            </button>
            
            {showColors && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-full left-0 mt-2 p-2 bg-white rounded-xl shadow-lg z-20"
              >
                <div className="flex gap-2">
                  {product.colors.map((color, index) => (
                    <div
                      key={index}
                      className="w-6 h-6 rounded-full border-2 border-white shadow-sm cursor-pointer"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductCard;