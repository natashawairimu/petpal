import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register({ onSignup }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage('');

    if (!name || !email || !password) {
      setMessage('Please fill in all fields.');
      return;
    }

    fetch('http://localhost:5555/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password, role: 'user' }),
    })
      .then(response => {
        if (!response.ok) {
          return response.json().then(errorData => {
            throw new Error(errorData.error || 'Signup failed');
          });
        }
        return response.json();
      })
      .then(data => {
        setMessage('Signup successful! Redirecting to login...');
        // Call onSignup if needed
        onSignup?.(); 
        // Clear form
        setName('');
        setEmail('');
        setPassword('');
        // Redirect after delay
        setTimeout(() => navigate('/login'), 2000);
      })
      .catch((err) => {
        setMessage(err.message);
        console.error("Signup error:", err);
      });
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">Sign Up</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Create Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
      {message && <p className="auth-message">{message}</p>}
      <p className="switch-auth">
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </div>
  );
}

export default Register;
