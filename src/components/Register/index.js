import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './index.css'; // Import the CSS file

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'username') setUsername(value);
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { username, email, password };

    try {
      const response = await fetch('https://fmmoneybackend-6.onrender.com/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        alert('Registration successful');
        navigate('/login'); // Redirect to login on successful registration
      } else {
        const errorData = await response.json();
        setError(`Error: ${errorData.error || 'Unknown error'}`);
      }
    } catch (error) {
      setError('Error during registration');
      console.error('Registration error:', error);
    }
  };

  const handleLoginRedirect = () => {
    navigate('/login'); // Redirect to login page
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Register</h2>
        {error && <div className="error">{error}</div>}
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Register</button>
        <button
          type="button"
          className="login-button"
          onClick={handleLoginRedirect}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Register;
