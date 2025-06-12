import React from 'react';
import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  return (
    <div className="group">
      <div className="aspect-square overflow-hidden rounded-2xl bg-gray-100 relative">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
        />
        <button className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm
                         px-6 py-2 rounded-full text-sm font-medium text-gray-900
                         opacity-0 transform translate-y-4 transition-all duration-300
                         group-hover:opacity-100 group-hover:translate-y-0
                         hover:bg-white">
          Quick View
        </button>
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-medium text-gray-900">
          <Link to={`/shop/${product.id}`} className="hover:text-pink-600 transition-colors">
            {product.name}
          </Link>
        </h3>
        <p className="mt-1 text-sm text-gray-500">{product.category}</p>
        <p className="mt-1 text-lg font-medium text-gray-900">₹{product.price}</p>
      </div>
    </div>
  );
}

export default ProductCard;