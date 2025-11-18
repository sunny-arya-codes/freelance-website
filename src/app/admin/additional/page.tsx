
'use client';

import { useAuth } from '@/hooks/useAuth';
import { useState, useEffect } from 'react';

const AdditionalAdminPage = () => {
  const token = useAuth();
  const [additional, setAdditional] = useState(null);

  useEffect(() => {
    if (token) {
      fetch('/api/additional')
        .then((res) => res.json())
        .then((data) => setAdditional(data));
    }
  }, [token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdditional({ ...additional, [name]: value.split(',') });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('/api/additional', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(additional),
    });
  };

  if (!additional) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Manage Additional Info</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="mb-4">
          <label className="block mb-1">Languages (comma separated)</label>
          <input
            type="text"
            name="languages"
            value={additional.languages.join(',')}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Hobbies (comma separated)</label>
          <input
            type="text"
            name="hobbies"
            value={additional.hobbies.join(',')}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Save Additional Info</button>
      </form>
    </div>
  );
};

export default AdditionalAdminPage;
