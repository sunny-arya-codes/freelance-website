import { cache } from 'react';

const API_BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000/api';

const fetchData = cache(async (endpoint: string) => {
  try {
    const res = await fetch(`${API_BASE_URL}/${endpoint}`, {
      next: { revalidate: 3600 },
      cache: 'no-store' // Don't cache during build
    });
    if (!res.ok) {
      console.error(`Failed to fetch ${endpoint}: ${res.statusText}`);
      return endpoint === 'profile' ? { contact: { github: '#', linkedin: '#' } } : [];
    }
    return await res.json();
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    return endpoint === 'profile' ? {
      name: 'Portfolio',
      title: 'Developer',
      summary: '',
      contact: { github: '#', linkedin: '#' }
    } : [];
  }
});

export const getProfile = () => fetchData('profile');
export const getSkills = () => fetchData('skills');
export const getProjects = () => fetchData('projects');
export const getExperience = () => fetchData('experience');
export const getEducation = () => fetchData('education');
export const getAchievements = () => fetchData('achievements');
export const getTrainings = () => fetchData('training');

