import React from 'react';
import { motion } from 'framer-motion';
import ProductCard from './ProductCard';

function ProductGrid({ filters }) {
  // Sample products data with additional properties
  const productCategories = {
    "New Arrivals": [
      {
        id: 1,
        name: "Classic French Tips",
        price: 299,
        image: "https://nailknack.com/cdn/shop/files/AnyConv.com__Untitleddesign_1_e0aced8b-e2a2-407b-9cd1-89d6d6d38697.webp?v=1699194525&width=360",
        category: "French Nails",
        isNew: true,
        isPopular: false,
        colors: ["#FFF4E6", "#FFE5D4", "#FFD6C2"],
        inWishlist: false,
        inCart: false,
      },
      {
        id: 2,
        name: "Classic French Tips",
        price: 299,
        image: "https://nailknack.com/cdn/shop/files/AnyConv.com__Untitleddesign_1_e0aced8b-e2a2-407b-9cd1-89d6d6d38697.webp?v=1699194525&width=360",
        category: "French Nails",
        isNew: true,
        isPopular: false,
        colors: ["#FFF4E6", "#FFE5D4", "#FFD6C2"],
        inWishlist: false,
        inCart: false,
      },
      {
        id: 3,
        name: "Classic French Tips",
        price: 299,
        image: "https://nailknack.com/cdn/shop/files/AnyConv.com__Untitleddesign_1_e0aced8b-e2a2-407b-9cd1-89d6d6d38697.webp?v=1699194525&width=360",
        category: "French Nails",
        isNew: true,
        isPopular: false,
        colors: ["#FFF4E6", "#FFE5D4", "#FFD6C2"],
        inWishlist: false,
        inCart: false,
      },
      {
        id: 4,
        name: "Classic French Tips",
        price: 299,
        image: "https://nailknack.com/cdn/shop/files/AnyConv.com__Untitleddesign_1_e0aced8b-e2a2-407b-9cd1-89d6d6d38697.webp?v=1699194525&width=360",
        category: "French Nails",
        isNew: true,
        isPopular: false,
        colors: ["#FFF4E6", "#FFE5D4", "#FFD6C2"],
        inWishlist: false,
        inCart: false,
      },
      // ...more new products
    ],
    "Popular Products": [
      {
        id: 1,
        name: "Glitter Ombre",
        price: 399,
        image: "https://nailknack.com/cdn/shop/files/AnyConv.com__Untitleddesign_1_e0aced8b-e2a2-407b-9cd1-89d6d6d38697.webp?v=1699194525&width=360",
        category: "Ombre Nails",
        isNew: false,
        isPopular: true,
        colors: ["#FFD6C2", "#FFC5AE", "#FFB49A"],
        inWishlist: false,
        inCart: false,
      },
      {
        id: 2,
        name: "Glitter Ombre",
        price: 399,
        image: "https://nailknack.com/cdn/shop/files/AnyConv.com__Untitleddesign_1_e0aced8b-e2a2-407b-9cd1-89d6d6d38697.webp?v=1699194525&width=360",
        category: "Ombre Nails",
        isNew: false,
        isPopular: true,
        colors: ["#FFD6C2", "#FFC5AE", "#FFB49A"],
        inWishlist: false,
        inCart: false,
      },
      // ...more popular products
    ],
    "Classic Collection": [
      // ...classic products
    ]
  };

  return (
    <div className="space-y-6">
      {Object.entries(productCategories).map(([category, products]) => (
        <div key={category} className="space-y-3"> {/* Reduced vertical gap */}
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-xl font-serif text-gray-900 px-2" 
          >
            {category}
          </motion.h2>
          
          <div className="grid grid-cols-2 gap-2 sm:gap-4"> {/* Updated grid and gaps */}
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
        </div>
      ))}
    </div>
  );
}

export default ProductGrid;