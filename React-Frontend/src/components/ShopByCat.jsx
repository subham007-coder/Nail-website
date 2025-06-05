import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';

const categories = [
  {
    id: 1,
    name: 'Wedding Nails',
    image: 'https://nailknack.com/cdn/shop/collections/nailknack-41486.jpg?v=1718624213&width=535',
  },
  {
    id: 2,
    name: 'Holiday Nails',
    image: 'https://nailknack.com/cdn/shop/collections/Untitled_design_1.jpg?v=1720775202&width=535',
  },
  {
    id: 3,
    name: 'Casual Nails',
    image: 'https://nailknack.com/cdn/shop/collections/nailknack-43102.jpg?v=1718626148&width=535',
  },
  {
    id: 4,
    name: 'Party Nails',
    image: 'https://nailknack.com/cdn/shop/collections/nailknack-41469.jpg?v=1699032997&width=535',
  },
];

function ShopbyCat() {
  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl md:text-3xl font-bold mb-8 text-left">Shop By Occasion</h2>
      
      {/* Mobile Slider View */}
      <div className="lg:hidden">
        <Swiper
          spaceBetween={16}
          slidesPerView={1.2}
          breakpoints={{
            480: { slidesPerView: 2.2 },
            640: { slidesPerView: 2.5 },
          }}
        >
          {categories.map((category) => (
            <SwiperSlide key={category.id}>
              <div className="group relative">
                <div className="aspect-[4/4] overflow-hidden rounded-lg">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 transition-opacity group-hover:bg-opacity-40" />
                </div>
                
                <button className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white text-gray-900 px-6 py-2 rounded-full 
                  font-semibold text-sm transition-all duration-300 hover:bg-pink-600 hover:text-white
                  transform group-hover:translate-y-0 opacity-100 group-hover:opacity-100">
                  {category.name}
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Desktop Grid View */}
      <div className="hidden lg:grid grid-cols-4 gap-6">
        {categories.map((category) => (
          <div key={category.id} className="group relative">
            <div className="aspect-[4/4] overflow-hidden rounded-lg">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 transition-opacity group-hover:bg-opacity-40" />
            </div>
            
            <button className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white text-gray-900 px-6 py-2 rounded-full 
              font-semibold text-sm transition-all duration-300 hover:bg-pink-600 hover:text-white
              transform group-hover:translate-y-0 opacity-100 group-hover:opacity-100">
              {category.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShopbyCat;