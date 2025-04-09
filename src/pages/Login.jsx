import React, { useRef, useState } from 'react';
import { useAuth } from '../components/AuthContext/AuthContext.jsx';
import { useDispatch } from 'react-redux';
import { cartActions } from '../store/shopping-cart/cartSlice.js';
import '../styles/Login.css';

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const dispatch = useDispatch();

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();

    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value.trim();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Admin shortcut login
    if (email === "aksouh23zerrouki@gmail.com" && password === "dash0823") {
      login({ email, password });
      return;
    }

    const userFound = users.find((u) => u.email === email);

    if (!userFound) {
      setError("❌ Ce compte n'existe pas. Veuillez vous inscrire.");
      return;
    }

    if (userFound.password !== password) {
      setError("❌ Mot de passe incorrect.");
      return;
    }

    // ✅ Login successful
    setError("");
    localStorage.setItem("currentUser", JSON.stringify(userFound)); // ✅ Store current user
    login({ email, password }); // ✅ Log in the user (context)

    // ✅ Load user's cart from localStorage
    const userCart = JSON.parse(localStorage.getItem(`cart_${userFound.email}`)) || {
      items: [],
      totalAmount: 0,
      totalQuantity: 0,
    };

    dispatch(cartActions.setCart(userCart)); // ✅ Update Redux with user's cart
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Connexion</h2>
        <p>Veuillez entrer vos informations de connexion.</p>

        <form onSubmit={submitHandler}>
          <div className="input-container">
            <input
              type="email"
              id="email"
              required
              ref={emailRef}
              placeholder="Email"
            />
            <label htmlFor="email">Email</label>
          </div>

          <div className="input-container password-field">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              required
              ref={passwordRef}
              placeholder="Mot de passe"
            />
            <label htmlFor="password">Mot de passe</label>
            <span
              className="toggle-password"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              <i className={showPassword ? "ri-eye-off-line" : "ri-eye-line"}></i>
            </span>
          </div>

          {error && (
            <>
              <p className="error-message">{error}</p>
              {error.includes("compte") && (
                <p className="register-suggestion">
                  <a href="/register">Créer un compte ici</a>
                </p>
              )}
            </>
          )}

          <button type="submit">Se connecter</button>
        </form>

        <p className="register-link">
          Pas encore inscrit ?{" "}
          <a href="/register" className="link">
            registre
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
