import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  
import './App.css';
import AuthForm from './components/AuthForm';
import HomePage from './components/HomePage';  
import Feed from "./components/Feed";
import Profile from "./components/Profile";
import EditItinerary from './components/EditItinerary';  

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to SoloSync</h1>
      </header>
      <Router>
        <Routes>
          <Route path="/" element={<AuthForm />} /> 
          <Route path="/api/users/:user_id/itineraries" element={<HomePage />} />
          <Route path="/api/users/:user_id/itineraries/:id/edit" element={<EditItinerary />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
