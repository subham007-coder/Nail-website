import React from 'react'

function AboutUs() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Main Heading */}
      <h1 className="text-3xl md:text-4xl lg:text-4xl font-bold text-center mb-12">
        Nails for Women who are Destined for Greatness
      </h1>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Image Section */}
        <div className="aspect-[16/9] overflow-hidden rounded-lg">
          <img
            src="https://nailknack.com/cdn/shop/files/About_Nailknack_-_Presson_Nails.webp?v=1718629642&width=940"
            alt="About NailKnack"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Text Content Section */}
        <div className="space-y-6 flex flex-col items-center text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-center">About Us</h2>
          <p className="text-gray-600 leading-relaxed tracking-tighter text-justify">
            NailKnack® is a nail paradise for fashion-forward women who take nail care seriously. 
            Apply NailKnack® to transform your hand glance and self-confidence.
            Our products will always match your mood with quality and craftsmanship designed to 
            satisfy your comfort and style needs.
          </p>
          <button className="bg-pink-600 text-white px-8 py-3 rounded-full font-medium 
            hover:bg-pink-700 transition-colors duration-300">
            Read More
          </button>
        </div>
      </div>
    </div>
  )
}

export default AboutUs