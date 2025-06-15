import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, EffectFade } from 'swiper/modules';
import { motion } from 'framer-motion';

// Import additional Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const carouselData = [
  {
    image: 'https://nailknack.com/cdn/shop/files/Instant_Soft_Gel_Nails.webp?v=1718311578&width=2000',
    title: 'Professional Nail Care',
    subtitle: 'Get Salon-Like Nails at Home',
    buttonText: 'Shop Collection',
    link: '/shop'
  },
  {
    image: 'https://demo.egenslab.com/html/buret/preview/assets/image/skin-care/banner-img1.jpg',
    title: 'Trendy Collections',
    subtitle: 'Express Your Style',
    buttonText: 'View Latest',
    link: '/new-arrivals'
  },
  {
    image: 'https://wdtmakehub.wpengine.com/wp-content/uploads/2025/02/makehub-ads-01.jpg',
    title: 'Premium Quality',
    subtitle: 'Long-Lasting & Durable',
    buttonText: 'Shop Now',
    link: '/premium'
  }
];

function Carousel() {
  const [mounted, setMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative">
      <Swiper
        modules={[Autoplay, Navigation, Pagination, EffectFade]}
        effect="fade"
        // navigation={{
        //   enabled: true,
        //   prevEl: '.swiper-button-prev',
        //   nextEl: '.swiper-button-next',
        // }}
        // pagination={{ 
        //   clickable: true,
        //   dynamicBullets: true,
        //   renderBullet: function (index, className) {
        //     return `<span class="${className} w-2 h-2 md:w-3 md:h-3"></span>`;
        //   }
        // }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[90vh] w-full"
      >
        {carouselData.map((slide, index) => (
          <SwiperSlide key={index}>
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
                    <motion.p
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                      className="text-sm sm:text-base md:text-lg lg:text-xl mb-6 sm:mb-8"
                    >
                      {slide.subtitle}
                    </motion.p>
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
                  </div>
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons */}
      {/* <button className="swiper-button-prev !hidden md:!flex !text-white !w-12 !h-12 
        !bg-black/30 rounded-full hover:!bg-pink-600 transition-colors">
      </button>
      <button className="swiper-button-next !hidden md:!flex !text-white !w-12 !h-12 
        !bg-black/30 rounded-full hover:!bg-pink-600 transition-colors">
      </button> */}
    </div>
  );
}

export default Carousel;