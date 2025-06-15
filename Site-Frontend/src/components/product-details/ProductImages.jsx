import React, { useState } from 'react';
import { motion } from 'framer-motion';

function ProductImages({ images }) {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="grid gap-4 lg:grid-cols-5">
      {/* Thumbnails */}
      <div className="order-2 lg:order-1 flex lg:flex-col gap-4 overflow-x-auto lg:overflow-x-hidden">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors
              ${selectedImage === index ? 'border-pink-500' : 'border-transparent'}`}
          >
            <img
              src={image}
              alt={`Product view ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div className="order-1 lg:order-2 lg:col-span-4">
        <motion.div
          key={selectedImage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="aspect-square rounded-2xl overflow-hidden bg-gray-100"
        >
          <img
            src={images[selectedImage]}
            alt="Product main view"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>
    </div>
  );
}

export default ProductImages;