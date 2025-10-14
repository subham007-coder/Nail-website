import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import { apiRequest } from '../utils/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ThankYouHeader from '../components/ThankYou/ThankYouHeader';
import OrderStatusCard from '../components/ThankYou/OrderStatusCard';
import NextStepsCard from '../components/ThankYou/NextStepsCard';

function ThankYou() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderData = async () => {
      if (orderId) {
        try {
          const order = await apiRequest(`/order/${orderId}`);
          setOrderData(order);
        } catch (error) {
          console.error('Error fetching order:', error);
        }
      }
      setLoading(false);
    };

    fetchOrderData();
  }, [orderId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FDF8F5]">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="text-lg">Loading...</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDF8F5]">
      <Navbar />
      
      <div className="bg-gradient-to-r from-pink-50 to-purple-50">
        <div className="container mx-auto px-4 py-8">
          <ThankYouHeader orderId={orderId} />
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <OrderStatusCard order={orderData} />
          <NextStepsCard />
        </div>
        
        {/* Additional Info Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.5 }}
          className="mt-12 bg-white rounded-xl p-6 shadow-soft max-w-4xl mx-auto"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Need Help?</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Customer Support</h4>
              <p className="text-sm text-gray-600 mb-3">
                Have questions about your order? Our customer support team is here to help.
              </p>
              <Link 
                to="/contact" 
                className="text-pink-600 hover:text-pink-700 font-medium text-sm"
              >
                Contact Support →
              </Link>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Order Updates</h4>
              <p className="text-sm text-gray-600 mb-3">
                We'll keep you updated on your order status via email and SMS.
              </p>
              <Link 
                to="/account" 
                className="text-pink-600 hover:text-pink-700 font-medium text-sm"
              >
                Track Order →
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
      
      <Footer />
    </div>
  );
}

export default ThankYou;