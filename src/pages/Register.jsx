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

  const { register } = useAuth(); // ✅ use context register method
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
  
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
            />
            <label htmlFor="num">Phone Number</label>
          </div>

          <div className="input-container">
            <input
              type="password"
              id="password"
              name="password"
              required
              value={newUser.password}
              onChange={handleChange}
            />
            <label htmlFor="password">Password</label>
          </div>

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
