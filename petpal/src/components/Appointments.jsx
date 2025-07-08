import React, { useEffect, useState, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


function Appointments() {
  // Access user and token from authentication context
  const { user, token } = useContext(AuthContext);

  // State to hold appointments fetched from backend
  const [appointments, setAppointments] = useState([]);

  const [loading, setLoading] = useState(true);
  
  const [error, setError] = useState('');

  // Backend API base URL
  const API_BASE_URL = 'http://localhost:5555';

  // useEffect runs once when the component is mounted
  useEffect(() => {
   
    if (!token || !user) {
      setError('You must be logged in to view appointments.');
      setLoading(false);
      return;
    }

    // Fetch appointments from backend API
    fetch(`${API_BASE_URL}/appointments`, {
      headers: {
        'Content-Type': 'application/json',
        // Attach the token for authentication
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
      
        if (!res.ok) {
          return res.json().then(data => {
            throw new Error(data.error || 'Failed to fetch appointments');
          });
        }
        // Convert response to JSON
        return res.json();
      })
      .then(data => {
     
        setAppointments(data);
      })
      .catch(err => {
        // Handle and display error
        console.error('Error:', err);
        setError(err.message || 'Unexpected error.');
      })
      .finally(() => {
        // Stop loading in any case
        setLoading(false);
      });
  }, [token, user]); // Re-run only if token or user changes

  
  if (loading) return <p className="text-center mt-5">Loading appointments...</p>;
 
  if (error) return <p className="text-danger text-center mt-5">{error}</p>;

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">My Pet Appointments</h2>

      {}
      {appointments.length === 0 ? (
        <p className="text-center">No appointments found.</p>
      ) : (
        // Otherwise, display appointments in a table
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-light">
              <tr>
                <th>Pet Name</th>
                <th>Date</th>
                <th>Reason</th>
                <th>Provider</th>
              </tr>
            </thead>
            <tbody>
              {/* Loop through each appointment and display data */}
              {appointments.map((appt) => (
                <tr key={appt.id}>
                  <td>{appt.pet?.name || 'Unknown'}</td>
                  <td>{new Date(appt.date).toLocaleString()}</td>
                  <td>{appt.reason}</td>
                  <td>{appt.provider?.name || 'N/A'} ({appt.provider?.type})</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Appointments;
