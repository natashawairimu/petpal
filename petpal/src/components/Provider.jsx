// Providers.jsx
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from './Auth';
import 'bootstrap/dist/css/bootstrap.min.css';

function Providers() {
  const { user, token } = useContext(AuthContext);
  const [providers, setProviders] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = "http://localhost:5555";

  useEffect(() => {
    if (!token) {
      setError('Authentication token is missing.');
      setLoading(false);
      return;
    }

    fetch(`${API_BASE_URL}/providers`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(data => {
            throw new Error(data.error || 'Failed to fetch providers.');
          });
        }
        return res.json();
      })
      .then(data => setProviders(data))
      .catch(err => {
        console.error('Error fetching providers:', err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, [token]);

  if (loading) return <p className="text-center mt-5">Loading providers...</p>;
  if (error) return <p className="text-danger text-center mt-5">{error}</p>;

  if (!user || user.role !== 'admin') {
    return <p className="text-danger text-center mt-5">Access Denied. Admins only.</p>;
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Service Providers</h2>
      {providers.length === 0 ? (
        <p className="text-center">No providers found.</p>
      ) : (
        <div className="row">
          {providers.map(provider => (
            <div key={provider.id} className="col-md-4 mb-4">
              <div className="card p-3 shadow-sm">
                <h5 className="card-title">{provider.name}</h5>
                <p className="card-text"><strong>Type:</strong> {provider.type}</p>
                <p className="card-text"><strong>Contact:</strong> {provider.contact}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Providers;