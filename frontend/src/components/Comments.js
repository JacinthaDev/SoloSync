import { useState } from 'react';

const Comments = ({ user_id, itinerary_id }) => {
  const [content, setContent] = useState('');

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
    <form onSubmit={handleSubmit}>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Leave a comment"
        required
      />
      <button type="submit">Post Comment</button>
    </form>
  );
};

export default Comments;
