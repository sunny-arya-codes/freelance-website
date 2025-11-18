
'use client';

import { useAuth } from '@/hooks/useAuth';
import { useState, useEffect } from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

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
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: item._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="p-4 bg-gray-100 rounded-lg mb-2 flex justify-between items-center">
      <span>{item.title || item.name}</span>
      <div>
        <button onClick={() => onEdit(item)} className="bg-yellow-500 text-white p-2 rounded mr-2">Edit</button>
        <button onClick={() => onDelete(item._id)} className="bg-red-500 text-white p-2 rounded">Delete</button>
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

        // Update order on the server
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

  // CRUD functions (create, update, delete) would be implemented here

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Manage {collectionName}</h1>
      {/* Add button to create new item */}
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={items.map(i => i._id)} strategy={verticalListSortingStrategy}>
          {items.map((item) => (
            <SortableItem key={item._id} item={item} onEdit={setEditingItem} onDelete={() => {}} />
          ))}
        </SortableContext>
      </DndContext>
      {/* Add modal for editing/creating items */}
    </div>
  );
};

export default Crud;
