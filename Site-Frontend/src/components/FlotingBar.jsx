import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiUser, FiShoppingBag, FiHeart, FiShoppingCart } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';

function FloatingBar() {
  const [isVisible, setIsVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

//   useEffect(() => {
//   let timeout;

//   const handleScroll = () => {
//     const currentScrollY = window.scrollY;

//     if (currentScrollY < lastScrollY) {
//       // scrolling up
//       clearTimeout(timeout);
//       setIsVisible(true);
//     } else {
//       // scrolling down
//       clearTimeout(timeout);
//       // hide after 300ms delay
//       timeout = setTimeout(() => {
//         setIsVisible(false);
//       }, 3000);
//     }

//     setLastScrollY(currentScrollY);
//   };

//   window.addEventListener('scroll', handleScroll);
//   return () => {
//     window.removeEventListener('scroll', handleScroll);
//     clearTimeout(timeout);
//   };
// }, [lastScrollY]);

useEffect(() => {
  let timeout;

  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY < lastScrollY) {
      // scrolling up → immediately show
      clearTimeout(timeout);
      setIsVisible(true);
    } else if (currentScrollY > lastScrollY) {
      // scrolling down → hide after delay
      clearTimeout(timeout);
      setIsVisible(false); // immediately hide if user scrolls down after scrolling up
      // Optional: uncomment below if you want extra delay for smoother hide
      // timeout = setTimeout(() => {
      //   setIsVisible(false);
      // }, 3000);
    }

    setLastScrollY(currentScrollY);
  };

  window.addEventListener('scroll', handleScroll);
  return () => {
    window.removeEventListener('scroll', handleScroll);
    clearTimeout(timeout);
  };
}, [lastScrollY]);


  const menuItems = [
    { icon: <FiHome size={20} />, label: 'Home', link: '/' },
    { icon: <FiUser size={20} />, label: 'Account', link: '/account' },
    { icon: <FiShoppingBag size={20} />, label: 'Shop', link: '/shop' },
    { icon: <FiHeart size={20} />, label: 'Wishlist', link: '/wishlist' },
    { 
      icon: (
        <div className="relative">
          <FiShoppingCart size={20} />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </div>
      ), 
      label: 'Cart', 
      link: '/cart' 
    },
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
                <Link
                  key={item.label}
                  to={item.link}
                  className="flex flex-col items-center text-gray-600 hover:text-pink-600 transition-colors"
                >
                  {item.icon}
                  <span className="text-[10px] mt-1 font-medium">{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default FloatingBar;
