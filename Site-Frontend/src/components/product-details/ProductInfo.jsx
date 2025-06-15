import React, { useState } from 'react';
import { FiMinus, FiPlus, FiHeart, FiShoppingCart } from 'react-icons/fi';
import { motion } from 'framer-motion';

function ProductInfo({ product }) {
  const [selectedColor, setSelectedColor] = useState(0);
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="space-y-6">
      {/* Product Title & Category */}
      <div>
        <h1 className="text-2xl md:text-3xl font-medium text-gray-900">
          {product.name}
        </h1>
        <p className="mt-2 text-gray-500">{product.category}</p>
      </div>

      {/* Price */}
      <div className="flex items-center gap-4">
        <p className="text-2xl md:text-3xl font-medium text-gray-900">
          ₹{product.price}
        </p>
        {product.oldPrice && (
          <p className="text-lg text-gray-500 line-through">
            ₹{product.oldPrice}
          </p>
        )}
      </div>

      {/* Description */}
      <div className="prose prose-sm max-w-none">
        <p className="text-gray-600">{product.description}</p>
      </div>

      {/* Color Options */}
      {product.colors && (
        <div className="space-y-3">
          <p className="font-medium text-gray-900">Colors</p>
          <div className="flex gap-3">
            {product.colors.map((color, index) => (
              <button
                key={index}
                onClick={() => setSelectedColor(index)}
                className={`w-10 h-10 rounded-full border-2 transition-all
                  ${selectedColor === index 
                    ? 'border-pink-500 ring-2 ring-pink-200' 
                    : 'border-white hover:border-gray-300'}`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Quantity Selector */}
      <div className="space-y-3">
        <p className="font-medium text-gray-900">Quantity</p>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="p-2 rounded-full border border-gray-200 hover:border-pink-500 
              text-gray-600 hover:text-pink-600 transition-colors"
          >
            <FiMinus className="w-5 h-5" />
          </button>
          <span className="w-12 text-center text-lg">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="p-2 rounded-full border border-gray-200 hover:border-pink-500 
              text-gray-600 hover:text-pink-600 transition-colors"
          >
            <FiPlus className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 pt-6">
        <button className="flex-1 bg-pink-600 text-white px-8 py-4 rounded-xl hover:bg-pink-700 
          transition-colors flex items-center justify-center gap-2 text-lg font-medium">
          <FiShoppingCart className="w-5 h-5" />
          Add to Cart
        </button>
        <button className="flex-1 bg-gray-100 text-gray-900 px-8 py-4 rounded-xl hover:bg-gray-200 
          transition-colors flex items-center justify-center gap-2 text-lg font-medium">
          <FiHeart className="w-5 h-5" />
          Add to Wishlist
        </button>
      </div>

      {/* Additional Info */}
      <div className="border-t pt-6 mt-8 space-y-4">
        <div>
          <p className="font-medium text-gray-900">Product Details</p>
          <ul className="mt-2 space-y-2 text-sm text-gray-600">
            {product.details?.map((detail, index) => (
              <li key={index}>{detail}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ProductInfo;