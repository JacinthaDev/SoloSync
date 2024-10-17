import React, { useEffect, useState } from 'react';

const TripForm = () => {
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  const [formData, setFormData] = useState({
    city: '',
    country: '',
    startdate: '',
    enddate: '',
    description: '',
  });
  
  const [isPrefilled, setIsPrefilled] = useState(false);
  const [cityName, setCityName] = useState('');

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('/api/countries'); 
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

  useEffect(() => {
    const fetchCities = async () => {
      if (formData.country) {
        try {
          const country = countries.find((c) => c.name === formData.country);
          const response = await fetch(`/api/itineraries/cities?country_code=${country.alpha2}`);
          
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
      
          const data = await response.json();
          
          setCities(data);
          
          if (data.length > 0) {
            setCityName(data[0].name); 
            setIsPrefilled(true); 
            setFormData((prevData) => ({ ...prevData, city: data[0].name })); 
          } else {
            setCityName(''); 
            setIsPrefilled(false);
          }
        } catch (error) {
          console.error('Error fetching cities:', error);
        }
      }
    };
    fetchCities();
  }, [formData.country, countries]);








  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCountryChange = (e) => {
    const { value } = e.target;
    setFormData((prevData) => ({ ...prevData, country: value, city: '' }));
    setCities([]);
    setFilteredCities([]);
    setIsPrefilled(false); 
    setCityName(''); 
  };

  const handleCityChange = (e) => {
    if (!isPrefilled || cities.length === 0) {
      setCityName(e.target.value);
      setFormData((prevData) => ({ ...prevData, city: e.target.value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    const today = new Date().toISOString().split("T")[0]; 
    const { startdate, enddate } = formData;


    if (startdate < today) {
      alert("The start date cannot be in the past.");
      return; 
    }

  
    if (enddate < startdate) {
      alert("The end date must be later than the start date.");
      return;
    }

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

      setFormData({
        city: '',
        country: '',
        startdate: '',
        enddate: '',
        description: '',
      });
      setIsPrefilled(false); 
      setCityName(''); 
    } catch (error) {
      console.error('Error creating itinerary:', error);
    }
  };

  const today = new Date().toISOString().split('T')[0];
      
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
          list="countries-list"
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
            value={isPrefilled ? cityName : formData.city}
            onChange={handleCityChange}
            list="cities-list"
            placeholder="Select a city"
            disabled={isPrefilled && cities.length > 0}
          />
          <datalist id="cities-list">
            {filteredCities.map((city) => (
              <option key={city.id} value={city.name}>
                {city.name}
              </option>
            ))}
          </datalist>
        </label>
      )}

      {formData.city && (
        <>
          <label>
            Start Date:
            <input
              type="date"
              name="startdate"
              value={formData.startdate}
              onChange={handleChange}
              min={today}
            />
          </label>
          <label>
            End Date:
            <input
              type="date"
              name="enddate"
              value={formData.enddate}
              onChange={handleChange}
              min={formData.startdate || today}
            />
          </label>
        </>
      )}

      {formData.startdate && formData.enddate && (
        <label>
          Tell other Syncers why you're traveling:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter a description"
          />
        </label>
      )}

      <button type="submit">Create Itinerary</button>
    </form>
  );
};

export default TripForm;
