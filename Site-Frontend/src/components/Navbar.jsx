import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiMenu,
  FiX,
  FiUser,
  FiHeart,
  FiShoppingCart,
  FiSearch,
  FiLogOut,
} from "react-icons/fi";
import { MdCalendarMonth } from "react-icons/md";
// import { UserButton } from '@clerk/clerk-react';
import ShopMegaMenu from "./ShopMegaMenu";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [shopHover, setShopHover] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false); // kept as in your file
  const [showUserMenu, setShowUserMenu] = useState(false);

  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  const { user, logout, isAuthenticated } = useAuth(); // use your Auth context

  return (
    <nav className="w-full bg-white relative">
      {/* Flash Sale Bar */}
      <div className="bg-[#E91E63] text-white py-1.5 px-4">
        <div className="container mx-auto flex items-center justify-center gap-3">
          <span className="text-xs md:text-sm font-medium font-lato tracking-tighter">
            FLASH SALE ENDING SOON
          </span>
          <div className="flex gap-1">
            <div className="bg-white text-black px-1.5 py-0.5 rounded text-[10px] md:text-xs font-mono">
              11
            </div>
            <div className="bg-white text-black px-1.5 py-0.5 rounded text-[10px] md:text-xs font-mono">
              52
            </div>
            <div className="bg-white text-black px-1.5 py-0.5 rounded text-[10px] md:text-xs font-mono">
              03
            </div>
          </div>
          <Link
            to="/shop"
            className="bg-white text-center text-[#E91E63] px-3 py-0.5 rounded text-[10px] md:text-xs 
              hover:bg-gray-50 transition-colors font-medium tracking-wide"
          >
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

            {/* Appointment Icon */}
            <div className="relative">
              <Link to="/appointment" className="relative cart-icon">
                <MdCalendarMonth className="w-6 h-6 text-gray-800 cursor-pointer hover:text-[#E91E63]" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#E91E63] text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>

            {/* Cart Icon */}
            <div className="relative">
              <Link to="/cart" className="relative cart-icon">
                <FiShoppingCart className="w-6 h-6 text-gray-800 cursor-pointer hover:text-[#E91E63]" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#E91E63] text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Search Bar */}
          {/* <div className="px-4 pt-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-2 pl-10 bg-gray-50 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-pink-600 focus:bg-white transition-all"
              />
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>
          </div> */}
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:block">
          <div className="flex items-center justify-between px-4">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <img
                src="/assets/logo2.PNG"
                alt="Nail Knack"
                className="h-14 md:h-20 rounded-full bg-black"
              />
            </Link>

            {/* Desktop Navigation Links */}
            <div className="flex items-center space-x-8">
              <Link
                to="/"
                className="text-gray-800 hover:text-[#E91E63] text-sm font-medium"
              >
                HOME
              </Link>

              {/* SHOP with Mega Menu */}
              <div className="relative group">
                <Link
                  to="/shop"
                  className="text-gray-800 hover:text-[#E91E63] text-sm font-medium flex items-center"
                >
                  SHOP
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </Link>
                <div className="absolute left-0 top-full w-[800px] hidden group-hover:block z-50 pt-4">
                  <ShopMegaMenu />
                </div>
              </div>

              {/* <Link to="/sale" className="text-gray-800 hover:text-[#E91E63] text-sm font-medium">SALE</Link> */}
              <Link
                to="/appointment"
                className="text-gray-800 hover:text-[#E91E63] text-sm font-medium"
              >
                BOOK AN APPOINTMENT
              </Link>
              <Link
                to="/tutorial"
                className="text-gray-800 hover:text-[#E91E63] text-sm font-medium"
              >
                TUTORIAL
              </Link>
              <Link
                to="/contact"
                className="text-gray-800 hover:text-[#E91E63] text-sm font-medium"
              >
                CONTACT US
              </Link>
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
                {/* User Menu (custom, using useAuth) */}
                <div className="relative">
                  {isAuthenticated ? (
                    <>
                      <button
                        onClick={() => setShowUserMenu(!showUserMenu)}
                        className="flex items-center gap-2 text-gray-800 hover:text-[#E91E63] transition-colors"
                      >
                        {user?.image ? (
                          <img
                            src={user.image}
                            alt={user?.name || "User"}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                        ) : (
                          <FiUser className="w-6 h-6" />
                        )}
                        <span className="hidden md:block text-sm font-medium">
                          {user?.name || "User"}
                        </span>
                      </button>

                      {showUserMenu && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border">
                          <Link
                            to="/account"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => setShowUserMenu(false)}
                          >
                            My Account
                          </Link>
                          <button
                            onClick={() => {
                              logout();
                              setShowUserMenu(false);
                            }}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            <FiLogOut className="inline w-4 h-4 mr-2" />
                            Sign Out
                          </button>
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      to="/login"
                      className="flex items-center gap-2 text-gray-800 hover:text-[#E91E63] transition-colors"
                    >
                      <FiUser className="w-6 h-6" />
                      <span className="hidden md:block text-sm font-medium">
                        Login
                      </span>
                    </Link>
                  )}
                </div>

                <Link to="/wishlist" className="relative">
                  <FiHeart className="w-6 h-6 text-gray-800 cursor-pointer hover:text-[#E91E63]" />
                </Link>

                <Link to="/cart" className="relative cart-icon">
                  <FiShoppingCart className="w-6 h-6 text-gray-800 cursor-pointer hover:text-[#E91E63]" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-[#E91E63] text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Slide-out */}
      <div
        className={`
        lg:hidden fixed inset-0 bg-white z-50 transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <div className="p-4 h-full overflow-y-auto">
          <button
            className="absolute top-4 right-4 p-2 text-gray-600 hover:text-pink-600"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <FiX className="h-6 w-6" />
          </button>

          <ul className="mt-12 space-y-4">
            <li className="border-b border-gray-100 pb-2">
              <Link
                to="/"
                className="text-gray-800 hover:text-pink-600 block py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                HOME
              </Link>
            </li>
            <li className="border-b border-gray-100">
              <button
                className="flex items-center justify-between w-full text-gray-800 hover:text-pink-600 py-2"
                onClick={() => setShopHover(!shopHover)}
              >
                SHOP
                <svg
                  className={`w-4 h-4 transition-transform duration-300 ${
                    shopHover ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div
                className={`
                overflow-hidden transition-all duration-300 ease-in-out
                ${
                  shopHover ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
                }
              `}
              >
                <div className="py-2 px-4 space-y-4">
                  {/* Shop Categories */}
                  <div>
                    <h4 className="font-medium text-sm mb-2">
                      Shop By Category
                    </h4>
                    <ul className="space-y-2 ml-2">
                      <li className="text-gray-600 hover:text-pink-600 text-sm">
                        Best Sellers
                      </li>
                      <li className="text-gray-600 hover:text-pink-600 text-sm">
                        French nails
                      </li>
                      <li className="text-gray-600 hover:text-pink-600 text-sm">
                        Casual Wear Nails
                      </li>
                      <li className="text-gray-600 hover:text-pink-600 text-sm">
                        Toe Nails
                      </li>
                      <li className="text-gray-600 hover:text-pink-600 text-sm">
                        Ombre Nails
                      </li>
                    </ul>
                  </div>
                  {/* Shop By Shape */}
                  <div>
                    <h4 className="font-medium text-sm mb-2">Shop By Shape</h4>
                    <ul className="space-y-2 ml-2">
                      <li className="text-gray-600 hover:text-pink-600 text-sm">
                        Coffin Nails
                      </li>
                      <li className="text-gray-600 hover:text-pink-600 text-sm">
                        Stiletto Nails
                      </li>
                      <li className="text-gray-600 hover:text-pink-600 text-sm">
                        Square Nails
                      </li>
                      {/* ...other shapes... */}
                    </ul>
                  </div>
                  {/* Add other shop sections similarly */}
                </div>
              </div>
            </li>
            {/* <li className="border-b border-gray-100 pb-2">
              <Link to="/sale" className="text-gray-800 hover:text-pink-600">SALE</Link>
            </li> */}
            <li className="border-b border-gray-100 pb-2">
              <Link
                to="/appointment"
                className="text-gray-800 hover:text-pink-600"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                BOOK AN APPOINTMENT
              </Link>
            </li>
            <li className="border-b border-gray-100 pb-2">
              <Link
                to="/tutorial"
                className="text-gray-800 hover:text-pink-600"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                TUTORIAL
              </Link>
            </li>
            {/* <li className="border-b border-gray-100 pb-2">
              <Link to="/blog" className="text-gray-800 hover:text-pink-600">BLOG</Link>
            </li> */}
            <li className="border-b border-gray-100 pb-2">
              <Link
                to="/contact"
                className="text-gray-800 hover:text-pink-600"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                CONTACT US
              </Link>
            </li>

            {/* Authentication Links */}
            {isAuthenticated ? (
              <>
                <li className="border-b border-gray-100 pb-2">
                  <Link
                    to="/account"
                    className="text-gray-800 hover:text-pink-600"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    MY ACCOUNT
                  </Link>
                </li>
                <li className="border-b border-gray-100 pb-2">
                  <button
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="text-gray-800 hover:text-pink-600 w-full text-left"
                  >
                    SIGN OUT
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="border-b border-gray-100 pb-2">
                  <Link
                    to="/login"
                    className="text-gray-800 hover:text-pink-600"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    LOGIN
                  </Link>
                </li>
                <li className="border-b border-gray-100 pb-2">
                  <Link
                    to="/register"
                    className="text-gray-800 hover:text-pink-600"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    REGISTER
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
