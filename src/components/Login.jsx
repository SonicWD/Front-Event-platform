// eslint-disable-next-line no-unused-vars
import React, { useState, useContext } from 'react';
import axios from 'axios';
import '../index.css';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { API_URL } from "../config/config"; // Importa la URL de la API

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const { setAuthState } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Send login request to the server
            const response = await axios.post(`${API_URL}/login`, { username, password });

            // Extract the token from the response
            const token = response.data.access_token;
            if (token) {
                // Save token to localStorage
                localStorage.setItem('token', token);

                // Update the authState context
                setAuthState({ token, isAuthenticated: true });

                // Redirect to home page or any other route
                navigate('/eventsP');
                console.log('Login successful');
            } else {
                console.error('No token received');
                alert('Login failed');
            }
        } catch (error) {
            console.error('Login failed', error);
            alert('Login failed');
        }
    };

    const handleSignUp = () => {
        navigate('/create-account');
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="login">
            <div className="form-container">   
                <h1 className="title">Login</h1>
                <form onSubmit={handleSubmit} className="form">
                    <div>
                        <label htmlFor="username" className="label">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Username"
                            className="input input-username"
                            required
                        />
                    </div>
                    <div className="password-container">
                        <label htmlFor="password" className="label">Password</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="*********"
                            className="input input-password"
                            required
                        />
                        <button
                            type="button"
                            className="toggle-password-btn"
                            onClick={togglePasswordVisibility}
                        >
                            <img
                                src={showPassword ? "/images/icons/view-password-on.svg" : "/images/icons/view-password-off.svg"}
                                alt="toggle password visibility"
                                className="toggle-password-icon"
                            />
                        </button>
                    </div>
                    <input type="submit" value="log in" className="primary-button login-button" />
                    <div className="login-links">
                        {/* No se va a utilizar de momento */}
                        {/* <a href="/" className="login-link">Forgot my password</a> */}
                        <button type="button" className="secondary-button login-button" onClick={handleSignUp}>
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
