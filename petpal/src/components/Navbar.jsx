import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// Importing AuthContext to get the current user and logout function
import { AuthContext } from '../context/AuthContext';
import './Navbar.css'; 

function Navbar() {
  
  const { user, logout } = useContext(AuthContext);

  // useNavigate hook helps redirect the user after logout
  const navigate = useNavigate();

  // Function to log out the user and redirect to login page
  const handleLogout = () => {
    logout(); // clears session
    navigate('/login'); // redirect to login page
  };

  return (
  
    <nav className="navbar">
      {}
      <div className="navbar-center">
        <Link to="/" className="animated-logo">
          {}
          <span className="rotating-text">PetPal</span>
        </Link>
      </div>

      {}
      <div className="navbar-links">
        {user && (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/pets">Pets</Link>
            <Link to="/appointments">Appointments</Link>
            <Link to="/notes">Notes</Link>
            {}
            {user.role === 'admin' && <Link to="/providers">Providers</Link>}
          </>
        )}
      </div>

      {}
      <div className="navbar-auth">
        {}
        {user ? (
          <>
            {}
            <span className="user-info">{user.name} ({user.role})</span>
            {}
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          // If user is not logged in, show login and register links
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
