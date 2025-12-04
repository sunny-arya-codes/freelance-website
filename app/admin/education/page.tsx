'use client';

import { useAuth } from '@/hooks/useAuth';
import { useState, useEffect } from 'react';
import { ImageUpload } from '@/components/admin/ImageUpload';
import { SaveStatus, SaveStatus as SaveStatusType } from '@/components/admin/SaveStatus';
import { Plus, Pencil, Trash2, X } from 'lucide-react';

interface Education {
  _id?: string;
  institution: string;
  program: string;
  cgpa?: string;
  percentage?: string;
  start_date: string;
  end_date: string;
  portal_url?: string;
  relevant_coursework?: string[];
  year_of_completion?: string;
  location?: string;
  order: number;
  imageUrl?: string;
}

const EducationAdminPage = () => {
  const token = useAuth();
  const [educations, setEducations] = useState<Education[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState<SaveStatusType>('saved');
  const [editingEdu, setEditingEdu] = useState<Education | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [courseworkInput, setCourseworkInput] = useState('');

  useEffect(() => {
    if (token) fetchEducations();
  }, [token]);

  const fetchEducations = async () => {
    try {
      const res = await fetch('/api/education');
      if (res.ok) setEducations(await res.json());
    } catch (err) {
      console.error('Failed to fetch educations');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEdu) return;

    setSaveStatus('saving');
    try {
      const url = editingEdu._id ? `/api/education/${editingEdu._id}` : '/api/education';
      const method = editingEdu._id ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(editingEdu),
      });

      if (res.ok) {
        setSaveStatus('saved');
        setIsModalOpen(false);
        setEditingEdu(null);
        await fetchEducations();
      } else {
        setSaveStatus('error');
      }
    } catch (err) {
      setSaveStatus('error');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this education?')) return;
    try {
      await fetch(`/api/education/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      await fetchEducations();
    } catch (err) {
      console.error('Failed to delete');
    }
  };

  const handleImageUpload = async (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setEditingEdu(prev => prev ? { ...prev, imageUrl: reader.result as string } : null);
    };
    reader.readAsDataURL(file);
  };

  const openModal = (edu?: Education) => {
    setEditingEdu(edu || {
      institution: '',
      program: '',
      start_date: '',
      end_date: '',
      order: educations.length + 1,
      relevant_coursework: [],
    });
    setCourseworkInput('');
    setSaveStatus('saved');
    setIsModalOpen(true);
  };

  const addCoursework = () => {
    if (!courseworkInput.trim() || !editingEdu) return;
    setEditingEdu({ ...editingEdu, relevant_coursework: [...(editingEdu.relevant_coursework || []), courseworkInput.trim()] });
    setCourseworkInput('');
    setSaveStatus('unsaved');
  };

  const removeCoursework = (index: number) => {
    if (!editingEdu) return;
    setEditingEdu({ ...editingEdu, relevant_coursework: editingEdu.relevant_coursework?.filter((_, i) => i !== index) });
    setSaveStatus('unsaved');
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-full"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Education</h1>
          <p className="text-muted-foreground mt-1">Manage your educational background</p>
        </div>
        <button onClick={() => openModal()} className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90">
          <Plus className="w-4 h-4" />Add Education
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {educations.map((edu) => (
          <div key={edu._id} className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
            <div className="flex gap-4">
              {edu.imageUrl && (
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                  <img src={edu.imageUrl} alt={edu.institution} className="w-full h-full object-cover" />
                </div>
              )}
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">{edu.program}</h3>
                    <p className="text-muted-foreground">{edu.institution}</p>
                    <p className="text-sm text-muted-foreground mt-1">{edu.start_date} - {edu.end_date}</p>
                    {edu.cgpa && <p className="text-sm mt-1">CGPA: {edu.cgpa}</p>}
                    {edu.percentage && <p className="text-sm">Percentage: {edu.percentage}%</p>}
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => openModal(edu)} className="p-2 hover:bg-muted rounded transition-colors">
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(edu._id!)} className="p-2 hover:bg-destructive/10 text-destructive rounded transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && editingEdu && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-card border-b p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold">{editingEdu._id ? 'Edit Education' : 'New Education'}</h2>
              <div className="flex items-center gap-4">
                <SaveStatus status={saveStatus} />
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-muted rounded-lg"><X className="w-5 h-5" /></button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <ImageUpload currentImage={editingEdu.imageUrl} onUpload={handleImageUpload} label="Institution Logo" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5">Institution</label>
                  <input type="text" value={editingEdu.institution} onChange={(e) => { setEditingEdu({ ...editingEdu, institution: e.target.value }); setSaveStatus('unsaved'); }} className="w-full p-2.5 bg-background border border-input rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Program/Degree</label>
                  <input type="text" value={editingEdu.program} onChange={(e) => { setEditingEdu({ ...editingEdu, program: e.target.value }); setSaveStatus('unsaved'); }} className="w-full p-2.5 bg-background border border-input rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" required />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5">CGPA</label>
                  <input type="text" value={editingEdu.cgpa || ''} onChange={(e) => { setEditingEdu({ ...editingEdu, cgpa: e.target.value }); setSaveStatus('unsaved'); }} className="w-full p-2.5 bg-background border border-input rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" placeholder="e.g., 3.8/4.0" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Percentage</label>
                  <input type="text" value={editingEdu.percentage || ''} onChange={(e) => { setEditingEdu({ ...editingEdu, percentage: e.target.value }); setSaveStatus('unsaved'); }} className="w-full p-2.5 bg-background border border-input rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" placeholder="e.g., 85" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Year of Completion</label>
                  <input type="text" value={editingEdu.year_of_completion || ''} onChange={(e) => { setEditingEdu({ ...editingEdu, year_of_completion: e.target.value }); setSaveStatus('unsaved'); }} className="w-full p-2.5 bg-background border border-input rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" placeholder="2024" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5">Start Date</label>
                  <input type="month" value={editingEdu.start_date} onChange={(e) => { setEditingEdu({ ...editingEdu, start_date: e.target.value }); setSaveStatus('unsaved'); }} className="w-full p-2.5 bg-background border border-input rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">End Date</label>
                  <input type="month" value={editingEdu.end_date} onChange={(e) => { setEditingEdu({ ...editingEdu, end_date: e.target.value }); setSaveStatus('unsaved'); }} className="w-full p-2.5 bg-background border border-input rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" required />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5">Location</label>
                  <input type="text" value={editingEdu.location || ''} onChange={(e) => { setEditingEdu({ ...editingEdu, location: e.target.value }); setSaveStatus('unsaved'); }} className="w-full p-2.5 bg-background border border-input rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Portal URL</label>
                  <input type="url" value={editingEdu.portal_url || ''} onChange={(e) => { setEditingEdu({ ...editingEdu, portal_url: e.target.value }); setSaveStatus('unsaved'); }} className="w-full p-2.5 bg-background border border-input rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5">Relevant Coursework</label>
                <div className="flex gap-2 mb-2">
                  <input type="text" value={courseworkInput} onChange={(e) => setCourseworkInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCoursework())} className="flex-1 p-2.5 bg-background border border-input rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" placeholder="Add course (press Enter)" />
                  <button type="button" onClick={addCoursework} className="px-4 py-2 bg-muted hover:bg-muted/80 rounded-lg">Add</button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {editingEdu.relevant_coursework?.map((course, i) => (
                    <span key={i} className="flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-lg text-sm">
                      {course}<button type="button" onClick={() => removeCoursework(i)} className="hover:bg-primary/20 rounded p-0.5"><X className="w-3 h-3" /></button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-muted hover:bg-muted/80 rounded-lg">Cancel</button>
                <button type="submit" disabled={saveStatus === 'saving'} className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 disabled:opacity-50">
                  {saveStatus === 'saving' ? 'Saving...' : editingEdu._id ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EducationAdminPage;
