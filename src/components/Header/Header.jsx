import React, { useRef, useEffect } from "react";
import { useLocation, NavLink, Link } from "react-router-dom";
import { Container } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";

import logo from "../../assets/images/res-logo.png";
import { cartUiActions } from "../../store/shopping-cart/cartUiSlice";
import UserMenu from "../UI/UserMenu/UserMenu.jsx";

import "../../styles/header.css";

const nav__links = [
  { display: "Home", path: "/home" },
  { display: "About", path: "/About" },
  { display: "Menu", path: "/Menu" },
  { display: "Contact", path: "/contact" },
];

const Header = () => {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");

  const menuRef = useRef(null);
  const headerRef = useRef(null);
  const dispatch = useDispatch();
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  const toggleMenu = () => menuRef.current.classList.toggle("show__menu");
  const toggleCart = () => dispatch(cartUiActions.toggle());

  useEffect(() => {
    const handleScroll = () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("header__shrink");
      } else {
        headerRef.current.classList.remove("header__shrink");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <div className="nav__wrapper d-flex align-items-center justify-content-between">
          {/* Logo */}
          <div className="logo">
            <img src={logo} alt="logo" />
          </div>

          {/* Navigation Links (hidden on admin routes) */}
          {!isAdminPage && (
            <div className="navigation" ref={menuRef} onClick={toggleMenu}>
              <div className="menu d-flex align-items-center gap-5">
                {nav__links.map((item, index) => (
                  <NavLink
                    to={item.path}
                    key={index}
                    className={(navClass) =>
                      navClass.isActive ? "active__menu" : ""
                    }
                  >
                    {item.display}
                  </NavLink>
                ))}
              </div>
            </div>
          )}

          {/* Icons */}
          <div className="nav__right d-flex align-items-center gap-4">
            {/* Show only on non-admin pages */}
            {!isAdminPage && (
              <>
                <span className="favorite__icon">
                  <Link to="/Favorite">
                    <i className="ri-heart-line"></i>
                  </Link>
                </span>

                <span className="cart__icon" onClick={toggleCart}>
                  <i className="ri-shopping-bag-line"></i>
                  <span className="cart__badge">{totalQuantity}</span>
                </span>
              </>
            )}

            <UserMenu />

            <span className="mobile__menu" onClick={toggleMenu}>
              <i className="ri-menu-line"></i>
            </span>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
