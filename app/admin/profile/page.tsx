
'use client';

import { useAuth } from '@/hooks/useAuth';
import { useState, useEffect } from 'react';

const ProfileAdminPage = () => {
  const token = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [image, setImage] = useState<File | null>(null);

  useEffect(() => {
    if (token) {
      fetch('/api/profile')
        .then((res) => res.json())
        .then((data) => setProfile(data));
    }
  }, [token]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setProfile({ ...profile, [parent]: { ...profile[parent], [child]: value } });
    } else {
      setProfile({ ...profile, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await fetch('/api/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(profile),
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  const handleImageUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!image) return;
    
    const formData = new FormData();
    formData.append('image', image);

    await fetch('/api/profile/image', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
  };

  if (!profile) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Manage Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Add form fields for all profile properties */}
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Save Profile</button>
      </form>

      <h2 className="text-xl font-bold mt-8 mb-4">Upload Profile Image</h2>
      <form onSubmit={handleImageUpload}>
        <input type="file" onChange={handleImageChange} />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Upload Image</button>
      </form>
    </div>
  );
};

export default ProfileAdminPage;
