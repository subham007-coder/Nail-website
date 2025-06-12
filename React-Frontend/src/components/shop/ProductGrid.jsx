import React from 'react';
import { motion } from 'framer-motion';
import ProductCard from './ProductCard';

function ProductGrid({ filters }) {
  // Sample products data - replace with your actual data
  const products = [
    {
      id: 1,
      name: "Classic French Tips",
      price: 299,
      image: "/images/products/french-tips.jpg",
      category: "French Nails",
      // ...other product details
    },
    // ...more products
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <ProductCard product={product} />
        </motion.div>
      ))}
    </div>
  );
}

export default ProductGrid;