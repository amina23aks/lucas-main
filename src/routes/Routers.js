import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home";
import AllFoods from "../pages/AllFoods";
import FoodDetails from "../pages/FoodDetails";
import Checkout from "../pages/Checkout";
import Contact from "../pages/Contact";
import Login from "../pages/Login";
import Register from "../pages/Register";
import About from "../pages/About"
import Favorite from "../pages/Favorite";
import AdminLayout from '../components/Layout/AdminLayout.jsx';
import AdminDashboard from '../pages/AdminDashboard';
import AdminMessages from '../pages/AdminMessages';
import MyOrders from "../pages/MyOrders"; 
import AdminProducts from "../pages/AdminProducts";
import AdminComments from "pages/AdminComments";



const Routers = () => {
  return (
    <Routes>
   
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/Menu" element={<AllFoods />} />
      <Route path="/About" element={<About  />} />
      <Route path="/foods/:id" element={<FoodDetails />} />
      <Route path="/Favorite" element={<Favorite />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/admin" element={<AdminLayout />}>
  <Route index element={<AdminDashboard />} />
  <Route path="messages" element={<AdminMessages />} />
  <Route path="/admin/my-orders" element={<MyOrders />} /> 
  <Route path="/admin/products" element={<AdminProducts />} />
  <Route path="/admin/comments" element={<AdminComments />} />

</Route>


    </Routes>
  );
};

export default Routers;
