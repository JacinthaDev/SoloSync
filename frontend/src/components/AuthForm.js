import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthForm.css';

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    first_name: '',  
    last_name: '',  
    date_of_birth: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLogin && formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    console.log(`${isLogin ? 'Login' : 'Signup'} form submitted:`, formData);

    const url = isLogin ? '/api/login' : '/api/signup';
    const payload = isLogin
      ? { user: { email: formData.email, password: formData.password } }
      : { user: { 
          first_name: formData.first_name, 
          last_name: formData.last_name, 
          date_of_birth: formData.date_of_birth, 
          email: formData.email, 
          password: formData.password 
        } 
      };

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Login failed');
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        setMessage('You have successfully logged in!');
        navigate('/home');
      })
      .catch(error => {
        console.error('Error:', error);
        setMessage('Login failed. Please try again.');
      });
  };

  return (
    <div className="auth-form">
      {message && (
        <div className="message">
          {message}
        </div>
      )}
      <div className="auth-toggle">
        <button onClick={() => setIsLogin(true)} className={isLogin ? 'active' : ''}>Login</button>
        <button onClick={() => setIsLogin(false)} className={!isLogin ? 'active' : ''}>Sign Up</button>
      </div>
      <form onSubmit={handleSubmit}>
        <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>

        {!isLogin && (
          <>
            <div className="form-group">
              <label htmlFor="first_name">First Name:</label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="last_name">Last Name:</label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="date_of_birth">Date of Birth:</label>
              <input
                type="date"
                id="date_of_birth"
                name="date_of_birth"
                value={formData.date_of_birth}
                onChange={handleChange}
                required
              />
            </div>
          </>
        )}

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {!isLogin && (
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
        )}

        <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
      </form>
    </div>
  );
}

export default AuthForm;
