import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, EffectFade } from 'swiper/modules';
import { motion } from 'framer-motion';
import { apiRequest } from '../utils/api'; // <-- Import your API helper

// Import additional Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

function Carousel() {
  const [banners, setBanners] = useState([]);
  const [mounted, setMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setMounted(true);
    // Fetch banners from backend
    apiRequest('/api/banners')
      .then(data => setBanners(data.filter(b => b.active).sort((a, b) => a.order - b.order)))
      .catch(console.error);
  }, []);

  // Only render Swiper when banners are loaded
  if (!banners.length) {
    return (
      <div className="h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[90vh] w-full flex items-center justify-center bg-gray-100">
        <span className="text-gray-400">Loading...</span>
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
        className="h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[90vh] w-full"
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