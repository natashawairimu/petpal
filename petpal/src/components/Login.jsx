import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
// Importing the AuthContext to access login function and user data
import { AuthContext } from "../context/AuthContext";

export default function Login() {
    // Set up state to store email and password entered by the user
    const [credentials, setCredentials] = useState({ email: "", password: "" });

    const [error, setError] = useState(null);

    // Accessing login function from AuthContext
    const { Login } = useContext(AuthContext); 
    const { login } = useContext(AuthContext);

    // Hook for navigation after successful login
    const navigate = useNavigate();

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); 

        try {
            
            const data = await login(credentials); 
            console.log("Login success", data);

            // Redirect to dashboard on success
            navigate("/dashboard");
        } catch (err) {
            alert(err.response?.data?.error || "Login failed");
        }
    };

    return (
        <div className="auth-container">
            {}
            <h2 className="auth-title">Log In</h2>

            {}
            <form className="auth-form" onSubmit={handleSubmit}>
                {}
                <input
                    type="email"
                    placeholder="Email"
                    value={credentials.email}
                    onChange={(e) => setCredentials({...credentials, email: e.target.value})}
                    required
                />

                {}
                <input
                    type="password"
                    placeholder="Password"
                    value={credentials.password}
                    onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                    required
                />

                {}
                <button type="submit">Log In</button>

                {}
                {error && <p className="auth-message">{error}</p>}
            </form>

            {/* Link to signup page for users without an account */}
            <p className="switch-auth">
                Don't have an account? <a href="/signup">Sign up</a>
            </p>
        </div>
    );
}
