import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';  
import './index';
import AuthForm from './components/AuthForm';
import HomePage from './components/HomePage';  
import Feed from "./components/Feed";
import Profile from "./components/Profile";
import EditItinerary from './components/EditItinerary';  
import Navbar from './components/Navbar';
import ItineraryShow from './components/ItineraryShow';

function App() {
  return (
    <Router>
      <Main />
    </Router>
  );
}

function Main() {
  const location = useLocation();

  return (
    <div className="App bg-blue-200 min-h-screen">
      {location.pathname !== '/' && <Navbar />}

      <div className={location.pathname === '/' ? "mt-0" : "mt-8"}>
        <Routes>
          <Route path="/" element={<AuthForm />} /> 
          <Route path="/api/users/:user_id/itineraries" element={<HomePage />} />
          <Route path="/api/users/:user_id/itineraries/:id/edit" element={<EditItinerary />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/api/users/:user_id/itineraries/:id/show" element={<ItineraryShow />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
