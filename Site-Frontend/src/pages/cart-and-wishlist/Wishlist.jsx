import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import WishlistItem from '../../components/shop/cart-and-wishlist/WishlistItem';
import EmptyWishlist from '../../components/shop/cart-and-wishlist/EmptyWishlist';

function Wishlist() {
  // Sample wishlist data - replace with your actual data management
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: "Classic French Tips",
      price: 299,
      oldPrice: 399,
      image: "https://nailknack.com/cdn/shop/files/AnyConv.com__Untitleddesign_2_d28a6844-4386-4286-84a0-284ef960047e.webp?v=1699124940&width=720",
      category: "French Nails",
    },
    // Add more items as needed
  ]);

  const handleRemoveFromWishlist = (productId) => {
    setWishlistItems(items => items.filter(item => item.id !== productId));
  };

  const handleMoveToCart = (productId) => {
    // Add your cart logic here
    // handleRemoveFromWishlist(productId);
    console.log("add to cart", productId);
    
  };

  return (
    <div className="min-h-screen bg-[#FDF8F5]">
      <Navbar />

      {/* Banner Section */}
      <div className="bg-gradient-to-r from-pink-50 to-purple-50">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl md:text-4xl font-serif text-gray-900 text-center">
            My Wishlist
          </h1>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex text-sm">
            <Link to="/" className="text-gray-600 hover:text-pink-600">Home</Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-pink-600">Wishlist</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {wishlistItems.length > 0 ? (
          <div className="max-w-3xl mx-auto space-y-6">
            <AnimatePresence>
              {wishlistItems.map(item => (
                <WishlistItem
                  key={item.id}
                  product={item}
                  onRemove={handleRemoveFromWishlist}
                  onMoveToCart={handleMoveToCart}
                />
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <EmptyWishlist />
        )}
      </div>

      <Footer />
    </div>
  );
}

export default Wishlist;