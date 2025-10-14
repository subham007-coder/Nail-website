import React from 'react';
import { motion } from 'framer-motion';
import { FiTruck, FiMail, FiClock, FiCreditCard } from 'react-icons/fi';

function OrderStatusCard({ order }) {
  const statusConfig = {
    'Pending': { color: 'blue', icon: FiClock, text: 'Your order is being processed' },
    'Processing': { color: 'yellow', icon: FiTruck, text: 'Your order is being prepared' },
    'Delivered': { color: 'green', icon: FiTruck, text: 'Your order has been delivered' },
    'Cancel': { color: 'red', icon: FiClock, text: 'Your order has been cancelled' }
  };

  const config = statusConfig[order?.status] || statusConfig['Pending'];
  const IconComponent = config.icon;

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.8, duration: 0.5 }}
      className="bg-white rounded-xl p-6 shadow-soft border-l-4 border-pink-500"
    >
      <div className="flex items-center gap-4 mb-4">
        <div className={`p-3 rounded-full bg-${config.color}-100`}>
          <IconComponent className={`w-6 h-6 text-${config.color}-600`} />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Order Status</h3>
          <p className={`text-sm text-${config.color}-600 font-medium`}>
            {order?.status || 'Pending'}
          </p>
        </div>
      </div>
      
      <p className="text-gray-600 text-sm mb-4">{config.text}</p>
      
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-500">Payment Method:</span>
          <span className="font-medium">{order?.paymentMethod || 'Cash on Delivery'}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Total Amount:</span>
          <span className="font-medium">₹{order?.total || 0}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Order Date:</span>
          <span className="font-medium">
            {order?.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'Today'}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default OrderStatusCard;
