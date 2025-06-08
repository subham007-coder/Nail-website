import { useEffect, useState } from 'react';
import { FiHome, FiUser, FiShoppingBag, FiHeart, FiShoppingCart } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

function FloatingBar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsVisible(scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { icon: <FiHome size={20} />, label: 'Home', link: '/' },
    { icon: <FiUser size={20} />, label: 'Account', link: '/account' },
    { icon: <FiShoppingBag size={20} />, label: 'Shop', link: '/shop' },
    { icon: <FiHeart size={20} />, label: 'Wishlist', link: '/wishlist' },
    { icon: <FiShoppingCart size={20} />, label: 'Cart', link: '/cart' },
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          className="fixed bottom-4 left-4 right-4 md:hidden z-50"
        >
          <div className="bg-white rounded-full shadow-lg border border-gray-100">
            <div className="flex justify-between items-center px-6 py-4">
              {menuItems.map((item) => (
                <a
                  key={item.label}
                  href={item.link}
                  className="flex flex-col items-center text-gray-600 hover:text-pink-600 transition-colors"
                >
                  {item.icon}
                  <span className="text-[10px] mt-1 font-medium">{item.label}</span>
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default FloatingBar;