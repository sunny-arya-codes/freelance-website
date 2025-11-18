'use client';

import { useAuth } from '@/hooks/useAuth';
import { useState, useEffect } from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { GripVertical, Pencil, Trash2, Plus } from 'lucide-react'; // Icons

interface CrudItem {
  _id: string;
  title?: string;
  name?: string;
  [key: string]: any;
}

interface SortableItemProps {
  item: CrudItem;
  onEdit: (item: CrudItem) => void;
  onDelete: (id: string) => void;
}

const SortableItem = ({ item, onEdit, onDelete }: SortableItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: item._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 'auto',
  };

  return (
    <div 
        ref={setNodeRef} 
        style={style} 
        className={`group flex items-center justify-between p-3 mb-2 rounded-xl border border-white/20 transition-all duration-200 ${isDragging ? 'bg-blue-50 shadow-xl scale-105' : 'bg-white/40 hover:bg-white/60 shadow-sm'}`}
    >
      <div className="flex items-center gap-3 flex-1">
        <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing p-1 text-gray-400 hover:text-gray-700">
            <GripVertical className="w-5 h-5" />
        </div>
        <span className="font-medium text-gray-700">{item.title || item.name}</span>
      </div>
      
      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button onClick={() => onEdit(item)} size="icon" variant="ghost" className="h-8 w-8 hover:bg-yellow-100 hover:text-yellow-600">
            <Pencil className="w-4 h-4" />
        </Button>
        <Button onClick={() => onDelete(item._id)} size="icon" variant="ghost" className="h-8 w-8 hover:bg-red-100 hover:text-red-600">
            <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

interface CrudProps {
  collectionName: string;
}

const Crud = ({ collectionName }: CrudProps) => {
  const token = useAuth();
  const [items, setItems] = useState<CrudItem[]>([]);
  const [editingItem, setEditingItem] = useState<CrudItem | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    if (token) {
      fetch(`/api/${collectionName}`)
        .then((res) => res.json())
        .then((data) => setItems(data));
    }
  }, [token, collectionName]);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item._id === active.id);
        const newIndex = items.findIndex((item) => item._id === over.id);
        const newItems = arrayMove(items, oldIndex, newIndex);
        const ordered_ids = newItems.map((item) => item._id);
        fetch(`/api/${collectionName}/order`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
            body: JSON.stringify({ ordered_ids }),
        });
        return newItems;
      });
    }
  };

  return (
    <Card className="p-6 bg-white/30 backdrop-blur-lg border-white/20 shadow-xl rounded-2xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 capitalize">Manage {collectionName}</h1>
        <Button size="sm" className="gap-2 bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4" /> Add New
        </Button>
      </div>
      
      <div className="bg-white/20 rounded-xl p-2 border border-white/10 min-h-[200px]">
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={items.map(i => i._id)} strategy={verticalListSortingStrategy}>
            {items.map((item) => (
                <SortableItem key={item._id} item={item} onEdit={setEditingItem} onDelete={() => {}} />
            ))}
            </SortableContext>
        </DndContext>
      </div>
    </Card>
  );
};

export default Crud;