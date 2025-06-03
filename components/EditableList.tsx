'use client'
import { Plus, Pencil } from 'lucide-react';

interface EditableListProps<T> {
  items: T[];
  onAdd?: () => void;
  onEdit?: (item: T, index: number) => void;
  renderItem: (item: T, index: number) => React.ReactNode;
  title?: string;
}

export function EditableList<T>({
  items = [],
  onAdd = () => {},
  onEdit = () => {},
  renderItem = () => {},
  title = 'List'
}: EditableListProps<T>) {
  return (
    <div className="w-full max-w-2xl mx-auto p-4 bg-white rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        <div className="flex gap-2">
          {onAdd && (
            <button
              onClick={onAdd}
              className="flex items-center gap-1 px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add
            </button>
          )}
        </div>
      </div>
      
      <div className="space-y-2">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
          >
            <div className="flex-1">
              {renderItem(item, index)}
            </div>
            {onEdit && (
              <button
                onClick={() => onEdit(item, index)}
                className="p-2 text-gray-600 hover:text-blue-500 transition-colors"
                aria-label="Edit item"
              >
                <Pencil className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}
        
        {items.length === 0 && (
          <div className="text-center py-4 text-gray-500">
            No items in the list
          </div>
        )}
      </div>
    </div>
  );
} 