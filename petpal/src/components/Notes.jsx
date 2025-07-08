import React, { useEffect, useState, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

// This component displays and allows adding notes for pets
function Notes() {
  // Access the logged-in user and token from context
  const { user, token } = useContext(AuthContext);

  // State variables to store notes, pets, form input, and messages
  const [notes, setNotes] = useState([]);
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formMessage, setFormMessage] = useState('');
  const [content, setContent] = useState('');
  const [petId, setPetId] = useState('');
  const [error, setError] = useState('');

  // Base URL for API
  const API_BASE_URL = 'http://localhost:5555';

  // useEffect to fetch notes and pets when component mounts
  useEffect(() => {
    // Check if user and token are available
    if (!token || !user) {
      setError('You must be logged in to view notes.');
      setLoading(false);
      return;
    }

    // Fetch notes for the current user
    fetch(`${API_BASE_URL}/notes`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => res.ok ? res.json() : Promise.reject('Failed to fetch notes'))
      .then(data => setNotes(data)) // Store notes in state
      .catch(err => setError(err)) // Catch any error
      .finally(() => setLoading(false)); // Always stop loading

    // Fetch pets for dropdown selection in the form
    fetch(`${API_BASE_URL}/pets`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => res.ok ? res.json() : Promise.reject('Failed to fetch pets'))
      .then(data => setPets(data)) // Store pets in state
      .catch(console.error); // Log any error
  }, [token, user]);

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

   
    if (!content.trim() || !petId) {
      setFormMessage('All fields are required.');
      return;
    }

    // Send POST request to add new note
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
        // Add new note to state and reset form
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

  // Show loading or error if needed
  if (loading) return <p className="text-center mt-5">Loading notes...</p>;
  if (error) return <p className="text-danger text-center mt-5">{error}</p>;

  return (
    <div className="container mt-5">
      {}
      <h2 className="text-center mb-4">My Pet Notes</h2>

      <form className="card p-4 mb-4" onSubmit={handleSubmit}>
        <h4>Add a New Note</h4>

        {}
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

        {}
        <div className="mb-3">
          <label className="form-label">Note Content</label>
          <textarea
            className="form-control"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>

        {}
        <button type="submit" className="btn btn-success">Add Note</button>
        {formMessage && <p className="text-success mt-2">{formMessage}</p>}
      </form>

      <hr />

      {}
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
