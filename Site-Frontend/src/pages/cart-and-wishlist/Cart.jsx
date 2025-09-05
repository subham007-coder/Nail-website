import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import CartItem from '../../components/shop/cart-and-wishlist/CartItem';
import EmptyCart from '../../components/shop/cart-and-wishlist/EmptyCart';
import { useCart } from '../../context/CartContext';

function Cart() {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();

  return (
    <div className="min-h-screen bg-[#FDF8F5]">
      <Navbar />

      {/* Banner Section */}
      <div className="bg-gradient-to-r from-pink-50 to-purple-50">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl md:text-4xl font-serif text-gray-900 text-center">
            Shopping Cart
          </h1>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex text-sm">
            <Link to="/" className="text-gray-600 hover:text-pink-600">Home</Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-pink-600">Cart</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {cartItems.length > 0 ? (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              <AnimatePresence>
                {cartItems.map(item => (
                  <CartItem
                    key={item.id}
                    product={item}
                    onRemove={removeFromCart}
                    onQuantityChange={updateQuantity}
                  />
                ))}
              </AnimatePresence>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl p-6 shadow-soft sticky top-4"
              >
                <h2 className="text-xl font-serif text-gray-900 mb-6">Order Summary</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>₹{getCartTotal()}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between text-lg font-medium text-gray-900">
                      <span>Total</span>
                      <span>₹{getCartTotal()}</span>
                    </div>
                  </div>
                </div>

                <button
                  className="w-full bg-pink-600 text-white mt-6 px-8 py-4 rounded-xl 
                    hover:bg-pink-700 transition-colors duration-200 flex items-center 
                    justify-center group text-lg font-medium"
                >
                  Proceed to Checkout
                  <span className="ml-2 transform group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </button>
              </motion.div>
            </div>
          </div>
        ) : (
          <EmptyCart />
        )}
      </div>

      <Footer />
    </div>
  );
}

export default Cart;