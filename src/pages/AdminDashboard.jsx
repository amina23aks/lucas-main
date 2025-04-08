import React from "react";
import { useNavigate } from "react-router-dom";
import { FaBoxOpen, FaEnvelopeOpenText, FaShoppingCart } from "react-icons/fa";

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800">📊 Dashboard</h2>
      <p className="text-gray-600">
        Welcome to the admin panel! Use the menu to manage your site.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Products Card */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-md p-6 hover:shadow-lg transition">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 text-xl font-semibold text-gray-700">
              <FaBoxOpen className="text-green-600" />
              Products
            </div>
            <button
              onClick={() => navigate("/admin/products")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-full text-sm transition"
            >
              View
            </button>
          </div>
          <p className="text-sm text-gray-500">Manage and update products</p>
        </div>

        {/* Messages Card */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-md p-6 hover:shadow-lg transition">
          <div className="flex items-center gap-2 text-xl font-semibold text-gray-700 mb-2">
            <FaEnvelopeOpenText className="text-yellow-500" />
            Contact Messages
          </div>
          <p className="text-sm text-gray-500">View messages from users</p>
        </div>

        {/* Orders Card */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-md p-6 hover:shadow-lg transition">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 text-xl font-semibold text-gray-700">
              <FaShoppingCart className="text-red-500" />
              Orders
            </div>
            <button
              onClick={() => navigate("/admin/my-orders")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-full text-sm transition"
            >
              View
            </button>
          </div>
          <p className="text-sm text-gray-500">Click to view all orders</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
