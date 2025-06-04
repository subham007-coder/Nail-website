import { FiUser, FiHeart, FiShoppingCart, FiSearch } from 'react-icons/fi';

export default function Navbar() {
  return (
    <div className="w-full">
      {/* Flash Sale Bar */}
      <div className="bg-pink-600 text-white text-sm text-center py-2 flex justify-center items-center gap-2">
        FLASH SALE ENDING SOON
        <div className="flex gap-1 text-black bg-white px-2 rounded">
          <span>14</span>:<span>22</span>:<span>52</span>
        </div>
        <button className="ml-2 bg-white text-pink-600 px-3 py-1 text-sm rounded hover:bg-gray-100 transition">
          Shop Now
        </button>
      </div>

      {/* Main Navbar */}
      <div className="flex items-center justify-between px-6 py-4 shadow-md bg-white">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img src="/logo.png" alt="Logo" className="h-10" />
        </div>

        {/* Navigation Links */}
        <ul className="hidden md:flex space-x-6 font-semibold text-sm">
          <li className="hover:text-pink-600 cursor-pointer">HOME</li>
          <li className="hover:text-pink-600 cursor-pointer">SHOP</li>
          <li className="hover:text-pink-600 cursor-pointer">SALE</li>
          <li className="hover:text-pink-600 cursor-pointer">DESIGNER NAILS</li>
          <li className="hover:text-pink-600 cursor-pointer">TUTORIAL</li>
          <li className="hover:text-pink-600 cursor-pointer">BLOG</li>
          <li className="hover:text-pink-600 cursor-pointer">CONTACT US</li>
        </ul>

        {/* Search and Icons */}
        <div className="flex items-center gap-4">
          {/* Search Bar */}
          <div className="hidden md:flex items-center border rounded-full px-3 py-1 w-64">
            <FiSearch className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="I’m looking for..."
              className="outline-none w-full text-sm"
            />
          </div>

          {/* Icons */}
          <div className="flex items-center gap-3 text-xl">
            <FiUser className="cursor-pointer" />
            <div className="relative">
              <FiHeart className="cursor-pointer" />
              <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">0</span>
            </div>
            <div className="relative">
              <FiShoppingCart className="cursor-pointer" />
              <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">0</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
