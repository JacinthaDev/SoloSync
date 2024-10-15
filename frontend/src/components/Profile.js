import React, { useEffect, useState } from 'react';
import { useUser } from '../UserContext';

const Profile = () => {
  const { user, setUser } = useUser();
  const [loading, setLoading] = useState(true);
  const [bio, setBio] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`/api/users/${user.id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUser(data);
        setBio(data.bio || '');
        setImagePreview(data.profile_picture || null);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchUserData();
    }
  }, [user]);

  const calculateAge = (birthdate) => {
    if (!birthdate) return null;
    const birthDateObj = new Date(birthdate);
    const ageDiff = Date.now() - birthDateObj.getTime();
    const ageDate = new Date(ageDiff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  const handleBioSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    const response = await fetch(`/api/users/${user.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ bio }),
    });

    if (response.ok) {
      const updatedUser = await response.json();
      setUser(updatedUser);
    } else {
      console.error('Failed to update bio');
    }
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleProfilePictureSubmit = async (e) => {
    e.preventDefault();
    if (!user || !profilePicture) return;

    const formData = new FormData();
    formData.append('profile_picture', profilePicture);

    const response = await fetch(`/api/users/${user.id}/upload_profile_picture`, {
      method: 'PATCH',
      body: formData,
    });

    if (response.ok) {
      console.log("picture save successful")
      const updatedUser = await response.json();
      setUser(updatedUser);
      setImagePreview(updatedUser.profile_picture);
    } else {
      console.error('Failed to update profile picture');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl">User not found.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center mt-8">
      {imagePreview ? (
        <img
          src={imagePreview}
          alt="Profile"
          className="rounded-full w-32 h-32 mt-4"
        />
      ) : (
        <img
          src={`${process.env.PUBLIC_URL}/default.png`}
          alt="Default Profile"
          className="rounded-full w-32 h-32 mt-4"
        />
      )}

      <h1 className="text-2xl font-bold mt-2">
        {user.first_name} {user.last_name}
      </h1>
      
      <p className="text-md text-gray-600">Age: {calculateAge(user.date_of_birth)} years</p> 

      <p>{user.bio}</p>

      <form onSubmit={handleProfilePictureSubmit} className="mt-4 flex items-center">
        <input
          type="file"
          accept="image/*"
          onChange={handleProfilePictureChange}
          className="mb-2"
        />
        <button
          type="submit"
          className="bg-blue-400 text-white font-semibold py-1 px-2 rounded hover:bg-blue-500 transition ml-2"
        >
          Upload
        </button>
      </form>

      <form onSubmit={handleBioSubmit} className="mt-4">
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Edit your bio"
          className="w-full h-20 border border-gray-300 rounded-lg p-2 mb-2"
        />
        <button
          type="submit"
          className="bg-blue-400 text-white font-semibold py-2 px-4 rounded hover:bg-blue-500 transition"
        >
          Save Bio
        </button>
      </form>
    </div>
  );
};

export default Profile;
