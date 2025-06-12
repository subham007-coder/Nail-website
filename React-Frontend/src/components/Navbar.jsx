import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX, FiUser, FiHeart, FiShoppingCart, FiSearch } from 'react-icons/fi';
import ShopMegaMenu from './ShopMegaMenu';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [shopHover, setShopHover] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  return (
    <nav className="w-full bg-white relative">
      {/* Flash Sale Bar */}
      <div className="bg-[#E91E63] text-white py-2 px-4">
        <div className="container mx-auto flex items-center justify-center gap-4">
          <span className="text-sm font-medium">FLASH SALE ENDING SOON</span>
          <div className="flex gap-1">
            <div className="bg-white text-black px-2 py-0.5 rounded text-xs">11</div>
            <div className="bg-white text-black px-2 py-0.5 rounded text-xs">52</div>
            <div className="bg-white text-black px-2 py-0.5 rounded text-xs">03</div>
          </div>
          <Link to="/shop" className="bg-white text-[#E91E63] px-4 py-1 rounded text-sm hover:bg-gray-50">
            Shop Now
          </Link>
        </div>
      </div>

      <div className="container mx-auto py-4">
        {/* Mobile Navigation */}
        <div className="lg:hidden">
          <div className="flex items-center justify-between px-4">
            {/* Hamburger Menu */}
            <button 
              className="p-2 text-gray-600 hover:text-pink-600"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <FiMenu className="h-6 w-6" />
            </button>

            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <img 
                src="/assets/logo2.PNG" 
                alt="Nail Knack" 
                className="h-16 md:h-20 rounded-full object-contain bg-black"
              />
            </Link>

            {/* Cart Icon */}
            <div className="relative">
              <FiShoppingCart className="h-6 w-6 text-gray-600" />
              <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">0</span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="px-4 pt-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-2 pl-10 bg-gray-50 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-pink-600 focus:bg-white transition-all"
              />
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:block">
          <div className="flex items-center justify-between px-4">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <img src="/assets/logo2.PNG" alt="Nail Knack" className="h-14 md:h-20 rounded-full bg-black" />
            </Link>

            {/* Desktop Navigation Links */}
            <div className="flex items-center space-x-8">
              <Link to="/" className="text-gray-800 hover:text-[#E91E63] text-sm font-medium">HOME</Link>

              {/* SHOP with Mega Menu */}
              <div className="relative group">
                <Link to="/shop" className="text-gray-800 hover:text-[#E91E63] text-sm font-medium flex items-center">
                  SHOP
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </Link>
                <div className="absolute left-0 top-full w-[800px] hidden group-hover:block z-50 pt-4">
                  <ShopMegaMenu />
                </div>
              </div>

              {/* <Link to="/sale" className="text-gray-800 hover:text-[#E91E63] text-sm font-medium">SALE</Link> */}
              <Link to="/appointment" className="text-gray-800 hover:text-[#E91E63] text-sm font-medium">BOOK AN APPOINTMENT</Link>
              <Link to="/tutorial" className="text-gray-800 hover:text-[#E91E63] text-sm font-medium">TUTORIAL</Link>
              <Link to="/contact" className="text-gray-800 hover:text-[#E91E63] text-sm font-medium">CONTACT US</Link>
            </div>

            {/* Search and Icons */}
            <div className="flex items-center gap-6">
              <div className="hidden lg:block relative">
                <input
                  type="text"
                  placeholder="I'm looking for..."
                  className="w-64 pl-10 pr-4 py-2 rounded-full border border-gray-200 text-sm focus:outline-none focus:border-[#E91E63]"
                />
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
              <div className="flex items-center gap-4">
                <FiUser className="w-6 h-6 text-gray-800 cursor-pointer hover:text-[#E91E63]" />
                <div className="relative">
                  <FiHeart className="w-6 h-6 text-gray-800 cursor-pointer hover:text-[#E91E63]" />
                  <span className="absolute -top-2 -right-2 bg-[#E91E63] text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">0</span>
                </div>
                <div className="relative">
                  <FiShoppingCart className="w-6 h-6 text-gray-800 cursor-pointer hover:text-[#E91E63]" />
                  <span className="absolute -top-2 -right-2 bg-[#E91E63] text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">0</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Slide-out */}
      <div className={`
        lg:hidden fixed inset-0 bg-white z-50 transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-4 h-full overflow-y-auto">
          <button 
            className="absolute top-4 right-4 p-2 text-gray-600 hover:text-pink-600"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <FiX className="h-6 w-6" />
          </button>

          <ul className="mt-12 space-y-4">
            <li className="border-b border-gray-100 pb-2">
              <Link to="/" className="text-gray-800 hover:text-pink-600 block py-2">HOME</Link>
            </li>
            <li className="border-b border-gray-100">
              <button 
                className="flex items-center justify-between w-full text-gray-800 hover:text-pink-600 py-2"
                onClick={() => setShopHover(!shopHover)}
              >
                SHOP
                <svg 
                  className={`w-4 h-4 transition-transform duration-300 ${shopHover ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className={`
                overflow-hidden transition-all duration-300 ease-in-out
                ${shopHover ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}
              `}>
                <div className="py-2 px-4 space-y-4">
                  {/* Shop Categories */}
                  <div>
                    <h4 className="font-medium text-sm mb-2">Shop By Category</h4>
                    <ul className="space-y-2 ml-2">
                      <li className="text-gray-600 hover:text-pink-600 text-sm">Best Sellers</li>
                      <li className="text-gray-600 hover:text-pink-600 text-sm">French nails</li>
                      <li className="text-gray-600 hover:text-pink-600 text-sm">Casual Wear Nails</li>
                      <li className="text-gray-600 hover:text-pink-600 text-sm">Toe Nails</li>
                      <li className="text-gray-600 hover:text-pink-600 text-sm">Ombre Nails</li>
                    </ul>
                  </div>
                  {/* Shop By Shape */}
                  <div>
                    <h4 className="font-medium text-sm mb-2">Shop By Shape</h4>
                    <ul className="space-y-2 ml-2">
                      <li className="text-gray-600 hover:text-pink-600 text-sm">Coffin Nails</li>
                      <li className="text-gray-600 hover:text-pink-600 text-sm">Stiletto Nails</li>
                      <li className="text-gray-600 hover:text-pink-600 text-sm">Square Nails</li>
                      {/* ...other shapes... */}
                    </ul>
                  </div>
                  {/* Add other shop sections similarly */}
                </div>
              </div>
            </li>
            <li className="border-b border-gray-100 pb-2">
              <Link to="/sale" className="text-gray-800 hover:text-pink-600">SALE</Link>
            </li>
            <li className="border-b border-gray-100 pb-2">
              <Link to="/appointment" className="text-gray-800 hover:text-pink-600">BOOK AN APPOINTMENT</Link>
            </li>
            <li className="border-b border-gray-100 pb-2">
              <Link to="/tutorial" className="text-gray-800 hover:text-pink-600">TUTORIAL</Link>
            </li>
            <li className="border-b border-gray-100 pb-2">
              <Link to="/blog" className="text-gray-800 hover:text-pink-600">BLOG</Link>
            </li>
            <li className="border-b border-gray-100 pb-2">
              <Link to="/contact" className="text-gray-800 hover:text-pink-600">CONTACT US</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
