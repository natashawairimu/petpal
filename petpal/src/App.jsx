import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './components/Auth';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Appointments from './components/Appointments';
import Notes from './components/Notes';
import Providers from './components/Provider';
// import AdminPetManagement from './AdminPetManagement';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            {/* <Route path="/pets" element={<AdminPetManagement />} /> */}
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/providers" element={<Providers />} />
            <Route path="*" element={<h2 className="text-center mt-5">404 - Page Not Found</h2>} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
