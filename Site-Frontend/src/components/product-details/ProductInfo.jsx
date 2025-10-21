import React, { useState } from "react";
import { FiMinus, FiPlus, FiShoppingCart, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useCartActions } from "../../hooks/useCartActions";

function ProductInfo({ product }) {
  const navigate = useNavigate();
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedCurl, setSelectedCurl] = useState("D"); // Default to D Curl
  const [lengthQuantities, setLengthQuantities] = useState({
    "8mm": 0,
    "9mm": 0,
    "10mm": 1, // Default to 1 for 10mm
    "11mm": 0,
    "12mm": 0,
    "13mm": 0,
    "14mm": 0,
    "15mm": 0,
    Max: 0,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addToCartWithAuth } = useCartActions();

  const updateLengthQuantity = (length, newQuantity) => {
    setLengthQuantities((prev) => ({
      ...prev,
      [length]: Math.max(0, newQuantity),
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
      alert("Please select a curl before adding to cart.");
      return;
    }

    const selectedLengths = Object.entries(lengthQuantities).filter(
      ([_, qty]) => qty > 0
    );

    if (selectedLengths.length === 0) {
      alert("Please select at least one length with quantity.");
      return;
    }

    // Add each variant separately
    selectedLengths.forEach(([length, qty]) => {
      const productWithVariants = {
        ...product,
        selectedColor: product.colors ? product.colors[selectedColor] : null,
        selectedLength: length,
        selectedCurl,
      };
      addToCartWithAuth(productWithVariants, qty);
    });

    // Reset quantities after adding
    setLengthQuantities({
      "8mm": 0,
      "9mm": 0,
      "10mm": 0,
      "11mm": 0,
      "12mm": 0,
      "13mm": 0,
      "14mm": 0,
      "15mm": 0,
      Max: 0,
    });
    setIsModalOpen(false);
  };

  const handleStartOrder = () => {
    // Add product to cart with default values (D Curl, 10mm, quantity 1)
    const productWithVariants = {
      ...product,
      selectedColor: product.colors ? product.colors[selectedColor] : null,
      selectedLength: "10mm",
      selectedCurl: "D",
    };
    
    const success = addToCartWithAuth(productWithVariants, 1);
    
    if (success) {
      // Navigate to checkout
      navigate('/checkout');
    }
  };

  return (
    <div className="space-y-6">
      {/* Product Title & Category */}
      <div>
        <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">
          {product.name}
        </h1>
        <p className="mt-1 text-sm text-gray-500 uppercase">
          {product.category}
        </p>
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

      {/* Long Description */}
      {/* <div className="prose prose-sm max-w-none">
        <p className="text-gray-600">{product.description}</p>
      </div> */}
      {/* Short Description */}
      <div className="prose prose-sm max-w-none">
        <p className="text-gray-600">{product.shortDescription}</p>
      </div>

      {/* Colors */}
      {product.colors && (
        <div className="space-y-3">
          <p className="font-medium text-gray-900">Colors</p>
          <div className="flex gap-3">
            {product.colors.map((color, index) => (
              <button
                key={index}
                onClick={() => setSelectedColor(index)}
                className={`w-10 h-10 rounded-full border-2 transition-all ${
                  selectedColor === index
                    ? "border-pink-500 ring-2 ring-pink-200"
                    : "border-gray-200 hover:border-pink-300"
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Subtotal */}
      <div className="bg-gray-50 p-4 rounded-xl">
        <div className="flex justify-between items-center">
          <span className="font-medium text-gray-900">Subtotal</span>
          <span className="font-medium text-gray-900">
            ₹{getSubtotal().toFixed(2)}
          </span>
        </div>
        {getTotalQuantity() > 0 && (
          <p className="text-sm text-gray-600 mt-1">
            Default: 10mm, D Curl, Qty: {getTotalQuantity()}
          </p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 pt-6">
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex-1 bg-pink-600 text-white px-8 py-4 rounded-xl hover:bg-pink-700 transition-colors flex items-center justify-center gap-2 text-lg font-medium"
        >
          <FiShoppingCart className="w-5 h-5" />
          Select Options
        </button>
        <button
          onClick={handleStartOrder}
          className="flex-1 bg-gray-100 text-gray-900 px-8 py-4 rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 text-lg font-medium"
        >
          Start Order
        </button>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 space-y-6 relative"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <FiX className="w-6 h-6" />
              </button>

              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Select Length & Curl
              </h2>

              {/* Length selection */}
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {Object.entries(lengthQuantities).map(([length, qty]) => (
                  <div
                    key={length}
                    className={`flex items-center justify-between p-3 border rounded-xl ${
                      length === "10mm" && qty > 0 
                        ? "border-pink-500 bg-pink-50" 
                        : "border-gray-200"
                    }`}
                  >
                    <span className="font-medium text-gray-900">
                      {length} {length === "10mm" ? "(Recommended)" : ""}
                    </span>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateLengthQuantity(length, qty - 1)}
                        className="w-8 h-8 rounded-full border border-gray-200 hover:border-pink-500 text-gray-600 hover:text-pink-600 transition-colors flex items-center justify-center"
                      >
                        <FiMinus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center text-lg">{qty}</span>
                      <button
                        onClick={() => updateLengthQuantity(length, qty + 1)}
                        className="w-8 h-8 rounded-full border border-gray-200 hover:border-pink-500 text-gray-600 hover:text-pink-600 transition-colors flex items-center justify-center"
                      >
                        <FiPlus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Curl selection */}
              <div>
                <p className="font-medium text-gray-900 mb-2">Select Curl</p>
                <select
                  value={selectedCurl}
                  onChange={(e) => setSelectedCurl(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
                >
                  <option value="">Choose Curl</option>
                  {["C", "D", "DD"].map((curl) => (
                    <option key={curl} value={curl}>
                      {curl} {curl === "D" ? "(Recommended)" : ""}
                    </option>
                  ))}
                </select>
              </div>

              {/* Confirm button */}
              <button
                onClick={handleAddToCart}
                className="w-full bg-pink-600 text-white py-4 rounded-xl text-lg font-medium hover:bg-pink-700 transition-colors"
              >
                Add to Cart
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ProductInfo;
