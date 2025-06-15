import React from 'react';

function StatsCard({ title, value, icon, trend }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-soft">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <p className="mt-2 text-3xl font-semibold text-gray-900">{value}</p>
          {trend && (
            <p className={`mt-2 text-sm ${
              trend > 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}% from last month
            </p>
          )}
        </div>
        <div className="p-3 bg-pink-50 rounded-xl">
          {icon}
        </div>
      </div>
    </div>
  );
}

export default StatsCard;