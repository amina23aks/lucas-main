import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { favoritesActions } from "../../store/favoritesSlice"; // adjust path as needed

// ✅ Define constants
export const AuthContext = createContext();
const ADMIN_EMAIL = "aksouh23zerrouki@gmail.com";
const ADMIN_PASSWORD = "dash0823";
const ADMIN_NAME = "zerrouki, aksouh";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      dispatch(favoritesActions.setUser(storedUser.email)); // Load favorites for user
    }
  }, [dispatch]);

  const login = ({ email, password }) => {
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const adminUser = {
        email,
        name: ADMIN_NAME,
        isAdmin: true,
      };
      localStorage.setItem("user", JSON.stringify(adminUser));
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
      localStorage.setItem("user", JSON.stringify(normalUser));
      setUser(normalUser);
      dispatch(favoritesActions.setUser(email));
      navigate("/");
    } else {
      alert("❌ Email ou mot de passe incorrect");
    }
  };

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

    localStorage.setItem("user", JSON.stringify(userToLogin));
    setUser(userToLogin);
    dispatch(favoritesActions.setUser(email));
    navigate("/");
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    dispatch(favoritesActions.setUser(null)); // Clear favorite link
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
