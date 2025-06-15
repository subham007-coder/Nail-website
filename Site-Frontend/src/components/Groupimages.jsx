import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

// Import Swiper styles
import 'swiper/css';

const imageGroups = [
  {
    id: 1,
    images: [
      'https://wdtmakehub.wpengine.com/wp-content/uploads/2024/12/MH-gallery-2.jpg',
      'https://wdtmakehub.wpengine.com/wp-content/uploads/2024/12/MH-gallery-3.jpg',
      'https://wdtmakehub.wpengine.com/wp-content/uploads/2024/12/MH-gallery-4.jpg',
      'https://wdtmakehub.wpengine.com/wp-content/uploads/2025/02/gallery-500-img-2.jpg',
      'https://wdtmakehub.wpengine.com/wp-content/uploads/2024/12/MH-gallery-8.jpg'
    ]
  },
  {
    id: 2,
    images: [
      'https://wdtmakehub.wpengine.com/wp-content/uploads/2024/12/MH-gallery-10.jpg',
      'https://wdtmakehub.wpengine.com/wp-content/uploads/2024/12/MH-gallery-9.jpg',
      'https://wdtmakehub.wpengine.com/wp-content/uploads/2025/02/gallery-500-img-1.jpg',
      'https://wdtmakehub.wpengine.com/wp-content/uploads/2024/12/MH-gallery-6.jpg',
      'https://wdtmakehub.wpengine.com/wp-content/uploads/2024/12/MH-gallery-5.jpg'
    ]
  },
  {
    id: 3,
    images: [
      'https://wdtmakehub.wpengine.com/wp-content/uploads/2024/12/MH-gallery-10.jpg',
      'https://wdtmakehub.wpengine.com/wp-content/uploads/2024/12/MH-gallery-9.jpg',
      'https://wdtmakehub.wpengine.com/wp-content/uploads/2025/02/gallery-500-img-1.jpg',
      'https://wdtmakehub.wpengine.com/wp-content/uploads/2024/12/MH-gallery-6.jpg',
      'https://wdtmakehub.wpengine.com/wp-content/uploads/2024/12/MH-gallery-5.jpg'
    ]
  },
];

function Groupimages() {
  useScrollAnimation();

  return (
    <div className="py-6 overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8" data-animation="fade-up">
          Our Gallery
        </h2>

        <div data-animation="scale">
          <Swiper
            modules={[Autoplay]}
            autoplay={{
              delay: 0, // No delay for continuous scrolling
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            speed={7000} // Slower speed for smooth scrolling
            loop={true} // Enable infinite loop
            slidesPerView="auto" // Allow flexible slide width
            spaceBetween={20}
            grabCursor={true}
            className="gallery-slider"
            allowTouchMove={true}
          >
            {[...imageGroups, ...imageGroups].map((group, groupIndex) => (
              <SwiperSlide 
                key={`${group.id}-${groupIndex}`} 
                className="!w-auto"
              >
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[200px] min-w-[300px] md:min-w-[600px]">
                  {group.images.map((image, index) => (
                    <div 
                      key={index} 
                      className={`rounded-lg overflow-hidden transform transition-all duration-500 hover:scale-105 ${
                        index === 0 ? 'col-span-2 row-span-2' : ''
                      }`}
                    >
                      <img
                        src={image}
                        alt={`Gallery image ${index + 1}`}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                    </div>
                  ))}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export default Groupimages;