import { FiMenu, FiBell, FiUser } from 'react-icons/fi';

function Header({ onMenuClick }) {
  return (
    <header className="sticky top-0 z-20 bg-white border-b">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6">
        <button
          className="lg:hidden"
          onClick={onMenuClick}
        >
          <FiMenu className="w-6 h-6" />
        </button>

        <div className="flex items-center gap-4">
          <button className="p-1 rounded-full hover:bg-gray-50">
            <FiBell className="w-6 h-6" />
          </button>
          <button className="p-1 rounded-full hover:bg-gray-50">
            <FiUser className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;