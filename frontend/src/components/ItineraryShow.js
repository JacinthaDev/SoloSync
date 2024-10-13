import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ItineraryShow = () => {
  const { user_id, itinerary_id } = useParams();
  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItinerary = async () => {
      try {
        const response = await fetch(`/api/users/${itinerary.user_id}/itineraries/${itinerary_id}/show`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setItinerary(data);
      } catch (error) {
        console.error('Error fetching itinerary:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchItinerary();
  }, [user_id, itinerary_id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!itinerary) {
    return <p>No itinerary found.</p>;
  }

  return (
    <div className="itinerary-details">
      <h2>{itinerary.city}, {itinerary.country}</h2>
      <p>{itinerary.description}</p>
      <p>Dates: {new Date(itinerary.start_date).toLocaleDateString()} - {new Date(itinerary.end_date).toLocaleDateString()}</p>
    </div>
  );
};

export default ItineraryShow;
