import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';


import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Appointments from './components/Appointments';
import Notes from './components/Notes';
import Providers from './components/Provider';
import Footer from './components/Footer';
import './App.css';

// This component handles route rendering and layout
function AppContent() {
  const location = useLocation(); // Hook to access current route

  
  const hideHeaderFooter = location.pathname === '/login' || location.pathname === '/register';

  return (
    <div className="app-wrapper">
      {}
      {!hideHeaderFooter && <Navbar />}

      <div className="container main-content">
        <Routes>
          {/* Redirect root path to dashboard */}
          <Route path="/" element={<Navigate to="/dashboard" />} />

          {/* Auth routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected/main app routes */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/providers" element={<Providers />} />

          {/* Catch-all route for unknown paths */}
          <Route path="*" element={<h2 className="text-center mt-5">404 - Page Not Found</h2>} />
        </Routes>
      </div>

      {/* Conditionally show Footer */}
      {!hideHeaderFooter && <Footer />}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
