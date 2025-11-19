'use client';

import { useAuth } from '@/hooks/useAuth';
import { useState, useEffect } from 'react';
import { ImageUpload } from '@/components/admin/ImageUpload';
import { SaveStatus, SaveStatus as SaveStatusType } from '@/components/admin/SaveStatus';
import { Plus, Pencil, Trash2, X } from 'lucide-react';

interface Training {
  _id?: string;
  name: string;
  provider: string;
  start_date: string;
  end_date: string;
  certificate_url?: string;
  order: number;
  imageUrl?: string;
}

const TrainingAdminPage = () => {
  const token = useAuth();
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState<SaveStatusType>('saved');
  const [editingTraining, setEditingTraining] = useState<Training | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (token) fetchTrainings();
  }, [token]);

  const fetchTrainings = async () => {
    try {
      const res = await fetch('/api/training');
      if (res.ok) setTrainings(await res.json());
    } catch (err) {
      console.error('Failed to fetch trainings');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTraining) return;

    setSaveStatus('saving');
    try {
      const url = editingTraining._id ? `/api/training/${editingTraining._id}` : '/api/training';
      const method = editingTraining._id ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(editingTraining),
      });

      if (res.ok) {
        setSaveStatus('saved');
        setIsModalOpen(false);
        setEditingTraining(null);
        await fetchTrainings();
      } else {
        setSaveStatus('error');
      }
    } catch (err) {
      setSaveStatus('error');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this training?')) return;
    try {
      await fetch(`/api/training/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      await fetchTrainings();
    } catch (err) {
      console.error('Failed to delete');
    }
  };

  const handleImageUpload = async (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setEditingTraining(prev => prev ? { ...prev, imageUrl: reader.result as string } : null);
    };
    reader.readAsDataURL(file);
  };

  const openModal = (training?: Training) => {
    setEditingTraining(training || {
      name: '',
      provider: '',
      start_date: '',
      end_date: '',
      order: trainings.length + 1,
    });
    setSaveStatus('saved');
    setIsModalOpen(true);
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-full"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Training & Certifications</h1>
          <p className="text-muted-foreground mt-1">Manage your training programs and certifications</p>
        </div>
        <button onClick={() => openModal()} className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90">
          <Plus className="w-4 h-4" />Add Training
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trainings.map((training) => (
          <div key={training._id} className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
            {training.imageUrl && (
              <div className="aspect-video bg-muted relative">
                <img src={training.imageUrl} alt={training.name} className="w-full h-full object-cover" />
              </div>
            )}
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-1">{training.name}</h3>
              <p className="text-sm text-muted-foreground mb-2">{training.provider}</p>
              <p className="text-xs text-muted-foreground mb-3">{training.start_date} - {training.end_date}</p>
              <div className="flex gap-2">
                <button onClick={() => openModal(training)} className="flex-1 flex items-center justify-center gap-2 px-3 py-1.5 bg-muted hover:bg-muted/80 rounded text-sm">
                  <Pencil className="w-3 h-3" />Edit
                </button>
                <button onClick={() => handleDelete(training._id!)} className="px-3 py-1.5 bg-destructive/10 hover:bg-destructive/20 text-destructive rounded text-sm">
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && editingTraining && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-xl max-w-2xl w-full">
            <div className="border-b p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold">{editingTraining._id ? 'Edit Training' : 'New Training'}</h2>
              <div className="flex items-center gap-4">
                <SaveStatus status={saveStatus} />
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-muted rounded-lg"><X className="w-5 h-5" /></button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <ImageUpload currentImage={editingTraining.imageUrl} onUpload={handleImageUpload} label="Certificate Image" />

              <div>
                <label className="block text-sm font-medium mb-1.5">Training Name</label>
                <input type="text" value={editingTraining.name} onChange={(e) => { setEditingTraining({ ...editingTraining, name: e.target.value }); setSaveStatus('unsaved'); }} className="w-full p-2.5 bg-background border border-input rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" required />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5">Provider</label>
                <input type="text" value={editingTraining.provider} onChange={(e) => { setEditingTraining({ ...editingTraining, provider: e.target.value }); setSaveStatus('unsaved'); }} className="w-full p-2.5 bg-background border border-input rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" required />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5">Start Date</label>
                  <input type="month" value={editingTraining.start_date} onChange={(e) => { setEditingTraining({ ...editingTraining, start_date: e.target.value }); setSaveStatus('unsaved'); }} className="w-full p-2.5 bg-background border border-input rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">End Date</label>
                  <input type="month" value={editingTraining.end_date} onChange={(e) => { setEditingTraining({ ...editingTraining, end_date: e.target.value }); setSaveStatus('unsaved'); }} className="w-full p-2.5 bg-background border border-input rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" required />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5">Certificate URL</label>
                <input type="url" value={editingTraining.certificate_url || ''} onChange={(e) => { setEditingTraining({ ...editingTraining, certificate_url: e.target.value }); setSaveStatus('unsaved'); }} className="w-full p-2.5 bg-background border border-input rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" placeholder="https://..." />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-muted hover:bg-muted/80 rounded-lg">Cancel</button>
                <button type="submit" disabled={saveStatus === 'saving'} className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 disabled:opacity-50">
                  {saveStatus === 'saving' ? 'Saving...' : editingTraining._id ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainingAdminPage;
