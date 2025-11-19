'use client';

import { useAuth } from '@/hooks/useAuth';
import { useState, useEffect } from 'react';
import { ImageUpload } from '@/components/admin/ImageUpload';
import { SaveStatus, SaveStatus as SaveStatusType } from '@/components/admin/SaveStatus';
import { Plus, Pencil, Trash2, X } from 'lucide-react';

interface Experience {
  _id?: string;
  title: string;
  company: string;
  company_website?: string;
  location: string;
  start_date: string;
  end_date?: string;
  responsibilities: string[];
  tech_stack: string[];
  order: number;
  imageUrl?: string;
}

const ExperienceAdminPage = () => {
  const token = useAuth();
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState<SaveStatusType>('saved');
  const [editingExp, setEditingExp] = useState<Experience | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [responsibilityInput, setResponsibilityInput] = useState('');
  const [techStackInput, setTechStackInput] = useState('');

  useEffect(() => {
    if (token) fetchExperiences();
  }, [token]);

  const fetchExperiences = async () => {
    try {
      const res = await fetch('/api/experience');
      if (res.ok) setExperiences(await res.json());
    } catch (err) {
      console.error('Failed to fetch experiences');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingExp) return;

    setSaveStatus('saving');
    try {
      const url = editingExp._id ? `/api/experience/${editingExp._id}` : '/api/experience';
      const method = editingExp._id ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(editingExp),
      });

      if (res.ok) {
        setSaveStatus('saved');
        setIsModalOpen(false);
        setEditingExp(null);
        await fetchExperiences();
      } else {
        setSaveStatus('error');
      }
    } catch (err) {
      setSaveStatus('error');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this experience?')) return;
    try {
      await fetch(`/api/experience/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      await fetchExperiences();
    } catch (err) {
      console.error('Failed to delete');
    }
  };

  const handleImageUpload = async (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setEditingExp(prev => prev ? { ...prev, imageUrl: reader.result as string } : null);
    };
    reader.readAsDataURL(file);
  };

  const openModal = (exp?: Experience) => {
    setEditingExp(exp || {
      title: '',
      company: '',
      location: '',
      start_date: '',
      responsibilities: [],
      tech_stack: [],
      order: experiences.length + 1,
    });
    setResponsibilityInput('');
    setTechStackInput('');
    setSaveStatus('saved');
    setIsModalOpen(true);
  };

  const addResponsibility = () => {
    if (!responsibilityInput.trim() || !editingExp) return;
    setEditingExp({ ...editingExp, responsibilities: [...editingExp.responsibilities, responsibilityInput.trim()] });
    setResponsibilityInput('');
    setSaveStatus('unsaved');
  };

  const removeResponsibility = (index: number) => {
    if (!editingExp) return;
    setEditingExp({ ...editingExp, responsibilities: editingExp.responsibilities.filter((_, i) => i !== index) });
    setSaveStatus('unsaved');
  };

  const addTechStack = () => {
    if (!techStackInput.trim() || !editingExp) return;
    setEditingExp({ ...editingExp, tech_stack: [...editingExp.tech_stack, techStackInput.trim()] });
    setTechStackInput('');
    setSaveStatus('unsaved');
  };

  const removeTechStack = (index: number) => {
    if (!editingExp) return;
    setEditingExp({ ...editingExp, tech_stack: editingExp.tech_stack.filter((_, i) => i !== index) });
    setSaveStatus('unsaved');
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-full"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Experience</h1>
          <p className="text-muted-foreground mt-1">Manage your work experience</p>
        </div>
        <button onClick={() => openModal()} className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90">
          <Plus className="w-4 h-4" />Add Experience
        </button>
      </div>

      <div className="space-y-4">
        {experiences.map((exp) => (
          <div key={exp._id} className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
            <div className="flex gap-4">
              {exp.imageUrl && (
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                  <img src={exp.imageUrl} alt={exp.company} className="w-full h-full object-cover" />
                </div>
              )}
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">{exp.title}</h3>
                    <p className="text-muted-foreground">{exp.company} • {exp.location}</p>
                    <p className="text-sm text-muted-foreground mt-1">{exp.start_date} - {exp.end_date || 'Present'}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => openModal(exp)} className="p-2 hover:bg-muted rounded transition-colors">
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(exp._id!)} className="p-2 hover:bg-destructive/10 text-destructive rounded transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-1">
                  {exp.tech_stack.slice(0, 5).map((tech, i) => (
                    <span key={i} className="text-xs px-2 py-1 bg-primary/10 text-primary rounded">{tech}</span>
                  ))}
                  {exp.tech_stack.length > 5 && <span className="text-xs px-2 py-1 bg-muted text-muted-foreground rounded">+{exp.tech_stack.length - 5}</span>}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && editingExp && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-card border-b p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold">{editingExp._id ? 'Edit Experience' : 'New Experience'}</h2>
              <div className="flex items-center gap-4">
                <SaveStatus status={saveStatus} />
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-muted rounded-lg"><X className="w-5 h-5" /></button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <ImageUpload currentImage={editingExp.imageUrl} onUpload={handleImageUpload} label="Company Logo" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5">Job Title</label>
                  <input type="text" value={editingExp.title} onChange={(e) => { setEditingExp({ ...editingExp, title: e.target.value }); setSaveStatus('unsaved'); }} className="w-full p-2.5 bg-background border border-input rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Company</label>
                  <input type="text" value={editingExp.company} onChange={(e) => { setEditingExp({ ...editingExp, company: e.target.value }); setSaveStatus('unsaved'); }} className="w-full p-2.5 bg-background border border-input rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" required />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5">Location</label>
                  <input type="text" value={editingExp.location} onChange={(e) => { setEditingExp({ ...editingExp, location: e.target.value }); setSaveStatus('unsaved'); }} className="w-full p-2.5 bg-background border border-input rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Company Website</label>
                  <input type="url" value={editingExp.company_website || ''} onChange={(e) => { setEditingExp({ ...editingExp, company_website: e.target.value }); setSaveStatus('unsaved'); }} className="w-full p-2.5 bg-background border border-input rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5">Start Date</label>
                  <input type="month" value={editingExp.start_date} onChange={(e) => { setEditingExp({ ...editingExp, start_date: e.target.value }); setSaveStatus('unsaved'); }} className="w-full p-2.5 bg-background border border-input rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">End Date (leave empty if current)</label>
                  <input type="month" value={editingExp.end_date || ''} onChange={(e) => { setEditingExp({ ...editingExp, end_date: e.target.value }); setSaveStatus('unsaved'); }} className="w-full p-2.5 bg-background border border-input rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5">Responsibilities</label>
                <div className="flex gap-2 mb-2">
                  <input type="text" value={responsibilityInput} onChange={(e) => setResponsibilityInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addResponsibility())} className="flex-1 p-2.5 bg-background border border-input rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" placeholder="Add responsibility (press Enter)" />
                  <button type="button" onClick={addResponsibility} className="px-4 py-2 bg-muted hover:bg-muted/80 rounded-lg">Add</button>
                </div>
                <ul className="space-y-2">
                  {editingExp.responsibilities.map((resp, i) => (
                    <li key={i} className="flex items-start gap-2 p-2 bg-muted/50 rounded">
                      <span className="flex-1 text-sm">{resp}</span>
                      <button type="button" onClick={() => removeResponsibility(i)} className="text-destructive hover:bg-destructive/10 rounded p-1"><X className="w-4 h-4" /></button>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5">Tech Stack</label>
                <div className="flex gap-2 mb-2">
                  <input type="text" value={techStackInput} onChange={(e) => setTechStackInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechStack())} className="flex-1 p-2.5 bg-background border border-input rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" placeholder="Add technology (press Enter)" />
                  <button type="button" onClick={addTechStack} className="px-4 py-2 bg-muted hover:bg-muted/80 rounded-lg">Add</button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {editingExp.tech_stack.map((tech, i) => (
                    <span key={i} className="flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-lg text-sm">
                      {tech}<button type="button" onClick={() => removeTechStack(i)} className="hover:bg-primary/20 rounded p-0.5"><X className="w-3 h-3" /></button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-muted hover:bg-muted/80 rounded-lg">Cancel</button>
                <button type="submit" disabled={saveStatus === 'saving'} className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 disabled:opacity-50">
                  {saveStatus === 'saving' ? 'Saving...' : editingExp._id ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExperienceAdminPage;
