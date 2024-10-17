import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditItinerary = () => {
  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { user_id, id } = useParams(); // Access both user_id and id

  useEffect(() => {
    const fetchItinerary = async () => {
      try {
        const response = await fetch(`/api/users/${user_id}/itineraries/${id}`);
        if (!response.ok) {
          throw new Error('Could not fetch itinerary');
        }
        const data = await response.json();
        setItinerary(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchItinerary();
  }, [id, user_id]); // Add user_id to the dependency array

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItinerary((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/users/${user_id}/itineraries/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(itinerary),
      });

      if (!response.ok) {
        throw new Error('Could not update itinerary');
      }

      navigate('/');
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Edit Itinerary</h1>
      <form onSubmit={handleSubmit} className="form">
        <div className="mb-3">
          <label className="form-label">City:</label>
          <input 
            type="text" 
            name="city" 
            className="form-control" 
            value={itinerary.city} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Country:</label>
          <input 
            type="text" 
            name="country" 
            className="form-control" 
            value={itinerary.country} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Start Date:</label>
          <input 
            type="date" 
            name="start_date" 
            className="form-control" 
            value={itinerary.start_date} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="mb-3">
          <label className="form-label">End Date:</label>
          <input 
            type="date" 
            name="end_date" 
            className="form-control" 
            value={itinerary.end_date} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description:</label>
          <textarea 
            name="description" 
            className="form-control" 
            value={itinerary.description} 
            onChange={handleChange} 
            required 
          />
        </div>
        <button type="submit" className="btn btn-primary">Save</button>
        <button 
          type="button" 
          className="btn btn-secondary ms-2" 
          onClick={() => navigate(`/api/users/${user_id}/itineraries/${id}`)}
        >
          Go Back
        </button>
      </form>
    </div>
  );
};

export default EditItinerary;
