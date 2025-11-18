
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const AdminPage = () => {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (!storedToken) {
      router.push('/admin/login');
    } else {
      setToken(storedToken);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/admin/login');
  };

  if (!token) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Admin Panel</h1>
        <button onClick={handleLogout} className="bg-red-500 text-white p-2 rounded">Logout</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link href="/admin/profile" className="p-4 bg-gray-100 rounded-lg text-center hover:bg-gray-200">Manage Profile</Link>
        <Link href="/admin/skills" className="p-4 bg-gray-100 rounded-lg text-center hover:bg-gray-200">Manage Skills</Link>
        <Link href="/admin/experience" className="p-4 bg-gray-100 rounded-lg text-center hover:bg-gray-200">Manage Experience</Link>
        <Link href="/admin/projects" className="p-4 bg-gray-100 rounded-lg text-center hover:bg-gray-200">Manage Projects</Link>
        <Link href="/admin/education" className="p-4 bg-gray-100 rounded-lg text-center hover:bg-gray-200">Manage Education</Link>
        <Link href="/admin/training" className="p-4 bg-gray-100 rounded-lg text-center hover:bg-gray-200">Manage Training</Link>
        <Link href="/admin/achievements" className="p-4 bg-gray-100 rounded-lg text-center hover:bg-gray-200">Manage Achievements</Link>
        <Link href="/admin/additional" className="p-4 bg-gray-100 rounded-lg text-center hover:bg-gray-200">Manage Additional Info</Link>
      </div>
    </div>
  );
};

export default AdminPage;
