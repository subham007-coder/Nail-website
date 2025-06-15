import React from 'react';
import { Link } from 'react-router-dom';
import { FiClock } from 'react-icons/fi';

function RecentActivity() {
  const activities = [
    {
      id: 1,
      type: 'appointment',
      message: 'New appointment booked by Sarah Smith',
      time: '2 minutes ago',
      link: '/appointments'
    },
    {
      id: 2,
      type: 'order',
      message: 'New order #1234 received',
      time: '15 minutes ago',
      link: '/orders'
    },
    // Add more activities as needed
  ];

  return (
    <div className="bg-white rounded-2xl shadow-soft p-6">
      <h2 className="text-xl font-serif text-gray-900 mb-4">Recent Activity</h2>
      <div className="space-y-4">
        {activities.map((activity) => (
          <Link
            key={activity.id}
            to={activity.link}
            className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="flex-shrink-0">
              <FiClock className="w-5 h-5 text-gray-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-900">{activity.message}</p>
              <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default RecentActivity;