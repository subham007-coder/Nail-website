import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHeart, FiShoppingCart, FiStar } from 'react-icons/fi';
import QuickView from './QuickView';

function ProductCard({ product }) {
  const navigate = useNavigate();
  const [showQuickView, setShowQuickView] = useState(false);

  const extendedProduct = {
    ...product,
    subtext: "Long-lasting & Easy to Apply",
    shades: 3,
    reviews: 128,
    rating: 4.5,
    originalPrice: Math.round(product.price * 1.25),
    percentOff: 20
  };

  const handleCardClick = (e) => {
    // Prevent navigation if clicking on buttons
    if (e.target.closest('button')) {
      return;
    }
    navigate(`/shop/${extendedProduct.id}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    // Add to cart logic here
  };

  const handleAddToWishlist = (e) => {
    e.stopPropagation();
    // Add to wishlist logic here
  };

  return (
    <>
      <div 
        className="group relative bg-white rounded-2xl overflow-hidden cursor-pointer"
        onClick={handleCardClick}
      >
        {/* Product Image */}
        <div className="aspect-[4/5] relative overflow-hidden">
          <img
            src={extendedProduct.image}
            alt={extendedProduct.name}
            className="h-full w-full object-cover object-center"
          />
          
          {/* Labels */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {extendedProduct.isNew && (
              <span className="bg-pink-500 text-white px-2 py-0.5 rounded-sm text-xs font-medium">
                NEW
              </span>
            )}
            <span className="bg-green-500 text-white px-2 py-0.5 rounded-sm text-xs font-medium">
              {extendedProduct.percentOff}% OFF
            </span>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-3 space-y-2">
          <div>
            <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
              {extendedProduct.name}
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              {extendedProduct.subtext}
            </p>
          </div>

          {/* Ratings & Reviews */}
          <div className="flex items-center gap-2">
            <div className="flex items-center text-yellow-400">
              <FiStar className="w-3 h-3 fill-current" />
              <span className="text-xs text-gray-800 ml-1">{extendedProduct.rating}</span>
            </div>
            <span className="text-xs text-gray-500">
              ({extendedProduct.reviews} reviews)
            </span>
            <span className="text-xs text-gray-500 ml-auto">
              {extendedProduct.shades} shades
            </span>
          </div>

          {/* Pricing */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-900">
              ₹{extendedProduct.price}
            </span>
            <span className="text-xs text-gray-500 line-through">
              ₹{extendedProduct.originalPrice}
            </span>
            <span className="text-xs text-green-600 font-medium">
              {extendedProduct.percentOff}% off
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <button 
              onClick={handleAddToCart}
              className="flex-1 bg-pink-600 text-white px-3 py-2 rounded-lg text-sm font-medium
                flex items-center justify-center gap-1 hover:bg-pink-700 transition-colors whitespace-nowrap"
            >
              <FiShoppingCart className="w-4 h-4 hidden sm:block" />
              <span className="hidden xs:inline">Add to Cart</span>
            </button>
            <button 
              onClick={handleAddToWishlist}
              className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200
                hover:border-pink-600 hover:text-pink-600 transition-colors"
            >
              <FiHeart className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <QuickView 
        product={extendedProduct}
        isOpen={showQuickView}
        onClose={() => setShowQuickView(false)}
      />
    </>
  );
}

export default ProductCard;