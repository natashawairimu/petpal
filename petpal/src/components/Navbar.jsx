import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './Auth';
import './Navbar.css'; 

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-center">
        <Link to="/" className="animated-logo">
          <span className="rotating-text">PetPal</span>
        </Link>
      </div>

      <div className="navbar-links">
        {user && (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/pets">Pets</Link>
            <Link to="/appointments">Appointments</Link>
            <Link to="/notes">Notes</Link>
            {user.role === 'admin' && <Link to="/providers">Providers</Link>}
          </>
        )}
      </div>

      <div className="navbar-auth">
        {user ? (
          <>
            <span className="user-info">{user.name} ({user.role})</span>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
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
