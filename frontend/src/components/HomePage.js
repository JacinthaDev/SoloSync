import React, { useEffect, useState } from 'react';
import TripForm from './TripForm'; 
import MyItineraries from './MyItineraries'; 

function HomePage() {
  const [user_id, setUser_id] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await fetch('/users');
        const data = await response.json();
        setUser_id(data.id); 
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
      {user_id && <TripForm user_id={user_id} />}
      </div>

      <div className="other-feature">
        <h3>Upcoming Trips</h3>
        {user_id ? <MyItineraries user_id={user_id} /> : <p>Loading itineraries...</p>}
      </div>
    </div>
  );
}

export default HomePage;
