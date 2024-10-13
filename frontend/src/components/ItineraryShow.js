import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ItineraryShow = () => {
  const { user_id, itinerary_id } = useParams();
  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchItinerary = async () => {
      try {
        const response = await fetch(`/api/users/${user_id}/itineraries/${itinerary_id}`);
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
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  if (!itinerary) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl">No itinerary found.</p>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`/api/users/${user_id}/itineraries/${itinerary_id}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content,
        user_id: user_id,
        itinerary_id: itinerary_id
      }),
    });

    if (response.ok) {
      setContent('');
    } else {
      console.error('Failed to post comment');
    }
  };

  return (
    <div className="flex flex-col items-center mt-8">
      <div className="relative grid overflow-hidden rounded-lg shadow-md bg-yellow-100 w-full max-w-md min-h-[20rem]">
        <div className="absolute inset-0 opacity-50 mx-auto" />
        <div className="relative p-6 z-10 flex flex-col justify-start">
          <div className="flex justify-center mb-2">
            <p>{user_id}'s Trip</p>
            <div className="border border-gray-300 bg-white rounded-full px-8 py-3 shadow-md">
              <h2 className="text-2xl font-bold text-black text-center">
                {itinerary.city}, {itinerary.country}
              </h2>
              <p className="text-lg text-black text-center">
                {new Date(itinerary.start_date).toLocaleDateString()} - {new Date(itinerary.end_date).toLocaleDateString()}
              </p>
            </div>
          </div>
          <p className="text-lg text-black text-center mb-4">{itinerary.description}</p>
          
          <form onSubmit={handleSubmit} className="mt-4">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Leave a comment"
              required
              className="w-full h-20 border border-gray-300 rounded-lg p-2 mb-2" 
            />
            <button
              type="submit"
              className="bg-blue-400 text-white font-semibold py-2 px-4 rounded hover:bg-blue-500 transition w-full"
            >
              Post Comment
            </button>
          </form>
        </div>
      </div>
      
      <div className="flex justify-center mt-4">
        <button
          onClick={() => window.history.back()}
          className="bg-blue-400 text-white font-semibold py-2 px-4 rounded hover:bg-blue-500 transition"
        >
          Back to Itineraries
        </button>
      </div>
    </div>
  );
};  

export default ItineraryShow;
