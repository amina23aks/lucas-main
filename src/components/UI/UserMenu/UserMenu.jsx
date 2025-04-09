import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../AuthContext/AuthContext';
import './../../../styles/user-menu.css';

const UserMenu = () => {
  const { user, logout } = useAuth(); // ✅ Use context instead of sessionStorage
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // ✅ Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="user-menu" ref={dropdownRef}>
      <span className="user-icon" onClick={toggleDropdown}>
        <i className="ri-user-line"></i>
      </span>

      {isDropdownOpen && (
        <div className="dropdown-content">
          {user ? (
            <>
              <div className="user-info">
                <span className="welcome-text">
                  Welcome, {user.name}
                </span>
              </div>
              <div className="dropdown-items">
                <button onClick={logout} className="logout-btn">
                  <i className="ri-logout-box-line"></i>
                  Disconnect
                </button>
              </div>
            </>
          ) : (
            <div className="dropdown-items">
              <button onClick={() => (window.location.href = '/login')}>
                <i className="ri-login-box-line"></i>
                Login
              </button>
              <button onClick={() => (window.location.href = '/register')}>
                <i className="ri-user-add-line"></i>
                Register
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserMenu;
