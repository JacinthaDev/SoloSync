import React, { useEffect, useState } from 'react';
import TripForm from './TripForm'; 
import MyItineraries from './MyItineraries'; 

function HomePage() {
  const [user, setUser] = useState(null); 

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/users');
        const data = await response.json();
        setUser(data); 
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="home-page container mx-auto p-6">
      <div className="flex justify-center mb-8">
        <div className="bg-white rounded-full shadow-lg px-6 py-3 inline-block"> 
          {user ? (
            <h2 className="text-3xl font-bold text-center">Welcome to Your Dashboard, {user.first_name}</h2>
          ) : (
            <h2 className="text-3xl font-bold text-center">Welcome to Your Dashboard</h2> 
          )}
        </div>
      </div>
      <div className="trip-section mb-8">
        {user ? (
          <TripForm user_id={user.id} />
        ) : (
          <p className="text-center text-gray-600">Loading trip form...</p>
        )}
      </div>
  
      <div className="other-feature">
        {user ? (
          <MyItineraries user_id={user.id} />
        ) : (
          <p className="text-center text-gray-600">Loading itineraries...</p>
        )}
      </div>
    </div>
  );
};  

export default HomePage;
