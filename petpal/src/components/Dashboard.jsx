import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from './Auth';
import 'bootstrap/dist/css/bootstrap.min.css';

function Dashboard() {
  const { user, token } = useContext(AuthContext);
  const [appointments, setAppointments] = useState([]);
  const [notes, setNotes] = useState([]);
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const API_BASE_URL = 'http://localhost:5555';

  useEffect(() => {
    if (!token || !user) {
      setError('You must be logged in to view the dashboard.');
      setLoading(false);
      return;
    }

    const fetchAll = async () => {
      try {
        const [petsRes, appointmentsRes, notesRes] = await Promise.all([
          fetch(`${API_BASE_URL}/pets`, { headers: { Authorization: `Bearer ${token}` } }),
          fetch(`${API_BASE_URL}/appointments`, { headers: { Authorization: `Bearer ${token}` } }),
          fetch(`${API_BASE_URL}/notes`, { headers: { Authorization: `Bearer ${token}` } })
        ]);

        if (!petsRes.ok || !appointmentsRes.ok || !notesRes.ok) {
          throw new Error('Failed to fetch dashboard data.');
        }

        const [petsData, appointmentsData, notesData] = await Promise.all([
          petsRes.json(),
          appointmentsRes.json(),
          notesRes.json()
        ]);

        setPets(petsData);
        setAppointments(appointmentsData);
        setNotes(notesData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [token, user]);

  if (loading) return <p className="text-center mt-5">Loading dashboard...</p>;
  if (error) return <p className="text-danger text-center mt-5">{error}</p>;

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Welcome to Your Dashboard</h2>

      <div className="row">
        <div className="col-md-4">
          <div className="card p-3">
            <h5>Pets</h5>
            <ul className="list-group">
              {pets.map(pet => (
                <li className="list-group-item" key={pet.id}>{pet.name} ({pet.species})</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card p-3">
            <h5>Upcoming Appointments</h5>
            <ul className="list-group">
              {appointments.map(app => (
                <li className="list-group-item" key={app.id}>
                  Pet ID {app.pet_id}: {app.reason} on {new Date(app.date).toLocaleDateString()}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card p-3">
            <h5>Recent Notes</h5>
            <ul className="list-group">
              {notes.map(note => (
                <li className="list-group-item" key={note.id}>
                  Pet ID {note.pet_id}: {note.content.substring(0, 50)}...
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;