import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from './Auth';
import 'bootstrap/dist/css/bootstrap.min.css';

function Notes() {
  const { user, token } = useContext(AuthContext);
  const [notes, setNotes] = useState([]);
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formMessage, setFormMessage] = useState('');
  const [content, setContent] = useState('');
  const [petId, setPetId] = useState('');
  const [error, setError] = useState('');

  const API_BASE_URL = 'http://localhost:5555';

  useEffect(() => {
    if (!token || !user) {
      setError('You must be logged in to view notes.');
      setLoading(false);
      return;
    }

    // Fetch notes
    fetch(`${API_BASE_URL}/notes`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => res.ok ? res.json() : Promise.reject('Failed to fetch notes'))
      .then(data => setNotes(data))
      .catch(err => setError(err))
      .finally(() => setLoading(false));

    // Fetch pets for dropdown
    fetch(`${API_BASE_URL}/pets`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => res.ok ? res.json() : Promise.reject('Failed to fetch pets'))
      .then(data => setPets(data))
      .catch(console.error);
  }, [token, user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim() || !petId) {
      setFormMessage('All fields are required.');
      return;
    }

    fetch(`${API_BASE_URL}/notes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ content, pet_id: petId })
    })
      .then(res => res.ok ? res.json() : res.json().then(err => Promise.reject(err.error)))
      .then(data => {
        setNotes(prev => [...prev, data.data]);
        setContent('');
        setPetId('');
        setFormMessage('Note added successfully!');
      })
      .catch(err => {
        console.error('Add note error:', err);
        setFormMessage(err || 'Failed to add note');
      });
  };

  if (loading) return <p className="text-center mt-5">Loading notes...</p>;
  if (error) return <p className="text-danger text-center mt-5">{error}</p>;

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">My Pet Notes</h2>

      <form className="card p-4 mb-4" onSubmit={handleSubmit}>
        <h4>Add a New Note</h4>
        <div className="mb-3">
          <label className="form-label">Select Pet</label>
          <select
            className="form-select"
            value={petId}
            onChange={(e) => setPetId(e.target.value)}
            required
          >
            <option value="">-- Select Pet --</option>
            {pets.map(pet => (
              <option key={pet.id} value={pet.id}>{pet.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Note Content</label>
          <textarea
            className="form-control"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-success">Add Note</button>
        {formMessage && <p className="text-success mt-2">{formMessage}</p>}
      </form>

      <hr />

      <h4>Existing Notes</h4>
      {notes.length === 0 ? (
        <p>No notes found.</p>
      ) : (
        <div className="list-group">
          {notes.map(note => (
            <div key={note.id} className="list-group-item">
              <p><strong>Pet ID:</strong> {note.pet_id}</p>
              <p>{note.content}</p>
              <small className="text-muted">Created: {new Date(note.created_at).toLocaleString()}</small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Notes;