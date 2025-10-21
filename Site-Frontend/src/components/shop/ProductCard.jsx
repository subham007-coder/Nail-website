import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiHeart, FiShoppingCart, FiStar } from "react-icons/fi";
import QuickView from "./QuickView";
import { useCartActions } from "../../hooks/useCartActions";

function ProductCard({ product }) {
  const navigate = useNavigate();
  const [showQuickView, setShowQuickView] = useState(false);
  const { addToCartWithAuth, addToWishlistWithAuth } = useCartActions();

  const extendedProduct = {
    id: product.id,
    name: product.name,
    image: product.image,
    price: product.price,
    // oldPrice used by QuickView; originalPrice for card display
    oldPrice: product.originalPrice ?? product.oldPrice ?? null,
    originalPrice: product.originalPrice ?? product.oldPrice ?? null,
    percentOff: (() => {
      const op = product.originalPrice ?? product.oldPrice ?? null; // original price from backend
      const pr = product.price ?? null; // current price from backend

      // Parse incoming discount (could be number, numeric string, or amount off)
      let d = null;
      if (typeof product.percentOff === "number") d = product.percentOff;
      else if (typeof product.percentOff === "string") {
        const parsed = parseFloat(product.percentOff);
        d = Number.isFinite(parsed) ? parsed : null;
      }

      // If discount provided and positive
      if (Number.isFinite(d) && d > 0) {
        // If it looks like an absolute amount (matches originalPrice - price) or is > 100
        if (op != null && pr != null && op > pr) {
          const diff = Math.round(op - pr);
          const looksLikeAmount = Math.abs(diff - Math.round(d)) <= 1 || d > 100;
          if (looksLikeAmount) {
            const computed = Math.round(((op - pr) / op) * 100);
            // Allow 100% only when price is 0; otherwise clamp to 99 to avoid false 100%
            return Math.max(0, pr === 0 ? Math.min(100, computed) : Math.min(99, computed));
          }
        }
        // Otherwise treat d as a percentage and clamp sensibly
        return Math.max(0, Math.min(99, Math.round(d)));
      }

      // Fallback: if we have price and originalPrice, compute percent for display only
      if (op != null && pr != null && op > pr) {
        const computed = Math.round(((op - pr) / op) * 100);
        return Math.max(0, pr === 0 ? Math.min(100, computed) : Math.min(99, computed));
      }

      return 0;
    })(),
    description: typeof product.description === "string" ? product.description : "",
    shortDescription: typeof product.shortDescription === "string" ? product.shortDescription : "",

    categoryName: product.categoryName || "",
    isNew: !!product.isNew,
    // Demo-only placeholders for ratings (replace when ratings are real)
    // shades: 3,
    reviews: 128,
    rating: 4.5,
  };

  // console.log("Short Description:", extendedProduct.shortDescription);


  const handleCardClick = (e) => {
    // Prevent navigation if clicking on buttons
    if (e.target.closest("button")) {
      return;
    }
    navigate(`/shop/${extendedProduct.id}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    const success = addToCartWithAuth(extendedProduct, 1);
    if (success) {
      // You can add a success notification here if needed
      console.log('Product added to cart:', extendedProduct.name);
    }
  };

  const handleAddToWishlist = (e) => {
    e.stopPropagation();
    const success = addToWishlistWithAuth(extendedProduct);
    if (success) {
      // You can add a success notification here if needed
      console.log('Product added to wishlist:', extendedProduct.name);
    }
  };

  return (
    <>
      {/* Click anywhere on the card to navigate to product details */}
      <div className="group relative bg-white overflow-hidden cursor-pointer" onClick={handleCardClick}>
        <div className="aspect-[3/4] relative overflow-hidden">
          <img
            src={extendedProduct.image}
            alt={extendedProduct.name}
            className="h-full w-full object-cover object-center"
          />

          {/* Updated Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1.5">
            {extendedProduct.isNew && (
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <span
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 
                  bg-purple-100 text-purple-700 text-[10px] font-medium tracking-wide rounded-full"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                  NEW LAUNCH
                </span>
              </motion.div>
            )}

            {extendedProduct.percentOff > 0 && (
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <span
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 
                  bg-green-100 text-green-700 text-[10px] font-medium tracking-wide rounded-full"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                  {extendedProduct.percentOff}% OFF
                </span>
              </motion.div>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="p-2 space-y-1.5">
          <div>
            <h3
              className="font-inter text-xs sm:text-sm font-medium text-gray-900 
              leading-snug line-clamp-2"
            >
              {extendedProduct.name}
            </h3>
            {extendedProduct.shortDescription && (
              <p className="font-inter text-[10px] sm:text-xs text-gray-500 mt-0.5 line-clamp-1">
                {extendedProduct.shortDescription}
              </p>
            )}
          </div>

          {/* Ratings & Reviews */}
          <div className="flex items-center gap-1.5">
            <div className="flex items-center text-yellow-400">
              <FiStar className="w-3 h-3 fill-current" />
              <span className="font-inter text-xs text-gray-800 ml-1">
                {extendedProduct.rating}
              </span>
            </div>
            <span className="font-inter text-xs text-gray-500">
              ({extendedProduct.reviews})
            </span>
            {/* <span className="font-inter text-xs text-gray-500 ml-2">
              {extendedProduct.shades} shades
            </span> */}
          </div>

          {/* Pricing */}
          <div className="flex items-center gap-1.5">
            <span className="font-inter text-sm font-medium text-gray-900">
              ₹{extendedProduct.price}
            </span>
            {extendedProduct.originalPrice && extendedProduct.originalPrice > extendedProduct.price ? (
              <span className="font-inter text-xs text-gray-500 line-through">
                ₹{extendedProduct.originalPrice}
              </span>
            ) : null}
            {extendedProduct.percentOff > 0 && (
              <span className="font-inter text-xs text-green-600 font-medium">
                {extendedProduct.percentOff}% off
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-1.5 pt-1.5">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-pink-600 text-white px-2 py-1.5 rounded-lg text-xs 
                font-inter font-medium flex items-center justify-center gap-1 
                hover:bg-pink-700 transition-colors whitespace-nowrap"
            >
              <FiShoppingCart className="w-3 h-3 hidden sm:block" />
              <span>Add to Cart</span>
            </button>
            <button
              onClick={handleAddToWishlist}
              className="w-8 h-8 flex items-center justify-center rounded-lg border 
                border-gray-200 hover:border-pink-600 hover:text-pink-600 
                transition-colors"
            >
              <FiHeart className="w-4 h-4" />
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
