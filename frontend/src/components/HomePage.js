import React, { useEffect, useState } from 'react';
import TripForm from './TripForm'; 
import MyItineraries from './MyItineraries'; 

function HomePage() {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await fetch('/users');
        const data = await response.json();
        setUserId(data.id); 
      } catch (error) {
        console.error('Error fetching user ID:', error);
      }
    };

    fetchUserId();
  }, []);

  return (
    <div className="home-page">
      <h2>Welcome to Your Dashboard</h2>
      
      <div className="trip-section">
        <TripForm />
      </div>

      <div className="other-feature">
        <h3>Upcoming Trips</h3>
        {userId ? <MyItineraries user_id={userId} /> : <p>Loading itineraries...</p>}
      </div>
    </div>
  );
}

export default HomePage;
