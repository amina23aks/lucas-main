import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Pages
import Home from "../pages/Home";
import AllFoods from "../pages/AllFoods";
import FoodDetails from "../pages/FoodDetails";
import Checkout from "../pages/Checkout";
import Contact from "../pages/Contact";
import Login from "../pages/Login";
import Register from "../pages/Register";
import About from "../pages/About";
import Favorite from "../pages/Favorite";

// Admin
import AdminLayout from "../components/Layout/AdminLayout.jsx";
import AdminDashboard from "../pages/AdminDashboard";
import AdminMessages from "../pages/AdminMessages";
import MyOrders from "../pages/MyOrders";
import AdminProducts from "../pages/AdminProducts";
import AdminComments from "../pages/AdminComments";
import FavoritesList from "../pages/FavoritesList";

// Auth
import PrivateAdminRoute from "../routes/PrivateAdminRoute.jsx";

const Routers = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/Menu" element={<AllFoods />} />
      <Route path="/About" element={<About />} />
      <Route path="/foods/:id" element={<FoodDetails />} />
      <Route path="/Favorite" element={<Favorite />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/contact" element={<Contact />} />

      {/* Protected Admin Routes */}
      <Route
        path="/admin"
        element={
          <PrivateAdminRoute>
            <AdminLayout />
          </PrivateAdminRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="messages" element={<AdminMessages />} />
        <Route path="my-orders" element={<MyOrders />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="comments" element={<AdminComments />} />
        <Route path="favorites" element={<FavoritesList />} />

      </Route>
    </Routes>
  );
};

export default Routers;
