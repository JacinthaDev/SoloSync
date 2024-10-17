import React from 'react';
import TripForm from './TripForm'; 

function HomePage() {
  return (
    <div className="home-page">
      <h2>Welcome to Your Dashboard</h2>
      
      <div className="trip-section">
        <TripForm />
      </div>

      <div className="other-feature">
        <h3>Upcoming Trips</h3>
      </div>
    </div>
  );
}

export default HomePage;
