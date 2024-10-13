import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [user_id, setUser_id] = useState(null); 

  const fetchUser_id = async () => {
    try {
      const response = await fetch(`/api/users/${user_id}`, {
        method: 'GET',
        credentials: 'include', 
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user ID');
      }

      const data = await response.json();
      console.log(data)
      setUser_id(data.user_id); 
    } catch (error) {
      console.error('Error fetching user ID:', error);
    }
  };

  useEffect(() => {
    fetchUser_id(); 
  }, []);

  const handleLogout = async () => {
    if (!user_id) {
      console.error('User ID not found');
      return;
    }

    try {
      const response = await fetch('/api/users/sign_out', {
        method: 'DELETE',
        credentials: 'include',
      });

      if (response.ok) {
        setUser_id(null);
        navigate('/'); 
      } else {
        console.error('Failed to log out');
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <nav className="bg-white shadow rounded-lg mb-6">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link className="text-3xl font-bold text-yellow-400" to="/">
          SoloSync
        </Link>
        <div className="flex space-x-4">
          {location.pathname !== '/feed' && (
            <Link
              className="text-gray-700 hover:text-blue-600 transition-colors"
              to="/feed"
            >
              Feed
            </Link>
          )}
          {location.pathname !== '/profile' && (
            <Link
              className="text-gray-700 hover:text-blue-600 transition-colors"
              to="/profile"
            >
              Profile
            </Link>
          )}
          {location.pathname === '/feed' && (
            <Link
              className="text-gray-700 hover:text-blue-600 transition-colors"
              to={`/api/users/${user_id}/itineraries`}
            >
              My Trips
            </Link>
          )}
          <button
            onClick={handleLogout}
            className="text-gray-700 hover:text-blue-600 transition-colors"
          >
            Log Out
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
