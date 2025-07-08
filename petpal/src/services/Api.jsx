import axios from "axios";

// Create a pre-configured axios instance for making API requests
const api = axios.create({
  baseURL: 'http://127.0.0.1:5000',  
  withCredentials: true,            
  headers: {
    'Content-Type': 'application/json' 
  }
});

// Register a new user by sending form data to the backend
export const registerUser = async (userData) => {
  try {
    const response = await api.post('/register', userData); 
    return response.data;
  } catch (error) {
    console.error('API Error Details:', {
      config: error.config,
      response: error.response,
      request: error.request
    });
    throw error; 
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await api.post('/login', credentials);
    return response.data;
  } catch (error) {
    console.error('Login Error:', {
      config: error.config,
      response: error.response,
      request: error.request
    });
    throw error;
  }
};

// Fetch all pets from the backend API
export const getPets = async () => {
  try {
    const response = await api.get("/pets"); // GET request to /pets
    return response.data; // Return array of pet objects
  } catch (error) {
    console.error("fetch pets error:", {
        config: error.config,
        response: error.response,
        request: error.request
    });
    throw error;
  }
};

// Create a new pet (NOTE: API_URL is undefined here)
export const createPets = async (petData) => {
  
  return await axios.post(`${API_URL}/pets`, petData);
};
