import React from "react";

function Download_App_section() {
  return (
    <div className="flex justify-center items-center my-5">
      {/* Outer pink background */}
      <div className="w-[95%] bg-pink-600 py-8 px-10 rounded-lg">
        {/* Inner white box */}
        <div className="bg-white py-10 px-5 rounded-lg flex flex-col md:flex-row justify-between">
          {/* Left content */}
          <div className="md:w-2/3">
            <p className="font-serif mb-2 text-sm font-bold text-pink-600">
              AR_Lashes – Premium Beauty, Delivered to You
            </p>
            <h2 className="mb-2 font-semibold text-lg">Quick Delivery to Your Home</h2>

            <p className="text-sm text-black font-serif mb-4">
              Discover the perfect blend of elegance and confidence with
              AR_Lashes. From high-quality lashes to exclusive cosmetic
              essentials, we bring beauty right to your doorstep. Choose from
              our wide collection of must-have products and enjoy special offers
              on your favorites. Explore our latest discounts today and shine
              with AR_Lashes.
            </p>

             {/* Download App button */}
            <a
              href="#"
              className="inline-block bg-pink-600 text-white font-semibold text-sm px-6 py-3 rounded-full shadow-md hover:bg-pink-700 transition"
            >
              Download App
            </a>
          </div>

          {/* Right content (App Store button / image) */}
          <div className="flex justify-center items-center mt-5 md:mt-0">
            <img
              src="/assets/Delivery-app.png"
              alt="App Store"
              className="h-28 mr-4 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Download_App_section;
