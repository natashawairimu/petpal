import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { registerUser } from "../services/Api";

export default function Register() {

  const [formData, setformData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate(); 

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page from reloading on form submit
    console.log('Submitting:', formData); // Debug log for submitted data

    try {
      // Attempt to register the user using the API
      const result = await registerUser(formData);
      console.log('Registration successful:', result);

      
      navigate("/login");
    } catch (error) {
      // If registration fails, show error message
      console.error('Registration failed:', error);
      alert(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="auth-container">
      {}
      <h2 className="auth-title">Sign Up</h2>

      {}
      <form className="auth-form" onSubmit={handleSubmit}>
        {}
        <input
          type="text"
          placeholder="Full Name"
          value={formData.name}
          onChange={(e) => setformData({ ...formData, name: e.target.value })}
          required
        />

        {}
        <input
          type="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={(e) => setformData({ ...formData, email: e.target.value })}
          required
        />

        {}
        <input
          type="password"
          placeholder="Create Password"
          value={formData.password}
          onChange={(e) => setformData({ ...formData, password: e.target.value })}
          required
        />

        {}
        <button type="submit">Sign Up</button>
      </form>

      {/* Link to login page for existing users */}
      <p className="switch-auth">
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </div>
  );
}
