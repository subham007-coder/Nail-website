import React from 'react';
import { motion } from 'framer-motion';

function ProductHeader({ category, name }) {
  return (
    <div className="bg-gradient-to-r from-pink-50 to-purple-50">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-2"
        >
          <p className="text-pink-600 text-sm md:text-base font-medium">
            {category}
          </p>
          <h1 className="text-2xl md:text-4xl font-serif text-gray-900">
            {name}
          </h1>
        </motion.div>
      </div>
    </div>
  );
}

export default ProductHeader;