import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Register.css";
import { useAuth } from "../components/AuthContext/AuthContext.jsx";

const Register = () => {
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    num: "",
    password: "",
  });

  const { register } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const exists = users.find((u) => u.email === newUser.email);
    if (exists) {
      setError("❌ Cet email est déjà utilisé.");
      return;
    }

    setError("");
    register({
      name: newUser.name,
      email: newUser.email,
      password: newUser.password,
    });
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h2>Sign Up</h2>
        <p>Create your account to access all features.</p>

        <form onSubmit={submitHandler}>
          <div className="input-container">
            <input
              type="text"
              id="fullname"
              name="name"
              required
              value={newUser.name}
              onChange={handleChange}
              placeholder=" "
            />
            <label htmlFor="fullname">Full Name</label>
          </div>

          <div className="input-container">
            <input
              type="email"
              id="email"
              name="email"
              required
              value={newUser.email}
              onChange={handleChange}
              placeholder=" "
            />
            <label htmlFor="email">Email</label>
          </div>

          <div className="input-container">
            <input
              type="text"
              id="num"
              name="num"
              required
              value={newUser.num}
              onChange={handleChange}
              placeholder=" "
            />
            <label htmlFor="num">Phone Number</label>
          </div>

          <div className="input-container password-field">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              required
              value={newUser.password}
              onChange={handleChange}
              placeholder=" "
            />
            <label htmlFor="password">Password</label>
            <span
              className="toggle-password"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              <i className={showPassword ? "ri-eye-off-line" : "ri-eye-line"}></i>
            </span>
          </div>

          {error && <p className="error-message">{error}</p>}

          <button type="submit">Sign Up</button>
        </form>

        <p className="login-link">
          Already have an account?{" "}
          <a href="/login" className="link">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
