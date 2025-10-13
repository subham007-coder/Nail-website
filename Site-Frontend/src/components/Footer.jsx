import React from "react";
import { Link } from "react-router-dom";
import { FiInstagram, FiFacebook, FiTwitter, FiYoutube } from "react-icons/fi";

function Footer() {
  // Update quickLinks array
  const quickLinks = [
    { name: "Home", path: "/" },
    // { name: 'About Us', path: '/about' },
    { name: "Shop", path: "/shop" },
    { name: "Book an Appointment", path: "/appointment" },
    { name: "Contact", path: "/contact" },
  ];
  // Update customerService array
  const customerService = [
    { name: "Shipping Policy", path: "/shipping" },
    { name: "Return Policy", path: "/return" },
    { name: "FAQ", path: "/faq" },
    { name: "Track Order", path: "/track-order" },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <img
              src="/assets/logo2.PNG"
              alt="Nailz By Angana Logo"
              className="w-32 md:w-40 object-contain filter brightness-110 hover:brightness-125 transition-all duration-300"
            />
            <p className="text-sm leading-relaxed">
              Experience the perfect blend of style and convenience with our
              premium press-on nails. Designed for the modern woman who values
              both beauty and time.
            </p>
            <div className="flex space-x-4">
              {/* <a href="https://www.instagram.com/nailz_by_angana?igsh=ZnAxNnk2OTQzeGpl" className="hover:text-pink-500 transition-colors"> */}
              <a href="#" className="hover:text-pink-500 transition-colors">
                <FiInstagram className="w-5 h-5" />
              </a>
              {/* <a href="https://www.facebook.com/AnganaNailStudio?rdid=qjK8SFMNBJ65k8uY&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1GxhvS2UTB%2F#" className="hover:text-pink-500 transition-colors"> */}
              <a href="#" className="hover:text-pink-500 transition-colors">
                <FiFacebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-pink-500 transition-colors">
                <FiTwitter className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-pink-500 transition-colors">
                <FiYoutube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-sm hover:text-pink-500 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">
              Customer Service
            </h3>
            <ul className="space-y-2">
            {customerService.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-sm hover:text-pink-500 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Stay Updated</h3>
            <p className="text-sm">
              Subscribe to our newsletter for exclusive offers and updates.
            </p>
            <form className="flex flex-col space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm">
              © {new Date().getFullYear()} AR Lashes. All rights reserved.
            </p>
            <p className="text-sm">
              Website Design And Development by{" "}
              <a
                href="https://growstara.in"
                className="hover:text-pink-500 transition-colors font-semibold"
              >
                Growstara Digital
              </a>
            </p>
            <div className="flex space-x-6">
            <Link
                to="/privacy"
                className="text-sm hover:text-pink-500 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="text-sm hover:text-pink-500 transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;