import { Link, useLocation } from 'react-router-dom';
import { FiX, FiHome, FiCalendar, FiShoppingBag, FiUsers, FiBox, FiMail } from 'react-icons/fi';

function Sidebar({ open, setOpen }) {
  const location = useLocation();
  
  const navigation = [
    { name: 'Dashboard', icon: FiHome, href: '/' },
    { name: 'Appointments', icon: FiCalendar, href: '/appointments' },
    { name: 'Products', icon: FiBox, href: '/products' },
    { name: 'Orders', icon: FiShoppingBag, href: '/orders' },
    { name: 'Users', icon: FiUsers, href: '/users' },
    { name: 'Contact', icon: FiMail, href: '/contact' },
    { name: 'Contact Submissions', icon: FiMail, href: '/contact-submissions' },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      <div
        className={`fixed inset-0 bg-gray-900/50 lg:hidden ${
          open ? 'block' : 'hidden'
        }`}
        onClick={() => setOpen(false)}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 bottom-0 w-72 bg-white border-r transform 
          ${open ? 'translate-x-0' : '-translate-x-full'} 
          lg:translate-x-0 transition-transform duration-300 ease-in-out z-30`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b">
          <h1 className="text-xl font-serif">Admin Panel</h1>
          <button
            className="lg:hidden"
            onClick={() => setOpen(false)}
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>

        <nav className="p-4 space-y-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium
                ${location.pathname === item.href
                  ? 'bg-pink-50 text-pink-600'
                  : 'text-gray-600 hover:bg-gray-50'
                }`}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}

export default Sidebar;