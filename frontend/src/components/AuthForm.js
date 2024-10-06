import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
        setMessage('You have successfully logged in!');
        navigate('/home');
      })
      .catch(error => {
        console.error('Error:', error);
        setMessage('Login failed. Please try again.');
      });
  };

  return (
    <div className="container mt-5">
      <div className="auth-form p-4 border rounded shadow">
        {message && (
          <div className="alert alert-success">
            {message}
          </div>
        )}
        <div className="d-flex justify-content-center mb-3">
          <button onClick={() => setIsLogin(true)} className={`btn ${isLogin ? 'btn-success' : 'btn-secondary'}`}>Login</button>
          <button onClick={() => setIsLogin(false)} className={`btn ${!isLogin ? 'btn-success' : 'btn-secondary'}`}>Sign Up</button>
        </div>
        <form onSubmit={handleSubmit}>
          <h2 className="text-center">{isLogin ? 'Login' : 'Sign Up'}</h2>

          {!isLogin && (
            <>
              <div className="form-group mb-3">
                <label htmlFor="first_name">First Name:</label>
                <input
                  type="text"
                  id="first_name"
                  name="first_name"
                  className="form-control"
                  value={formData.first_name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group mb-3">
                <label htmlFor="last_name">Last Name:</label>
                <input
                  type="text"
                  id="last_name"
                  name="last_name"
                  className="form-control"
                  value={formData.last_name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group mb-3">
                <label htmlFor="date_of_birth">Date of Birth:</label>
                <input
                  type="date"
                  id="date_of_birth"
                  name="date_of_birth"
                  className="form-control"
                  value={formData.date_of_birth}
                  onChange={handleChange}
                  required
                />
              </div>
            </>
          )}

          <div className="form-group mb-3">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {!isLogin && (
            <div className="form-group mb-3">
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="form-control"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <button type="submit" className="btn btn-success w-100">{isLogin ? 'Login' : 'Sign Up'}</button>
        </form>
      </div>
    </div>
  );
}

export default AuthForm;
