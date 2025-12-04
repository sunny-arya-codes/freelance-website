'use client';

import { useAuth } from '@/hooks/useAuth';
import { useState, useEffect } from 'react';
import { SaveStatus, SaveStatus as SaveStatusType } from '@/components/admin/SaveStatus';
import { Plus, Pencil, Trash2, X } from 'lucide-react';

interface Skill {
  _id?: string;
  category: string;
  skills: string[];
}

const SkillsAdminPage = () => {
  const token = useAuth();
  const [skillCategories, setSkillCategories] = useState<Skill[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState<SaveStatusType>('saved');
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [skillInput, setSkillInput] = useState('');

  useEffect(() => {
    if (token) {
      fetchSkills();
    }
  }, [token]);

  const fetchSkills = async () => {
    try {
      const res = await fetch('/api/skills');
      if (res.ok) {
        const data = await res.json();
        setSkillCategories(data);
      }
    } catch (err) {
      console.error('Failed to fetch skills');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSkill) return;

    setSaveStatus('saving');
    try {
      const url = editingSkill._id
        ? `/api/skills/${editingSkill._id}`
        : '/api/skills';

      const method = editingSkill._id ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editingSkill),
      });

      if (res.ok) {
        setSaveStatus('saved');
        setIsModalOpen(false);
        setEditingSkill(null);
        await fetchSkills();
      } else {
        setSaveStatus('error');
      }
    } catch (err) {
      setSaveStatus('error');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this skill category?')) return;

    try {
      const res = await fetch(`/api/skills/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        await fetchSkills();
      }
    } catch (err) {
      console.error('Failed to delete skill category');
    }
  };

  const openModal = (skill?: Skill) => {
    if (skill) {
      setEditingSkill(skill);
    } else {
      setEditingSkill({
        category: '',
        skills: [],
      });
    }
    setSkillInput('');
    setSaveStatus('saved');
    setIsModalOpen(true);
  };

  const addSkill = () => {
    if (!skillInput.trim() || !editingSkill) return;
    setEditingSkill({
      ...editingSkill,
      skills: [...editingSkill.skills, skillInput.trim()],
    });
    setSkillInput('');
    setSaveStatus('unsaved');
  };

  const removeSkill = (index: number) => {
    if (!editingSkill) return;
    setEditingSkill({
      ...editingSkill,
      skills: editingSkill.skills.filter((_, i) => i !== index),
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
          <h1 className="text-3xl font-bold tracking-tight">Skills</h1>
          <p className="text-muted-foreground mt-1">Manage your technical skills by category</p>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
        >
          <Plus className="w-4 h-4" />
          Add Category
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skillCategories.map((skillCat) => (
          <div
            key={skillCat._id}
            className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <h3 className="font-semibold text-lg">{skillCat.category}</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => openModal(skillCat)}
                  className="p-1.5 hover:bg-muted rounded transition-colors"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(skillCat._id!)}
                  className="p-1.5 hover:bg-destructive/10 text-destructive rounded transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {skillCat.skills.map((skill, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-primary/10 text-primary rounded-lg text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && editingSkill && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-xl max-w-2xl w-full">
            <div className="border-b border-border p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold">
                {editingSkill._id ? 'Edit Skill Category' : 'New Skill Category'}
              </h2>
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
              <div>
                <label className="block text-sm font-medium mb-1.5">Category Name</label>
                <input
                  type="text"
                  value={editingSkill.category}
                  onChange={(e) => {
                    setEditingSkill({ ...editingSkill, category: e.target.value });
                    setSaveStatus('unsaved');
                  }}
                  className="w-full p-2.5 bg-background border border-input rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                  placeholder="e.g., Programming Languages, Frameworks, Tools"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5">Skills</label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                    className="flex-1 p-2.5 bg-background border border-input rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                    placeholder="Add skill (press Enter)"
                  />
                  <button
                    type="button"
                    onClick={addSkill}
                    className="px-4 py-2 bg-muted hover:bg-muted/80 rounded-lg transition-colors"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 min-h-[60px] p-3 bg-muted/50 rounded-lg border border-border">
                  {editingSkill.skills.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No skills added yet</p>
                  ) : (
                    editingSkill.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-lg text-sm"
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={() => removeSkill(index)}
                          className="hover:bg-primary/20 rounded p-0.5"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))
                  )}
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
                  disabled={saveStatus === 'saving' || editingSkill.skills.length === 0}
                  className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {saveStatus === 'saving' ? 'Saving...' : editingSkill._id ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillsAdminPage;
