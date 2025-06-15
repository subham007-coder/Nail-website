import React from 'react';
import ProductCard from '../shop/ProductCard';

function RelatedProducts({ products }) {
  return (
    <section className="py-12">
      <h2 className="text-2xl font-serif text-gray-900 mb-8">You May Also Like</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default RelatedProducts;