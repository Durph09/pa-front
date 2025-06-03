'use client';

import { CategoryWithRelations, getCategoriesWithRelations } from '@/lib/categories';
import { EditableList } from './EditableList';
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';

export function CategoryList() {
  const [categories, setCategories] = useState<CategoryWithRelations[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data, error } = await supabase
          .from('categories')
          .select(`
            *,
            subcategories (*),
            items (*)
          `)
          .order('name');

        if (error) throw error;
        setCategories(data as CategoryWithRelations[]);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleAdd = () => {
    // Implement add category logic
    console.log('Add category');
  };

  const handleEdit = (category: CategoryWithRelations, index: number) => {
    // Implement edit category logic
    console.log('Edit category:', category);
  };

  const renderCategory = (category: CategoryWithRelations) => {
    return (
      <div className="space-y-2">
        <div className="font-medium">{category.name}</div>
        {category.description && (
          <div className="text-sm text-gray-600">{category.description}</div>
        )}
        {category.subcategories && category.subcategories.length > 0 && (
          <div className="mt-2">
            <div className="text-sm font-medium text-gray-700">Subcategories:</div>
            <ul className="list-disc list-inside text-sm text-gray-600">
              {category.subcategories.map((sub) => (
                <li key={sub.id}>{sub.name}</li>
              ))}
            </ul>
          </div>
        )}
        {category.items && category.items.length > 0 && (
          <div className="mt-2">
            <div className="text-sm font-medium text-gray-700">Items:</div>
            <ul className="list-disc list-inside text-sm text-gray-600">
              {category.items.map((item) => (
                <li key={item.id}>{item.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };

  if (loading) {
    return <div>Loading categories...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <EditableList
      items={categories}
      onAdd={handleAdd}
      onEdit={handleEdit}
      renderItem={renderCategory}
      title="Categories"
    />
  );
} 