import React, { useState } from 'react';
import { FiMinus, FiPlus, FiHeart, FiShoppingCart } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useCartActions } from '../../hooks/useCartActions';

function ProductInfo({ product }) {
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedCurl, setSelectedCurl] = useState('');
  const [lengthQuantities, setLengthQuantities] = useState({
    '8mm': 0,
    '9mm': 0,
    '10mm': 0,
    '11mm': 0,
    '12mm': 0,
    '13mm': 0
  });
  const { addToCartWithAuth } = useCartActions();

  const updateLengthQuantity = (length, newQuantity) => {
    setLengthQuantities(prev => ({
      ...prev,
      [length]: Math.max(0, newQuantity)
    }));
  };

  const getTotalQuantity = () => {
    return Object.values(lengthQuantities).reduce((sum, qty) => sum + qty, 0);
  };

  const getSubtotal = () => {
    return getTotalQuantity() * (product.price || 0);
  };

  const handleAddToCart = () => {
    if (!selectedCurl) {
      alert('Please select a curl before adding to cart.');
      return;
    }

    const selectedLengths = Object.entries(lengthQuantities)
      .filter(([_, qty]) => qty > 0);

    if (selectedLengths.length === 0) {
      alert('Please select at least one length with quantity before adding to cart.');
      return;
    }

    // Add each length variant as a separate cart item
    selectedLengths.forEach(([length, qty]) => {
      const productWithVariants = {
        ...product,
        selectedColor: product.colors ? product.colors[selectedColor] : null,
        selectedLength: length,
        selectedCurl
      };
      addToCartWithAuth(productWithVariants, qty);
    });

    // Reset quantities after adding to cart
    setLengthQuantities({
      '8mm': 0,
      '9mm': 0,
      '10mm': 0,
      '11mm': 0,
      '12mm': 0,
      '13mm': 0
    });
  };

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

      {/* Length Options */}
      <div className="space-y-3">
        <p className="font-medium text-gray-900">Select Length</p>
        <div className="space-y-3">
          {Object.entries(lengthQuantities).map(([length, qty]) => (
            <div key={length} className="flex items-center justify-between p-3 border border-gray-200 rounded-xl">
              <span className="font-medium text-gray-900">{length}</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => updateLengthQuantity(length, qty - 1)}
                  className="w-8 h-8 rounded-full border border-gray-200 hover:border-pink-500
                    text-gray-600 hover:text-pink-600 transition-colors flex items-center justify-center"
                >
                  <FiMinus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center text-lg">{qty}</span>
                <button
                  onClick={() => updateLengthQuantity(length, qty + 1)}
                  className="w-8 h-8 rounded-full border border-gray-200 hover:border-pink-500
                    text-gray-600 hover:text-pink-600 transition-colors flex items-center justify-center"
                >
                  <FiPlus className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Curl Options */}
      <div className="space-y-3">
        <p className="font-medium text-gray-900">Select Curl</p>
        <select
          value={selectedCurl}
          onChange={(e) => setSelectedCurl(e.target.value)}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
        >
          <option value="">Choose Curl</option>
          {['C', 'D', 'DD'].map(curl => (
            <option key={curl} value={curl}>{curl}</option>
          ))}
        </select>
      </div>

      {/* Subtotal */}
      <div className="bg-gray-50 p-4 rounded-xl">
        <div className="flex justify-between items-center">
          <span className="font-medium text-gray-900">Subtotal</span>
          <span className="font-medium text-gray-900">₹{getSubtotal().toFixed(2)}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 pt-6">
        <button
          onClick={handleAddToCart}
          className="flex-1 bg-pink-600 text-white px-8 py-4 rounded-xl hover:bg-pink-700
            transition-colors flex items-center justify-center gap-2 text-lg font-medium"
        >
          <FiShoppingCart className="w-5 h-5" />
          Add to Cart
        </button>
        <button
          className="flex-1 bg-gray-100 text-gray-900 px-8 py-4 rounded-xl hover:bg-gray-200
            transition-colors flex items-center justify-center gap-2 text-lg font-medium"
        >
          Start Order
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