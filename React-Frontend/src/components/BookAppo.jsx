import React from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation';

function BookAppo() {
  useScrollAnimation();

  return (
    <div className="relative w-full h-[400px] md:h-[500px]" data-animation="fade-in">
      {/* Background Image */}
      <img
        src="https://wdtmakehub.wpengine.com/wp-content/uploads/2025/03/footer-top-img-1536x480.png"
        alt="Book Appointment"
        className="w-full h-full object-cover"
      />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      
      {/* Content */}
      <div className="absolute inset-0 container mx-auto px-4 flex items-center">
        <div className="max-w-lg text-white" data-animation="slide-in">
          <p className="text-lg md:text-xl mb-8 leading-relaxed border border-white w-max px-4 py-2 rounded-full">
            50% DISCOUNT
          </p>
          <h2 className="text-2xl md:text-5xl lg:text-3xl font-bold mb-4 ">
            Every new customer gets a 50% discount on every single service package.
          </h2>
          <button className="bg-pink-600 text-white px-8 py-3 rounded-full font-medium 
            hover:bg-pink-700 transition-colors duration-300 text-sm md:text-base">
            BOOK AN APPOINTMENT
          </button>
        </div>
      </div>
    </div>
  )
}

export default BookAppo