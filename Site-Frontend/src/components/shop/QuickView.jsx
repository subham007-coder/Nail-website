import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiMinus, FiPlus, FiHeart, FiShoppingCart } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useCartActions } from '../../hooks/useCartActions';

function QuickView({ product, isOpen, onClose }) {
  const [selectedColor, setSelectedColor] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addToCartWithAuth, addToWishlistWithAuth } = useCartActions();

  if (!isOpen) return null;

  const handleAddToCart = () => {
    const success = addToCartWithAuth(product, quantity);
    if (success) {
      onClose(); // Close quick view on successful add
    }
  };

  const handleAddToWishlist = () => {
    const success = addToWishlistWithAuth(product);
    if (success) {
      onClose(); // Close quick view on successful add
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
          onClick={onClose}
        />

        {/* Modal */}
        <div className="flex min-h-full items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative w-full max-w-4xl rounded-2xl bg-white shadow-xl"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 p-2 text-gray-400 hover:text-gray-500"
            >
              <FiX className="h-6 w-6" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Product Images */}
              <div className="relative aspect-square md:aspect-auto">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover object-center rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none"
                />
                {product.isNew && (
                  <span className="absolute top-4 left-4 bg-pink-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                    New
                  </span>
                )}
              </div>

              {/* Product Details */}
              <div className="p-6 md:p-8 space-y-6">
                <div className="space-y-2">
                  <h2 className="text-2xl font-medium text-gray-900">
                    {product.name}
                  </h2>
                  <p className="text-sm text-gray-500">{product.categoryName || product.category}</p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="text-2xl font-medium text-gray-900">₹{product.price}</p>
                    {(product.originalPrice || product.oldPrice) && (
                      <p className="text-sm text-gray-500 line-through">₹{product.originalPrice || product.oldPrice}</p>
                    )}
                    {Number(product.percentOff) > 0 && (
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-medium rounded-full">
                        {Math.round(product.percentOff)}% OFF
                      </span>
                    )}
                  </div>
                </div>

                {/* Color Options */}
                {product.colors && (
                  <div className="space-y-3">
                    <p className="text-sm font-medium text-gray-900">Colors</p>
                    <div className="flex gap-2">
                      {product.colors.map((color, index) => (
                        <button
                          key={index}
                          className={`w-8 h-8 rounded-full border-2 transition-all
                            ${selectedColor === index 
                              ? 'border-pink-500 ring-2 ring-pink-200' 
                              : 'border-white hover:border-gray-300'}`}
                          style={{ backgroundColor: color }}
                          onClick={() => setSelectedColor(index)}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity Selector */}
                <div className="space-y-3">
                  <p className="text-sm font-medium text-gray-900">Quantity</p>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 rounded-full border border-gray-200 hover:border-pink-500 
                        text-gray-600 hover:text-pink-600 transition-colors"
                    >
                      <FiMinus className="w-4 h-4" />
                    </button>
                    <span className="w-12 text-center text-gray-900">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2 rounded-full border border-gray-200 hover:border-pink-500 
                        text-gray-600 hover:text-pink-600 transition-colors"
                    >
                      <FiPlus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={handleAddToCart}
                    className="w-full bg-pink-600 text-white py-3 px-6 rounded-xl 
                      hover:bg-pink-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <FiShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </button>
                  <button
                    onClick={handleAddToWishlist}
                    className="w-full bg-gray-100 text-gray-900 py-3 px-6 rounded-xl 
                      hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                  >
                    <FiHeart className="w-5 h-5" />
                    Add to Wishlist
                  </button>
                </div>

                {/* View Full Details Link */}
                <Link
                  to={`/shop/${product.id}`}
                  className="block text-center text-sm text-pink-600 hover:text-pink-700 
                    font-medium mt-4"
                >
                  View Full Details
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}

export default QuickView;