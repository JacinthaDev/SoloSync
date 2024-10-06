import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MyItineraries = ({ user_id }) => {
  const [itineraries, setItineraries] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItineraries = async () => {
      try {
        const response = await fetch(`/api/users/${user_id}/itineraries`);
        const data = await response.json();
        setItineraries(data);
      } catch (error) {
        console.error('Error fetching itineraries:', error);
      }
    };

    fetchItineraries();
  }, [user_id]);

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/users/${user_id}/itineraries/${id}`, { method: 'DELETE' });
      setItineraries(itineraries.filter(itinerary => itinerary.id !== id));
    } catch (error) {
      console.error('Error deleting itinerary:', error);
    }
  };

  // Update handleEdit to accept an itinerary ID
  const handleEdit = (id) => {
    navigate(`/api/users/${user_id}/itineraries/${id}/edit`);
  };

  return (
    <div>
      <h1>My Itineraries</h1>
      {itineraries.map((itinerary) => (
        <div key={itinerary.id} className="itinerary">
          <h3>{itinerary.city}, {itinerary.country}</h3>
          <p>Start Date: {itinerary.start_date}</p>
          <p>End Date: {itinerary.end_date}</p>
          <p>Description: {itinerary.description}</p>
          <div className="d-flex justify-content-center gap-2 mt-2">
            <button 
              className="btn btn-primary" 
              onClick={() => handleEdit(itinerary.id)} // Pass itinerary.id to handleEdit
            >
              Edit
            </button>
            <button 
              className="btn btn-danger" 
              onClick={() => handleDelete(itinerary.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyItineraries;
