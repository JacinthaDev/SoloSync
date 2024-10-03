import React, { useEffect, useState } from 'react';

const TripForm = () => {
  const [countries, setCountries] = useState([]);
  const [formData, setFormData] = useState({
    city: '',
    country: '',
    startdate: '',
    enddate: '',
    description: '',
  });

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('/api/countries'); // Adjust endpoint based on your setup
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };
    fetchCountries();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCountryChange = (e) => {
    const { value } = e.target;
    setFormData((prevData) => ({ ...prevData, country: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/itineraries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to create itinerary');
      }

      const result = await response.json();
      console.log('Itinerary created:', result);
      // Handle successful creation (e.g., reset form, show a success message)
      setFormData({
        city: '',
        country: '',
        startdate: '',
        enddate: '',
        description: '',
      });
    } catch (error) {
      console.error('Error creating itinerary:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Country:
        <input
          type="text"
          name="country"
          value={formData.country}
          onChange={handleCountryChange}
          placeholder="Type to search for a country..."
          list="countries-list" // Link to the datalist
        />
        <datalist id="countries-list">
          {countries.map((country) => (
            <option key={country.alpha2} value={country.name}>
              {country.name} 
            </option>
          ))}
        </datalist>
      </label>
      
      {formData.country && (
        <label>
          City:
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="Enter a city"
          />
        </label>
      )}
      
      <button type="submit">Create Itinerary</button>
    </form>
  );
};

export default TripForm;
