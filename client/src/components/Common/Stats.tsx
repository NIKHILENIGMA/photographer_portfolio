import React from "react";

const Stats: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800">Profile Visits</h2>
        <p className="text-4xl font-bold text-blue-600 mt-2">1,234</p>
        <p className="text-sm text-gray-500 mt-2">Last 30 days</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800">Contact Forms</h2>
        <p className="text-4xl font-bold text-green-600 mt-2">89</p>
        <p className="text-sm text-gray-500 mt-2">Total submissions</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800">Photos</h2>
        <p className="text-4xl font-bold text-purple-600 mt-2">567</p>
        <p className="text-sm text-gray-500 mt-2">Total uploaded</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800">Active Users</h2>
        <p className="text-4xl font-bold text-orange-600 mt-2">342</p>
        <p className="text-sm text-gray-500 mt-2">Currently online</p>
      </div>
    </div>
  );
};

export default Stats;
