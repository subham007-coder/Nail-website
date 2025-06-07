import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { motion } from 'framer-motion';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const carouselData = [
  {
    image: 'https://nailknack.com/cdn/shop/files/Instant_Soft_Gel_Nails.webp?v=1718311578&width=2000',
    title: 'Professional Nail Care',
    subtitle: 'Get Salon-Like Nails at Home',
  },
  {
    image: 'https://demo.egenslab.com/html/buret/preview/assets/image/skin-care/banner-img1.jpg',
    title: 'Trendy Collections',
    subtitle: 'Express Your Style',
  },
  {
    image: 'https://wdtmakehub.wpengine.com/wp-content/uploads/2025/02/makehub-ads-01.jpg',
    title: 'Premium Quality',
    subtitle: 'Long-Lasting & Durable',
  }
];

function Carousel() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        // navigation={{
        //   enabled: true,
        //   hideOnClick: true,
        // }}
        // pagination={{ 
        //   clickable: true,
        //   dynamicBullets: true 
        // }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] w-full"
      >
        {carouselData.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-full w-full">
              <img
                src={slide.image}
                alt={slide.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-white px-4">
                {mounted && (
                  <>
                    <motion.h2
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.8, delay: index * 0.2 }}
                      className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-4 text-center"
                    >
                      {slide.title}
                    </motion.h2>
                    <motion.p
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.8, delay: index * 0.2 + 0.2 }}
                      className="text-sm sm:text-base md:text-lg lg:text-xl text-center px-4 sm:px-8"
                    >
                      {slide.subtitle}
                    </motion.p>
                  </>
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