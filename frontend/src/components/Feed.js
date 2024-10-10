import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';

const Feed = () => {
  const [itineraries, setItineraries] = useState([]);

  useEffect(() => {
    const fetchItineraries = async () => {
      try {
        // Fetch all itineraries from all users
        const response = await fetch(`/api/itineraries/feed`); // Use the correct feed API endpoint
        const data = await response.json();
        setItineraries(data);
      } catch (error) {
        console.error('Error fetching itineraries:', error);
      }
    };

    fetchItineraries();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long', 
      day: 'numeric',
    });
  };

  return (
    <div className="flex flex-col items-center">
      <Navbar />
      <h1 className="text-2xl font-bold mb-6 mt-8">Syncer Travels</h1>
      {itineraries.length > 0 ? (
        itineraries.map((itinerary) => (
          <div
            key={itinerary.id}
            className="bg-white shadow-md rounded-lg p-6 mb-6 border border-gray-300 w-full max-w-3xl"
          >
            <h3 className="text-xl font-semibold mb-2">
              {itinerary.city}, {itinerary.country}
            </h3>
            <p className="text-gray-700 mb-1">
              <span className="font-medium">Syncer:</span> {itinerary.user.first_name} {itinerary.user.last_name}
            </p>
            <p className="text-gray-700 mb-1">
              <span className="font-medium">Start Date:</span> {formatDate(itinerary.start_date)}
            </p>
            <p className="text-gray-700 mb-1">
              <span className="font-medium">End Date:</span> {formatDate(itinerary.end_date)}
            </p>
            <p className="text-gray-700 mb-4">{itinerary.description}</p>
            <div className="flex justify-center gap-2 mt-2 mb-4">
              <button className="btn btn-primary">Edit</button>
              <button className="btn btn-danger">Delete</button>
            </div>
          </div>
        ))
      ) : (
        <p>No itineraries found.</p>
      )}
    </div>
  );
};

export default Feed;
