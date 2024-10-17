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

  const handleEdit = (id) => {
    navigate(`/api/users/${user_id}/itineraries/${id}/edit`);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="flex flex-col items-center">
  <h1 className="text-2xl font-bold mb-6 mt-8">My Itineraries</h1>
  {itineraries.map((itinerary) => (
    <div
      key={itinerary.id}
      className="bg-white shadow-md rounded-lg p-6 mb-6 border border-gray-300 w-full max-w-3xl" 
    >
      <h3 className="text-xl font-semibold mb-2">
        {itinerary.city}, {itinerary.country}
      </h3>
      <p className="text-gray-700 mb-1">
        <span className="font-medium">Start Date:</span> {formatDate(itinerary.start_date)}
      </p>
      <p className="text-gray-700 mb-1">
        <span className="font-medium">End Date:</span> {formatDate(itinerary.end_date)}
      </p>
      <p className="text-gray-700 mb-4">{itinerary.description}</p>
      <div className="flex justify-center gap-2 mt-2 mb-4"> 
        <button 
          className="btn btn-primary"
          onClick={() => handleEdit(itinerary.id)}
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
