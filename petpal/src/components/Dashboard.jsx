import { useEffect, useState, useContext } from 'react';
// Import the AuthContext for accessing user info if needed
import { AuthContext } from '../context/AuthContext';

import { getPets } from '../services/Api';

import './Dashboard.css';

export default function Pets() {
  // Set up state to store pets data and potential error
  const [pets, setPets] = useState([]);
  const [error, setError] = useState(null);

  // useEffect runs once when the component is mounted
  useEffect(() => {
    // Define async function to fetch pets
    async function fetchPets() {
      try {
        // Call the getPets API service and store the data
        const data = await getPets();
        setPets(data);
      } catch (err) {
        // If fetching fails, update error state
        setError('Failed to fetch pets');
      }
    }

    fetchPets();
  }, []); // Empty dependency array = run only once

  // If there's an error, show it
  if (error) return <p>{error}</p>;

  
  return (
    <div className="pets-list">
      <h2>All Pets</h2>
      <div className="pets-grid">
        {}
        {pets.map((pet) => (
          <div key={pet.id} className="pet-card">
            {}
            <div className="pet-name">{pet.name}</div>
            <div className="pet-info">
              {}
              <p><strong>Species:</strong> {pet.species}</p>
              <p><strong>Breed:</strong> {pet.breed}</p>
              <p><strong>Age:</strong> {pet.age} years</p>
              {}
              {pet.medical_history && (
                <p><strong>History:</strong> {pet.medical_history}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
