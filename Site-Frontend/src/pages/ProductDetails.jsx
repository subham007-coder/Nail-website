// dsubh\Desktop\Nail Site\Site-Frontend\src\pages\ProductDetails.jsx
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductHeader from '../components/product-details/ProductHeader';
import ProductImages from '../components/product-details/ProductImages';
import ProductInfo from '../components/product-details/ProductInfo';
import RelatedProducts from '../components/product-details/RelatedProducts';

function ProductDetails() {
  const { id } = useParams();

  // Sample product data
  const product = {
    id,
    name: "Classic French Tips",
    category: "French Nails",
    price: 299,
    oldPrice: 399,
    description: "Elegant and timeless French tips that add sophistication to any look. Perfect for both casual and formal occasions.",
    images: [
      "https://nailknack.com/cdn/shop/files/AnyConv.com__Untitleddesign_1_e0aced8b-e2a2-407b-9cd1-89d6d6d38697.webp?v=1699194525&width=360",
      "https://nailknack.com/cdn/shop/files/AnyConv.com__Untitleddesign_2_d28a6844-4386-4286-84a0-284ef960047e.webp?v=1699124940&width=720",
      // Add more images
    ],
    colors: ["#FFF4E6", "#FFE5D4", "#FFD6C2"],
    details: [
      "Professional-grade materials",
      "Long-lasting wear up to 2 weeks",
      "Easy application and removal",
      "Includes nail file and prep pad",
      "Reusable with proper care"
    ]
  };

  // Sample related products
  const relatedProducts = [
    {
      id: 'prod-001',
      name: 'Glitter Ombre Nails',
      category: 'Ombre Nails',
      price: 399,
      image: 'https://nailknack.com/cdn/shop/files/AnyConv.com__Untitleddesign_2_d28a6844-4386-4286-84a0-284ef960047e.webp?v=1699124940&width=720',
      isNew: true,
      colors: ['#FFD6C2', '#FFC5AE', '#FFB49A']
    },
    {
      id: 'prod-002',
      name: 'Pearl White French Tips',
      category: 'French Nails',
      price: 349,
      image: 'https://nailknack.com/cdn/shop/files/AnyConv.com__Untitleddesign_2_d28a6844-4386-4286-84a0-284ef960047e.webp?v=1699124940&width=720',
      isPopular: true,
      colors: ['#FFFFFF', '#F8F8F8', '#F0F0F0']
    },
    {
      id: 'prod-003',
      name: 'Pink Shimmer Nails',
      category: 'Glitter Nails',
      price: 449,
      image: 'https://nailknack.com/cdn/shop/files/AnyConv.com__Untitleddesign_2_d28a6844-4386-4286-84a0-284ef960047e.webp?v=1699124940&width=720',
      colors: ['#FFB6C1', '#FFC0CB', '#FFD1DC']
    },
    {
      id: 'prod-004',
      name: 'Matte Black Stiletto',
      category: 'Stiletto Nails',
      price: 499,
      image: 'https://nailknack.com/cdn/shop/files/AnyConv.com__Untitleddesign_2_d28a6844-4386-4286-84a0-284ef960047e.webp?v=1699124940&width=720',
      isNew: true,
      colors: ['#000000', '#1A1A1A', '#333333']
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Product Header */}
      <ProductHeader 
        category={product.category}
        name={product.name}
      />

      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex text-sm">
            <Link to="/" className="text-gray-600 hover:text-pink-600">
              Home
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link to="/shop" className="text-gray-600 hover:text-pink-600">
              Shop
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-pink-600">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <ProductImages images={product.images} />
          <ProductInfo product={product} />
        </div>

        {/* Related Products */}
        <RelatedProducts products={relatedProducts} />
      </div>

      <Footer />
    </div>
  );
}

export default ProductDetails;