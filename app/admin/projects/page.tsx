'use client';

import { useAuth } from '@/hooks/useAuth';
import { useState, useEffect } from 'react';
import { ImageUpload } from '@/components/admin/ImageUpload';
import { SaveStatus, SaveStatus as SaveStatusType } from '@/components/admin/SaveStatus';
import { Plus, Pencil, Trash2, X } from 'lucide-react';

interface Project {
  _id?: string;
  name: string;
  type: string;
  repo_url?: string;
  notebook_url?: string;
  description: string;
  tech_stack: string[];
  order: number;
  imageUrl?: string;
}

const ProjectsAdminPage = () => {
  const token = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState<SaveStatusType>('saved');
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [techStackInput, setTechStackInput] = useState('');

  useEffect(() => {
    if (token) {
      fetchProjects();
    }
  }, [token]);

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/projects');
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      }
    } catch (err) {
      console.error('Failed to fetch projects');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    setSaveStatus('saving');
    try {
      const url = editingProject._id
        ? `/api/projects/${editingProject._id}`
        : '/api/projects';

      const method = editingProject._id ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editingProject),
      });

      if (res.ok) {
        setSaveStatus('saved');
        setIsModalOpen(false);
        setEditingProject(null);
        await fetchProjects();
      } else {
        setSaveStatus('error');
      }
    } catch (err) {
      setSaveStatus('error');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        await fetchProjects();
      }
    } catch (err) {
      console.error('Failed to delete project');
    }
  };

  const handleImageUpload = async (file: File) => {
    if (!editingProject) return;

    const formData = new FormData();
    formData.append('image', file);
    formData.append('projectId', editingProject._id || 'new');

    // Convert to Base64
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setEditingProject(prev => prev ? { ...prev, imageUrl: base64 } : null);
    };
    reader.readAsDataURL(file);
  };

  const openModal = (project?: Project) => {
    if (project) {
      setEditingProject(project);
    } else {
      setEditingProject({
        name: '',
        type: '',
        description: '',
        tech_stack: [],
        order: projects.length + 1,
      });
    }
    setTechStackInput('');
    setSaveStatus('saved');
    setIsModalOpen(true);
  };

  const addTechStack = () => {
    if (!techStackInput.trim() || !editingProject) return;
    setEditingProject({
      ...editingProject,
      tech_stack: [...editingProject.tech_stack, techStackInput.trim()],
    });
    setTechStackInput('');
    setSaveStatus('unsaved');
  };

  const removeTechStack = (index: number) => {
    if (!editingProject) return;
    setEditingProject({
      ...editingProject,
      tech_stack: editingProject.tech_stack.filter((_, i) => i !== index),
    });
    setSaveStatus('unsaved');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground mt-1">Manage your portfolio projects</p>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
        >
          <Plus className="w-4 h-4" />
          Add Project
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project._id}
            className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
          >
            {project.imageUrl && (
              <div className="aspect-video bg-muted relative">
                <img
                  src={project.imageUrl}
                  alt={project.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-1">{project.name}</h3>
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-1 mb-3">
                {project.tech_stack.slice(0, 3).map((tech, i) => (
                  <span
                    key={i}
                    className="text-xs px-2 py-1 bg-primary/10 text-primary rounded"
                  >
                    {tech}
                  </span>
                ))}
                {project.tech_stack.length > 3 && (
                  <span className="text-xs px-2 py-1 bg-muted text-muted-foreground rounded">
                    +{project.tech_stack.length - 3}
                  </span>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => openModal(project)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-1.5 bg-muted hover:bg-muted/80 rounded text-sm transition-colors"
                >
                  <Pencil className="w-3 h-3" />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(project._id!)}
                  className="px-3 py-1.5 bg-destructive/10 hover:bg-destructive/20 text-destructive rounded text-sm transition-colors"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && editingProject && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-card border-b border-border p-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">
                  {editingProject._id ? 'Edit Project' : 'New Project'}
                </h2>
              </div>
              <div className="flex items-center gap-4">
                <SaveStatus status={saveStatus} />
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-muted rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <ImageUpload
                currentImage={editingProject.imageUrl}
                onUpload={handleImageUpload}
                label="Project Image"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5">Project Name</label>
                  <input
                    type="text"
                    value={editingProject.name}
                    onChange={(e) => {
                      setEditingProject({ ...editingProject, name: e.target.value });
                      setSaveStatus('unsaved');
                    }}
                    className="w-full p-2.5 bg-background border border-input rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5">Type</label>
                  <input
                    type="text"
                    value={editingProject.type}
                    onChange={(e) => {
                      setEditingProject({ ...editingProject, type: e.target.value });
                      setSaveStatus('unsaved');
                    }}
                    className="w-full p-2.5 bg-background border border-input rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                    placeholder="Web App, ML Project, etc."
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5">Description</label>
                <textarea
                  value={editingProject.description}
                  onChange={(e) => {
                    setEditingProject({ ...editingProject, description: e.target.value });
                    setSaveStatus('unsaved');
                  }}
                  rows={4}
                  className="w-full p-2.5 bg-background border border-input rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none resize-none"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5">Repository URL</label>
                  <input
                    type="url"
                    value={editingProject.repo_url || ''}
                    onChange={(e) => {
                      setEditingProject({ ...editingProject, repo_url: e.target.value });
                      setSaveStatus('unsaved');
                    }}
                    className="w-full p-2.5 bg-background border border-input rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                    placeholder="https://github.com/..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5">Notebook URL</label>
                  <input
                    type="url"
                    value={editingProject.notebook_url || ''}
                    onChange={(e) => {
                      setEditingProject({ ...editingProject, notebook_url: e.target.value });
                      setSaveStatus('unsaved');
                    }}
                    className="w-full p-2.5 bg-background border border-input rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                    placeholder="https://colab.research.google.com/..."
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5">Tech Stack</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={techStackInput}
                    onChange={(e) => setTechStackInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechStack())}
                    className="flex-1 p-2.5 bg-background border border-input rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                    placeholder="Add technology (press Enter)"
                  />
                  <button
                    type="button"
                    onClick={addTechStack}
                    className="px-4 py-2 bg-muted hover:bg-muted/80 rounded-lg transition-colors"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {editingProject.tech_stack.map((tech, index) => (
                    <span
                      key={index}
                      className="flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-lg text-sm"
                    >
                      {tech}
                      <button
                        type="button"
                        onClick={() => removeTechStack(index)}
                        className="hover:bg-primary/20 rounded p-0.5"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-border">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-muted hover:bg-muted/80 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saveStatus === 'saving'}
                  className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {saveStatus === 'saving' ? 'Saving...' : editingProject._id ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsAdminPage;
