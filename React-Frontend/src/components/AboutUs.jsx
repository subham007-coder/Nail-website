import React, { useEffect } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

function AboutUs() {
  useScrollAnimation();

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Main Heading */}
      <h1 className="text-3xl md:text-4xl lg:text-4xl font-bold text-center mb-12" 
        data-animation="fade-up">
        Nails for Women who are Destined for Greatness
      </h1>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Image Section */}
        <div className="aspect-[16/9] overflow-hidden rounded-lg" data-animation="scale">
          <img
            src="https://cosmetics-ui.myshopify.com/cdn/shop/files/aboutUs.png?v=1731913405"
            alt="About NailKnack"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Text Content Section */}
        <div className="space-y-6" data-animation="stagger">
          <h2 className="text-2xl md:text-3xl font-bold" data-stagger>
            About Us
          </h2>
          <p className="text-gray-600" data-stagger>
            NailKnack® is a nail paradise for fashion-forward women who take nail care seriously. 
            Apply NailKnack® to transform your hand glance and self-confidence.
            Our products will always match your mood with quality and craftsmanship designed to 
            satisfy your comfort and style needs.
          </p>
          <button 
            className="bg-pink-600 text-white px-8 py-3 rounded-full hover:bg-pink-700 transition-colors" 
            data-stagger
          >
            Read More
          </button>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;