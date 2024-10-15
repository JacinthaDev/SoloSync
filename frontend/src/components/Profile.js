import React, { useEffect, useState } from 'react';
import { useUser } from '../UserContext';

const Profile = () => {
  const { user, setUser } = useUser();
  const [bio, setBio] = useState(user?.bio || 'No bio yet');
  const [profilePicture, setProfilePicture] = useState(user?.profilePicture || '/default.png');
  const [age, setAge] = useState(0);

  useEffect(() => {
    if (user?.date_of_birth) {
      const calculateAge = (dateOfBirth) => {
        const birthDate = new Date(dateOfBirth);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        return age;
      };
      setAge(calculateAge(user.date_of_birth));
    }
  }, [user]);

  const handleBioChange = (event) => {
    setBio(event.target.value);
  };

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    const response = await fetch(`/api/users/${user.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: { bio, profilePicture } }),
    });
    if (response.ok) {
      const updatedUser = await response.json();
      setUser(updatedUser);
    }
  };

  return (
    <div className="flex flex-col items-center mt-8">
      <div className="relative grid overflow-hidden rounded-lg shadow-md bg-white w-full max-w-md p-6">
        <img src={profilePicture} alt="Profile" className="w-32 h-32 rounded-full mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-center mb-2">{user?.first_name} {user?.last_name}</h1>
        <p className="text-lg text-center mb-4">Age: {age}</p>
        
        <label className="text-lg font-semibold mb-2">Your Bio:</label>
        <p className="text-lg text-center mb-4">
          {bio || "No bio yet"}
        </p>
  
        <textarea
          onChange={handleBioChange}
          placeholder="Add your bio..."
          className="w-full h-20 border border-gray-300 rounded-lg p-2 mb-4"
        />
  
        <input
          type="file"
          accept="image/*"
          onChange={handleProfilePictureChange}
          className="mb-4"
        />
        <button
          onClick={handleSave}
          className="bg-blue-400 text-white font-semibold py-2 px-4 rounded hover:bg-blue-500 transition w-full"
        >
          Save
        </button>
      </div>
    </div>
  );
  
};

export default Profile;
