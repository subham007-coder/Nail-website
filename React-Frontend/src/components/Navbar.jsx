import { useState } from 'react';
import { FiMenu, FiX, FiUser, FiHeart, FiShoppingCart, FiSearch } from 'react-icons/fi';
import ShopMegaMenu from './ShopMegaMenu';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [shopHover, setShopHover] = useState(false);

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
          <button className="bg-white text-[#E91E63] px-4 py-1 rounded text-sm hover:bg-gray-50">
            Shop Now
          </button>
        </div>
      </div>

      <div className="container mx-auto py-4">
        <div className="flex items-center justify-between px-4">
          {/* Logo */}
          <a href="/" className="flex-shrink-0">
            <img src="/src/assets/logo.jpeg" alt="Nail Knack" className="h-20 md:h-20 rounded-full" />
          </a>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden p-2 text-gray-600 hover:text-pink-600"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <FiX className="h-6 w-6" />
            ) : (
              <FiMenu className="h-6 w-6" />
            )}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <a href="/" className="text-gray-800 hover:text-[#E91E63] text-sm font-medium">HOME</a>

            {/* SHOP with Mega Menu */}
            <div className="relative group">
              <a href="#" className="text-gray-800 hover:text-[#E91E63] text-sm font-medium flex items-center">
                SHOP
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </a>
              <div className="absolute left-0 top-full w-[800px] hidden group-hover:block z-50 pt-4">
                <ShopMegaMenu />
              </div>
            </div>

            <a href="/sale" className="text-gray-800 hover:text-[#E91E63] text-sm font-medium">SALE</a>
            <a href="/designer" className="text-gray-800 hover:text-[#E91E63] text-sm font-medium">DESIGNER NAILS</a>
            <a href="/tutorial" className="text-gray-800 hover:text-[#E91E63] text-sm font-medium">TUTORIAL</a>
            <a href="/blog" className="text-gray-800 hover:text-[#E91E63] text-sm font-medium">BLOG</a>
            <a href="/contact" className="text-gray-800 hover:text-[#E91E63] text-sm font-medium">CONTACT US</a>
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

      {/* Mobile Menu */}
      <div className={`
        lg:hidden fixed inset-0 bg-white z-50 transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        <div className="p-4">
          <button 
            className="absolute top-4 right-4 p-2 text-gray-600 hover:text-pink-600"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <FiX className="h-6 w-6" />
          </button>

          <ul className="mt-12 space-y-4">
            <li className="border-b border-gray-100 pb-2">
              <a href="/" className="text-gray-800 hover:text-pink-600">HOME</a>
            </li>
            <li className="border-b border-gray-100 pb-2">
              <button 
                className="flex items-center justify-between w-full text-gray-800 hover:text-pink-600"
                onClick={() => setShopHover(!shopHover)}
              >
                SHOP
                <svg className={`w-4 h-4 transition-transform ${shopHover ? 'rotate-180' : ''}`} 
                     fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {shopHover && (
                <div className="mt-2 ml-4 space-y-2">
                  <p className="font-medium">Shop By Category</p>
                  <ul className="ml-4 space-y-2">
                    <li className="text-gray-600 hover:text-pink-600">Best Sellers</li>
                    <li className="text-gray-600 hover:text-pink-600">French nails</li>
                    {/* ...other categories... */}
                  </ul>
                  {/* ...other shop sections... */}
                </div>
              )}
            </li>
            <li className="border-b border-gray-100 pb-2">
              <a href="/sale" className="text-gray-800 hover:text-pink-600">SALE</a>
            </li>
            <li className="border-b border-gray-100 pb-2">
              <a href="/designer" className="text-gray-800 hover:text-pink-600">DESIGNER NAILS</a>
            </li>
            <li className="border-b border-gray-100 pb-2">
              <a href="/tutorial" className="text-gray-800 hover:text-pink-600">TUTORIAL</a>
            </li>
            <li className="border-b border-gray-100 pb-2">
              <a href="/blog" className="text-gray-800 hover:text-pink-600">BLOG</a>
            </li>
            <li className="border-b border-gray-100 pb-2">
              <a href="/contact" className="text-gray-800 hover:text-pink-600">CONTACT US</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
