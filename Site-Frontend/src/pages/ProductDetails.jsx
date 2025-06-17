// dsubh\Desktop\Nail Site\Site-Frontend\src\pages\ProductDetails.jsx
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FiTruck, FiShield, FiRepeat, FiAward, FiStar } from 'react-icons/fi';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductHeader from '../components/product-details/ProductHeader';
import ProductImages from '../components/product-details/ProductImages';
import ProductInfo from '../components/product-details/ProductInfo';
import RelatedProducts from '../components/product-details/RelatedProducts';

function ProductDetails() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('description');

  // Enhanced product data
  const product = {
    id,
    name: "Classic French Tips",
    category: "French Nails",
    price: 299,
    oldPrice: 399,
    description: "Elegant and timeless French tips that add sophistication to any look. Perfect for both casual and formal occasions.",
    longDescription: `
      Our Classic French Tips are meticulously crafted to provide you with the perfect manicure experience. 
      Each set includes 24 nails in 12 different sizes to ensure a perfect fit for every finger.
      
      The high-quality material ensures durability and a natural look that lasts up to 2 weeks with proper care.
      Easy to apply and remove, these press-on nails are perfect for both beginners and nail enthusiasts.
    `,
    rating: 4.8,
    reviewCount: 128,
    images: [
      "https://nailknack.com/cdn/shop/files/AnyConv.com__Untitleddesign_1_e0aced8b-e2a2-407b-9cd1-89d6d6d38697.webp?v=1699194525&width=360",
      "https://nailknack.com/cdn/shop/files/AnyConv.com__Untitleddesign_2_d28a6844-4386-4286-84a0-284ef960047e.webp?v=1699124940&width=720",
      // Add more images
    ],
    colors: ["#FFF4E6", "#FFE5D4", "#FFD6C2"],
    features: [
      "Professional-grade materials",
      "Long-lasting wear up to 2 weeks",
      "Easy application and removal",
      "Includes nail file and prep pad",
      "Reusable with proper care"
    ],
    benefits: [
      "Salon-quality nails at home",
      "No drying time needed",
      "No nail damage",
      "Perfect for special occasions",
      "Cost-effective solution"
    ],
    specifications: {
      "Material": "High-quality ABS plastic",
      "Quantity": "24 nails (12 sizes)",
      "Duration": "Up to 2 weeks",
      "Finish": "Glossy",
      "Style": "French Tips",
      "Reusable": "Yes (with proper care)"
    }
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

  const renderTabContent = () => {
    switch (activeTab) {
      case 'description':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">Product Description</h3>
              <p className="text-gray-600 leading-relaxed">{product.longDescription}</p>
              
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Key Benefits</h4>
                <ul className="space-y-2">
                  {product.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-600">
                      <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">Specifications</h3>
              <div className="grid gap-4">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="grid grid-cols-2 text-sm border-b border-gray-100 py-2">
                    <span className="text-gray-500">{key}</span>
                    <span className="text-gray-900">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      
      case 'features':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">Key Features</h3>
              <div className="grid gap-6">
                {[
                  {
                    title: "Professional Grade Materials",
                    description: "Made with high-quality ABS plastic for durability and natural look",
                    icon: "🌟"
                  },
                  {
                    title: "Easy Application",
                    description: "No salon visit needed - apply at home in minutes",
                    icon: "⚡"
                  },
                  {
                    title: "Long-Lasting Wear",
                    description: "Stays perfect for up to 2 weeks with proper care",
                    icon: "⏳"
                  },
                  {
                    title: "Reusable Design",
                    description: "Can be reused multiple times with proper care and maintenance",
                    icon: "♻️"
                  }
                ].map((feature, index) => (
                  <div key={index} className="flex gap-4 p-4 bg-gray-50 rounded-xl">
                    <span className="text-2xl">{feature.icon}</span>
                    <div>
                      <h4 className="font-medium text-gray-900">{feature.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">What's Included</h3>
              <ul className="space-y-4">
                {[
                  "24 press-on nails in 12 sizes",
                  "Professional nail file",
                  "Cuticle stick",
                  "Nail prep pad",
                  "Strong nail adhesive",
                  "Detailed instruction manual",
                  "Storage case"
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3 text-gray-600">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      
      case 'reviews':
        return (
          <div className="space-y-8">
            {/* Reviews Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <h3 className="text-lg font-medium text-gray-900">Customer Reviews</h3>
              <button className="bg-pink-600 text-white px-6 py-2 rounded-lg hover:bg-pink-700 
                transition-colors text-sm font-medium">
                Write a Review
              </button>
            </div>

            {/* Reviews List */}
            <div className="space-y-6">
              {[
                {
                  name: "Sarah Johnson",
                  rating: 5,
                  date: "2 weeks ago",
                  comment: "These nails are amazing! They look so natural and lasted for 2 full weeks. Will definitely buy again.",
                  verified: true
                },
                {
                  name: "Emma Thompson",
                  rating: 4,
                  date: "1 month ago",
                  comment: "Great quality and beautiful design. Would give 5 stars but took some practice to apply correctly.",
                  verified: true
                },
                {
                  name: "Lisa Chen",
                  rating: 5,
                  date: "2 months ago",
                  comment: "Perfect for special occasions! Got so many compliments on these.",
                  verified: true
                }
              ].map((review, index) => (
                <div key={index} className="border-b border-gray-100 pb-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900">{review.name}</span>
                      {review.verified && (
                        <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                          Verified Purchase
                        </span>
                      )}
                    </div>
                    <span className="text-sm text-gray-500">{review.date}</span>
                  </div>
                  
                  <div className="flex gap-1 text-yellow-400 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <FiStar key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-current' : ''}`} />
                    ))}
                  </div>
                  
                  <p className="text-gray-600">{review.comment}</p>
                </div>
              ))}
            </div>

            {/* Load More Button */}
            <div className="text-center">
              <button className="text-pink-600 font-medium hover:text-pink-700 text-sm">
                Load More Reviews
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <ProductHeader 
        category={product.category}
        name={product.name}
      />

      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex text-sm">
            <Link to="/" className="text-gray-600 hover:text-pink-600">Home</Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link to="/shop" className="text-gray-600 hover:text-pink-600">Shop</Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-pink-600">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <ProductImages images={product.images} />
          <ProductInfo product={product} />
        </div>

        {/* Features Section */}
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            {
              icon: <FiTruck />,
              title: "Free Shipping",
              desc: "On orders above ₹499"
            },
            {
              icon: <FiShield />,
              title: "Secure Payments",
              desc: "100% secure checkout"
            },
            {
              icon: <FiRepeat />,
              title: "Easy Returns",
              desc: "7-day return policy"
            },
            {
              icon: <FiAward />,
              title: "Quality Promise",
              desc: "Authentic products"
            }
          ].map((item, index) => (
            <div key={index} className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-xl">
              <span className="text-2xl text-pink-600 mb-2">{item.icon}</span>
              <h3 className="font-medium text-gray-900">{item.title}</h3>
              <p className="text-sm text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Product Details Tabs */}
        <div className="mt-4">
          <div className="border-b border-gray-200">
            <nav className="flex gap-8">
              {[
                { id: 'description', label: 'Description' },
                { id: 'features', label: 'Features' },
                { id: 'reviews', label: 'Reviews' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 text-sm font-medium border-b-2 transition-colors
                    ${activeTab === tab.id 
                      ? 'border-pink-600 text-pink-600' 
                      : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="py-8">
            {renderTabContent()}
          </div>
        </div>

        {/* Customer Reviews Summary */}
        <div className="mt-4 bg-gray-50 rounded-2xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-medium text-gray-900 mb-4">Customer Reviews</h3>
              <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="text-4xl font-medium text-gray-900">{product.rating}</div>
                <div>
                  <div className="flex gap-1 text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <FiStar key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`} />
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Based on {product.reviewCount} reviews</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((star) => (
                <div key={star} className="flex items-center gap-4">
                  <div className="flex gap-1 text-yellow-400">
                    {[...Array(star)].map((_, i) => (
                      <FiStar key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-yellow-400" 
                      style={{ width: `${Math.random() * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related Products */}
        <RelatedProducts products={relatedProducts} />
      </div>

      <Footer />
    </div>
  );
}

export default ProductDetails;