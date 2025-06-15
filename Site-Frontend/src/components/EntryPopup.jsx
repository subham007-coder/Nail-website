import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoClose } from 'react-icons/io5';

function EntryPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if popup has been shown before
    const hasShownPopup = localStorage.getItem('hasShownEntryPopup');
    
    if (!hasShownPopup) {
      // Show popup after 2 seconds
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('hasShownEntryPopup', 'true');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative bg-white rounded-2xl overflow-hidden max-w-lg w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-10 text-white hover:text-pink-200 transition-colors"
            >
              <IoClose size={24} />
            </button>

            <div className="grid md:grid-cols-2">
              {/* Image Section */}
              <div className="relative aspect-square md:aspect-auto">
                <img
                  src="https://nailknack.com/cdn/shop/files/AnyConv.com__Untitleddesign_1_82386175-a9f3-4a7e-b574-99979d66cf9a.webp?v=1699124940&width=533"
                  alt="Latest Product"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-pink-500 text-white px-3 py-1 rounded-full text-sm">
                  New Arrival
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6 flex flex-col justify-center">
                <h3 className="text-xl md:text-2xl font-bold mb-2">
                  Classic French Press On Nails
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Experience luxury at your fingertips with our latest collection
                </p>
                
                <div className="mb-4">
                  <span className="text-2xl font-bold text-pink-600">₹299</span>
                  <span className="ml-2 text-gray-500 line-through">₹699</span>
                  <span className="ml-2 text-green-500">57% OFF</span>
                </div>

                <button
                  onClick={() => {
                    // Add navigation logic here
                    handleClose();
                  }}
                  className="bg-pink-600 text-white w-full py-3 rounded-full hover:bg-pink-700 transition-colors"
                >
                  Shop Now
                </button>

                <p className="text-center text-gray-500 text-sm mt-4">
                  *Limited time offer. Don't miss out!
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default EntryPopup;