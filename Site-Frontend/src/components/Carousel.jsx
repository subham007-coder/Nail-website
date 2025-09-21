import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, EffectFade } from 'swiper/modules';
import { motion } from 'framer-motion';
import { apiRequest } from '../utils/api';

// Import additional Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

function Carousel() {
  const [banners, setBanners] = useState([]);
  const [mounted, setMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
    // Fetch banners from backend
    apiRequest('/banners/')
      .then(data => {
        const activeBanners = data.filter(b => b.active).sort((a, b) => a.order - b.order);
        if (activeBanners.length > 0) {
          setBanners(activeBanners);
        } else {
          // Fallback data if no banners in database
          setBanners([
            {
              _id: 'fallback-1',
              title: 'Welcome to Our Store',
              subtitle: 'Discover amazing nail art products',
              image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
              link: '/shop',
              buttonText: 'Shop Now',
              active: true,
              order: 1
            }
          ]);
        }
      })
      .catch(err => {
        console.error('Banner fetch error:', err);
        // Fallback data on error
        setBanners([
          {
            _id: 'fallback-1',
            title: 'Welcome to Our Store',
            subtitle: 'Discover amazing nail art products',
            image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
            link: '/shop',
            buttonText: 'Shop Now',
            active: true,
            order: 1
          }
        ]);
      });
  }, []);

  // Only render Swiper when banners are loaded
  if (!banners.length) {
    return (
      <div className="h-[40vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] xl:h-[90vh] w-full flex items-center justify-center bg-gray-100">
        {/* <span className="text-gray-400">Loading...</span> */}
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <Swiper
        modules={[Autoplay, Navigation, Pagination, EffectFade]}
        effect="fade"
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="h-[40vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] xl:h-[90vh] w-full"
      >
        {banners.map((slide, index) => (
          <SwiperSlide key={slide._id}>
            <div className="relative h-full w-full overflow-hidden">
              <motion.img
                initial={{ scale: 1.1 }}
                animate={{ scale: activeIndex === index ? 1 : 1.1 }}
                transition={{ duration: 1.5 }}
                src={slide.image}
                alt={slide.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent flex flex-col items-center justify-center text-white px-4">
                {mounted && (
                  <div className="max-w-4xl mx-auto text-center space-y-6">
                    <motion.h2
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 sm:mb-4"
                    >
                      {slide.title}
                    </motion.h2>
                    {slide.subtitle && (
                      <motion.p
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-sm sm:text-base md:text-lg lg:text-xl mb-6 sm:mb-8"
                      >
                        {slide.subtitle}
                      </motion.p>
                    )}
                    {slide.link && slide.buttonText && (
                      <motion.a
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        href={slide.link}
                        className="inline-block bg-white text-gray-900 px-8 py-3 rounded-full font-medium 
                          hover:bg-pink-600 hover:text-white transition-all duration-300 
                          transform hover:scale-105 text-sm sm:text-base"
                      >
                        {slide.buttonText}
                      </motion.a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Carousel;