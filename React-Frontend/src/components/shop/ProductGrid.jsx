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
      image: "https://nailknack.com/cdn/shop/files/AnyConv.com__Untitleddesign_1_e0aced8b-e2a2-407b-9cd1-89d6d6d38697.webp?v=1699194525&width=360",
      category: "French Nails",
      // ...other product details
    },
    {
      id: 1,
      name: "Classic French Tips",
      price: 299,
      image: "https://nailknack.com/cdn/shop/files/AnyConv.com__Untitleddesign_1_e0aced8b-e2a2-407b-9cd1-89d6d6d38697.webp?v=1699194525&width=360",
      category: "French Nails",
      // ...other product details
    },
    {
      id: 1,
      name: "Classic French Tips",
      price: 299,
      image: "https://nailknack.com/cdn/shop/files/AnyConv.com__Untitleddesign_1_e0aced8b-e2a2-407b-9cd1-89d6d6d38697.webp?v=1699194525&width=360",
      category: "French Nails",
      // ...other product details
    },
    {
      id: 1,
      name: "Classic French Tips",
      price: 299,
      image: "https://nailknack.com/cdn/shop/files/AnyConv.com__Untitleddesign_1_e0aced8b-e2a2-407b-9cd1-89d6d6d38697.webp?v=1699194525&width=360",
      category: "French Nails",
      // ...other product details
    },
    {
      id: 1,
      name: "Classic French Tips",
      price: 299,
      image: "https://nailknack.com/cdn/shop/files/AnyConv.com__Untitleddesign_1_e0aced8b-e2a2-407b-9cd1-89d6d6d38697.webp?v=1699194525&width=360",
      category: "French Nails",
      // ...other product details
    },
    {
      id: 1,
      name: "Classic French Tips",
      price: 299,
      image: "https://nailknack.com/cdn/shop/files/AnyConv.com__Untitleddesign_1_e0aced8b-e2a2-407b-9cd1-89d6d6d38697.webp?v=1699194525&width=360",
      category: "French Nails",
      // ...other product details
    },
    
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