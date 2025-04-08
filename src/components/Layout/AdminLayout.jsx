import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../AuthContext/AuthContext.jsx';
import "../../styles/admin.css";

const AdminLayout = () => {
  const { user, logout } = useAuth();

  return (
    <div className="flex min-h-screen bg-gray-100 text-dark">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-xl p-5">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <nav className="flex flex-col gap-3 text-sm font-medium">
          <Link to="/admin" className="hover:text-primary">Dashboard</Link>
          <Link to="/admin/products" className="hover:text-primary">Gérer Produits</Link>
          <Link to="/admin/messages" className="hover:text-primary">Contact Messages</Link>
          <Link to="/admin/my-orders" className="hover:text-primary">My Orders</Link>
          <Link to="/admin/comments" className="hover:text-primary">Gérer Commentaires</Link>

          {/* 🔴 Styled Logout Button */}
          <button
            onClick={logout}
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
          >
            Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Welcome, {user?.name}</h1>
        </header>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
