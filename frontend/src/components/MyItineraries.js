import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext';
import { format, parseISO } from 'date-fns';

const MyItineraries = () => {
  const { user } = useUser(); 
  const [itineraries, setItineraries] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItineraries = async () => {
      if (!user) return;

      try {
        const response = await fetch(`/api/users/${user.user_id}/itineraries`);
        const data = await response.json();
        setItineraries(data);
      } catch (error) {
        console.error('Error fetching itineraries:', error);
      }
    };

    fetchItineraries();
  }, [user]);

  console.log(user)

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/users/${user.user_id}/itineraries/${id}`, { method: 'DELETE' });
      setItineraries(itineraries.filter(itinerary => itinerary.id !== id));
    } catch (error) {
      console.error('Error deleting itinerary:', error);
    }
  };

  const handleEdit =  (id) => {
    console.log(id)
    navigate(`/api/users/${user.id}/itineraries/${id}/edit`);
  };

  const formatDate = (dateString) => {
    const date = parseISO(dateString);
    return format(date, 'MMMM d, yyyy');
  };

  return (
    <div className="flex flex-col items-center mt-8">
      <div className="bg-white rounded-full shadow-lg px-6 py-3 mb-8"> 
        <h1 className="text-3xl font-bold text-center">My Itineraries</h1>
      </div>
      <div className="grid grid-cols-2 gap-6 w-full max-w-4xl">
        {itineraries.map((itinerary) => (
          <div
            key={itinerary.id}
            className="relative grid min-h-[20rem] overflow-hidden rounded-lg shadow-md bg-white"
          >
            <div className="absolute inset-0 bg-yellow-200 opacity-50 mx-auto" /> 
            <div className="relative p-6 z-10 flex flex-col justify-between h-full">
              <h3 className="text-2xl font-semibold text-blue-600 text-center">
                {itinerary.city}, {itinerary.country}
              </h3>
              <p className="text-blue-600 text-center">
                {formatDate(itinerary.start_date)} - {formatDate(itinerary.end_date)}
              </p>
              <p className="text-blue-600 mb-2 text-center">{itinerary.description}</p> 
              <div className="flex justify-center gap-2 mt-2 mb-4">
                <button
                  className="bg-blue-400 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition"
                  onClick={() => handleEdit(itinerary.id)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white font-semibold py-2 px-4 rounded hover:bg-red-600 transition"
                  onClick={() => handleDelete(itinerary.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>        
        ))}
      </div>
    </div>
  );  
};

export default MyItineraries;
