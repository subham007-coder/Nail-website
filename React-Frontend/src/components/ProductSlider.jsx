import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { FiHeart, FiEye, FiShoppingCart } from 'react-icons/fi';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const products = [
  {
    id: 1,
    name: 'Classic French Press On Nails',
    price: 699,
    salePrice: 299,
    images: {
      default: 'https://nailknack.com/cdn/shop/files/AnyConv.com__Untitleddesign_1_82386175-a9f3-4a7e-b574-99979d66cf9a.webp?v=1699124940&width=533',
      hover: 'https://nailknack.com/cdn/shop/files/AnyConv.com__Untitleddesign_2_d28a6844-4386-4286-84a0-284ef960047e.webp?v=1699124940&width=720'
    }
  },{
    id: 2,
    name: 'Elegant Almond Press On Nails',
    price: 799,
    salePrice: 349,
    images: {
      default: 'https://nailknack.com/cdn/shop/files/AnyConv.com__Untitleddesign_1_82386175-a9f3-4a7e-b574-99979d66cf9a.webp?v=1699124940&width=533',
      hover: 'https://nailknack.com/cdn/shop/files/AnyConv.com__Untitleddesign_2_d28a6844-4386-4286-84a0-284ef960047e.webp?v=1699124940&width=720'
    }
  },{
    id: 3,
    name: 'Glamorous Glitter Press On Nails',
    price: 899,
    salePrice: 399,
    images: {
      default: 'https://nailknack.com/cdn/shop/files/AnyConv.com__Untitleddesign_1_82386175-a9f3-4a7e-b574-99979d66cf9a.webp?v=1699124940&width=533',
      hover: 'https://nailknack.com/cdn/shop/files/AnyConv.com__Untitleddesign_2_d28a6844-4386-4286-84a0-284ef960047e.webp?v=1699124940&width=720'
    }
  },{
    id: 4,
    name: 'Matte Black Press On Nails',
    price: 799,
    salePrice: 349,
    images: {
      default: 'https://nailknack.com/cdn/shop/files/AnyConv.com__Untitleddesign_1_82386175-a9f3-4a7e-b574-99979d66cf9a.webp?v=1699124940&width=533',
      hover: 'https://nailknack.com/cdn/shop/files/AnyConv.com__Untitleddesign_2_d28a6844-4386-4286-84a0-284ef960047e.webp?v=1699124940&width=720'
    }
  },{
    id: 5,
    name: 'French Tip Press On Nails',
    price: 699,
    salePrice: 299,
    images: {
      default: 'https://nailknack.com/cdn/shop/files/AnyConv.com__Untitleddesign_1_82386175-a9f3-4a7e-b574-99979d66cf9a.webp?v=1699124940&width=533',
      hover: 'https://nailknack.com/cdn/shop/files/AnyConv.com__Untitleddesign_2_d28a6844-4386-4286-84a0-284ef960047e.webp?v=1699124940&width=720'
    }
  },{
    id: 6,
    name: 'Ombre Press On Nails',
    price: 799,
    salePrice: 349,
    images: {
      default: 'https://nailknack.com/cdn/shop/files/AnyConv.com__Untitleddesign_1_82386175-a9f3-4a7e-b574-99979d66cf9a.webp?v=1699124940&width=533',
      hover: 'https://nailknack.com/cdn/shop/files/AnyConv.com__Untitleddesign_2_d28a6844-4386-4286-84a0-284ef960047e.webp?v=1699124940&width=720'
    }
  },{
    id: 7,
    name: 'Floral Design Press On Nails',
    price: 899,
    salePrice: 399,
    images: {
      default: 'https://nailknack.com/cdn/shop/files/AnyConv.com__Untitleddesign_1_82386175-a9f3-4a7e-b574-99979d66cf9a.webp?v=1699124940&width=533',
      hover: 'https://nailknack.com/cdn/shop/files/AnyConv.com__Untitleddesign_2_d28a6844-4386-4286-84a0-284ef960047e.webp?v=1699124940&width=720'
    }
  },{
    id: 8,
    name: 'Geometric Pattern Press On Nails',
    price: 799,
    salePrice: 349,
    images: {
      default: 'https://nailknack.com/cdn/shop/files/AnyConv.com__Untitleddesign_1_82386175-a9f3-4a7e-b574-99979d66cf9a.webp?v=1699124940&width=533',
      hover: 'https://nailknack.com/cdn/shop/files/AnyConv.com__Untitleddesign_2_d28a6844-4386-4286-84a0-284ef960047e.webp?v=1699124940&width=720'
    }
  },
  
];

function ProductSlider() {
  const [hoveredProducts, setHoveredProducts] = useState(new Set());

  const handleMouseEnter = (productId) => {
    setHoveredProducts(prev => new Set([...prev, productId]));
  };

  const handleMouseLeave = (productId) => {
    setHoveredProducts(prev => {
      const newSet = new Set([...prev]);
      newSet.delete(productId);
      return newSet;
    });
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl md:text-3xl font-bold">French Press on Nails</h2>
        <div className="hidden md:flex gap-4">
          <button className="swiper-button-prev-custom p-2 rounded-full border border-gray-300 hover:border-pink-600 hover:text-pink-600 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button className="swiper-button-next-custom p-2 rounded-full border border-gray-300 hover:border-pink-600 hover:text-pink-600 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <Swiper
        modules={[Navigation, Pagination]}
        navigation={{
          prevEl: '.swiper-button-prev-custom',
          nextEl: '.swiper-button-next-custom',
        }}
        pagination={{
          enabled: true,
          clickable: true,
          dynamicBullets: true,
          el: '.swiper-pagination',
        }}
        breakpoints={{
          320: { slidesPerView: 1.2, spaceBetween: 10 },
          480: { slidesPerView: 2, spaceBetween: 15 },
          768: { slidesPerView: 3, spaceBetween: 20 },
          1024: { slidesPerView: 4, spaceBetween: 30 },
        }}
        grabCursor={true}
        className="product-slider"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id} className="pb-12">
            <div 
              className="group relative"
              onMouseEnter={() => handleMouseEnter(product.id)}
              onMouseLeave={() => handleMouseLeave(product.id)}
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
                <img
                  src={hoveredProducts.has(product.id) ? product.images.hover : product.images.default}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 transform translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                  <button className="p-2 bg-white rounded-full shadow-md hover:bg-pink-600 hover:text-white transition-colors">
                    <FiHeart className="w-5 h-5" />
                  </button>
                  <button className="p-2 bg-white rounded-full shadow-md hover:bg-pink-600 hover:text-white transition-colors">
                    <FiEye className="w-5 h-5" />
                  </button>
                  <button className="p-2 bg-white rounded-full shadow-md hover:bg-pink-600 hover:text-white transition-colors">
                    <FiShoppingCart className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="mt-4 text-center">
                <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
                <div className="mt-2 flex items-center justify-center gap-2">
                  <span className="text-pink-600">₹{product.salePrice}</span>
                  <span className="text-gray-500 line-through">₹{product.price}</span>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
        <div className="swiper-pagination mt-6"></div>
      </Swiper>
    </div>
  );
}

export default ProductSlider;