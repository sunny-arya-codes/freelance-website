'use client';

import { useAuth } from '@/hooks/useAuth';
import { useState, useEffect } from 'react';
import { ImageUpload } from '@/components/admin/ImageUpload';
import { SaveStatus, SaveStatus as SaveStatusType } from '@/components/admin/SaveStatus';

interface ProfileData {
  name: string;
  title: string;
  location: string;
  contact: {
    email: string;
    phone: string;
    linkedin: string;
    github: string;
    portfolio: string;
  };
  summary: string;
  imageUrl?: string;
}

const ProfileAdminPage = () => {
  const token = useAuth();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [saveStatus, setSaveStatus] = useState<SaveStatusType>('saved');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (token) {
      fetchProfile();
    }
  }, [token]);

  const fetchProfile = async () => {
    try {
      const res = await fetch('/api/profile');
      if (res.ok) {
        const data = await res.json();
        setProfile(data);
        setError(null);
      } else {
        const errorData = await res.json();
        setError(errorData.error || 'Failed to load profile');
      }
    } catch (err) {
      setError('Failed to connect to server');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSaveStatus('unsaved');

    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setProfile(prev => prev ? {
        ...prev,
        [parent]: { ...(prev as any)[parent], [child]: value }
      } : null);
    } else {
      setProfile(prev => prev ? { ...prev, [name]: value } : null);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!profile) return;

    setSaveStatus('saving');
    try {
      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(profile),
      });

      if (res.ok) {
        setSaveStatus('saved');
        await fetchProfile(); // Refresh to get latest data
      } else {
        setSaveStatus('error');
      }
    } catch (err) {
      setSaveStatus('error');
    }
  };

  const handleImageUpload = async (file: File) => {
    const formData = new FormData();
    formData.append('image', file);

    const res = await fetch('/api/profile/image', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || 'Upload failed');
    }

    const data = await res.json();
    setProfile(prev => prev ? { ...prev, imageUrl: data.imageUrl } : null);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error && !profile) {
    return (
      <div className="p-6 bg-destructive/10 border border-destructive/20 rounded-lg">
        <h2 className="text-lg font-semibold text-destructive mb-2">Error Loading Profile</h2>
        <p className="text-sm text-muted-foreground">{error}</p>
        <p className="text-sm text-muted-foreground mt-4">
          Please ensure MongoDB is connected and create a profile by filling out the form below.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Profile Settings</h1>
          <p className="text-muted-foreground mt-1">Manage your personal information and profile image</p>
        </div>
        <SaveStatus status={saveStatus} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Image Upload Section */}
        <div className="lg:col-span-1">
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4">Profile Image</h2>
            <ImageUpload
              currentImage={profile?.imageUrl}
              onUpload={handleImageUpload}
              label="Upload your photo"
            />
          </div>
        </div>

        {/* Profile Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="bg-card border border-border rounded-xl p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={profile?.name || ''}
                  onChange={handleInputChange}
                  className="w-full p-2.5 bg-background border border-input rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Title</label>
                <input
                  type="text"
                  name="title"
                  value={profile?.title || ''}
                  onChange={handleInputChange}
                  className="w-full p-2.5 bg-background border border-input rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  placeholder="Full Stack Developer"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Location</label>
              <input
                type="text"
                name="location"
                value={profile?.location || ''}
                onChange={handleInputChange}
                className="w-full p-2.5 bg-background border border-input rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                placeholder="San Francisco, CA"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Summary</label>
              <textarea
                name="summary"
                value={profile?.summary || ''}
                onChange={handleInputChange}
                rows={4}
                className="w-full p-2.5 bg-background border border-input rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
                placeholder="A brief summary about yourself..."
                required
              />
            </div>

            <div className="border-t border-border pt-6">
              <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Email</label>
                  <input
                    type="email"
                    name="contact.email"
                    value={profile?.contact?.email || ''}
                    onChange={handleInputChange}
                    className="w-full p-2.5 bg-background border border-input rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                    placeholder="john@example.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Phone</label>
                  <input
                    type="tel"
                    name="contact.phone"
                    value={profile?.contact?.phone || ''}
                    onChange={handleInputChange}
                    className="w-full p-2.5 bg-background border border-input rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                    placeholder="+1 (555) 123-4567"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">LinkedIn</label>
                  <input
                    type="url"
                    name="contact.linkedin"
                    value={profile?.contact?.linkedin || ''}
                    onChange={handleInputChange}
                    className="w-full p-2.5 bg-background border border-input rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                    placeholder="https://linkedin.com/in/johndoe"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">GitHub</label>
                  <input
                    type="url"
                    name="contact.github"
                    value={profile?.contact?.github || ''}
                    onChange={handleInputChange}
                    className="w-full p-2.5 bg-background border border-input rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                    placeholder="https://github.com/johndoe"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-foreground mb-1.5">Portfolio</label>
                  <input
                    type="url"
                    name="contact.portfolio"
                    value={profile?.contact?.portfolio || ''}
                    onChange={handleInputChange}
                    className="w-full p-2.5 bg-background border border-input rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                    placeholder="https://johndoe.com"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                disabled={saveStatus === 'saving'}
                className="px-6 py-2.5 bg-primary text-primary-foreground font-medium rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saveStatus === 'saving' ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileAdminPage;
