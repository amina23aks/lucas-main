import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";
import Routes from "../../routes/Routers";
import Carts from "../UI/cart/Carts.jsx";
import { useSelector } from "react-redux";

const Layout = () => {
  const showCart = useSelector((state) => state.cartUi.cartIsVisible);
  const location = useLocation();

  // ✅ Detect if current route starts with /admin
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div>
      <Header />
      {showCart && <Carts />}

      <div>
        <Routes />
      </div>

      {/* ✅ Only show Footer if not on admin pages */}
      {!isAdminRoute && <Footer />}
    </div>
  );
};

export default Layout;
