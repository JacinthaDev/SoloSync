import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve user ID from session storage
  const user_id = sessionStorage.getItem('user_id');

  const handleLogout = async () => {
    if (!user_id) {
      console.error('User ID not found');
      return;
    }

    try {
      const response = await fetch(`/api/users/${user_id}/sessions`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`, 
        },
      });

      if (response.ok) {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user_id');
        navigate('/');
      } else {
        const errorResponse = await response.json();
        console.error('Logout failed:', errorResponse.message);
      }
    } catch (error) {
      console.error('Error during logout:', error);
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
          {location.pathname === '/feed' && user_id && ( // Check if user_id exists
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
