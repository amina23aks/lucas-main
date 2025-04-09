import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { favoritesActions } from "../../store/favoritesSlice";

export const AuthContext = createContext();

const ADMIN_EMAIL = "aksouh23zerrouki@gmail.com";
const ADMIN_PASSWORD = "dash0823";
const ADMIN_NAME = "zerrouki, aksouh";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ✅ Restore session user on app load
  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      dispatch(favoritesActions.setUser(storedUser.email));
    }
    setLoading(false);
  }, [dispatch]);

  // ✅ Login function
  const login = ({ email, password }) => {
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const adminUser = {
        email,
        name: ADMIN_NAME,
        isAdmin: true,
      };
      sessionStorage.setItem("user", JSON.stringify(adminUser));
      setUser(adminUser);
      dispatch(favoritesActions.setUser(email));
      navigate("/admin");
      return;
    }

    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const foundUser = storedUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      const normalUser = {
        email: foundUser.email,
        name: foundUser.name,
        isAdmin: false,
      };
      sessionStorage.setItem("user", JSON.stringify(normalUser));
      setUser(normalUser);
      dispatch(favoritesActions.setUser(email));
      navigate("/");
    } else {
      alert("❌ Email ou mot de passe incorrect");
    }
  };

  // ✅ Register function
  const register = ({ name, email, password, num }) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = users.find((u) => u.email === email);

    if (userExists) {
      alert("❌ Cet email est déjà utilisé");
      return;
    }

    const newUser = {
      name,
      email,
      password,
      num,
      isAdmin: false,
    };

    const updatedUsers = [...users, newUser];
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    const userToLogin = {
      name,
      email,
      isAdmin: false,
    };

    sessionStorage.setItem("user", JSON.stringify(userToLogin));
    setUser(userToLogin);
    dispatch(favoritesActions.setUser(email));
    navigate("/");
  };

  // ✅ Logout function
  const logout = () => {
    sessionStorage.removeItem("user");
    setUser(null);
    dispatch(favoritesActions.setUser(null));
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
