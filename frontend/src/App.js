import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  // Import React Router
import './App.css';
import AuthForm from './components/AuthForm';
import HomePage from './components/HomePage';  // Import HomePage

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to SoloSync</h1>
      </header>
      <Router>
        <Routes>
          <Route path="/" element={<AuthForm />} /> 
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
