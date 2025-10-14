import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiShoppingBag, FiUser, FiHome, FiMail } from 'react-icons/fi';

function NextStepsCard() {
  const steps = [
    {
      icon: FiMail,
      title: 'Check Your Email',
      description: 'We\'ve sent you a confirmation email with order details',
      color: 'blue'
    },
    {
      icon: FiUser,
      title: 'Track Your Order',
      description: 'Visit your account to track order status and updates',
      color: 'green'
    },
    {
      icon: FiShoppingBag,
      title: 'Continue Shopping',
      description: 'Explore more beautiful nail products and accessories',
      color: 'pink'
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.0, duration: 0.5 }}
      className="bg-white rounded-xl p-6 shadow-soft"
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-6">What's Next?</h3>
      
      <div className="space-y-4">
        {steps.map((step, index) => {
          const IconComponent = step.icon;
          return (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 + (index * 0.1), duration: 0.5 }}
              className="flex items-start gap-4"
            >
              <div className={`p-2 rounded-lg bg-${step.color}-100 flex-shrink-0`}>
                <IconComponent className={`w-5 h-5 text-${step.color}-600`} />
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-1">{step.title}</h4>
                <p className="text-sm text-gray-600">{step.description}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
      
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex flex-col sm:flex-row gap-3">
          <Link 
            to="/account" 
            className="flex-1 bg-pink-600 text-white px-4 py-3 rounded-lg hover:bg-pink-700 transition-colors text-center font-medium"
          >
            View My Orders
          </Link>
          <Link 
            to="/shop" 
            className="flex-1 bg-gray-100 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-200 transition-colors text-center font-medium"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default NextStepsCard;
