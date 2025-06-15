import React from 'react';
import { FiUsers, FiCalendar, FiShoppingBag, FiDollarSign } from 'react-icons/fi';
import StatsCard from '../components/dashboard/StatsCard';
import RecentActivity from '../components/dashboard/RecentActivity';

function Dashboard() {
  const stats = [
    {
      title: 'Total Users',
      value: '2,345',
      icon: <FiUsers className="w-6 h-6 text-pink-600" />,
      trend: 12
    },
    {
      title: 'Appointments Today',
      value: '15',
      icon: <FiCalendar className="w-6 h-6 text-pink-600" />,
      trend: 5
    },
    {
      title: 'New Orders',
      value: '25',
      icon: <FiShoppingBag className="w-6 h-6 text-pink-600" />,
      trend: -2
    },
    {
      title: 'Total Revenue',
      value: '₹12,345',
      icon: <FiDollarSign className="w-6 h-6 text-pink-600" />,
      trend: 8
    }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-serif text-gray-900">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-soft p-6">
          <h2 className="text-xl font-serif text-gray-900 mb-4">Sales Overview</h2>
          {/* Add your chart component here */}
        </div>
        <RecentActivity />
      </div>
    </div>
  );
}

export default Dashboard;