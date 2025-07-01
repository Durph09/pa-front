import { Category } from '@/app/protected/dashboard/lib/categories';
import { EditableList } from '../EditableList';

interface CategoryListProps {
  categories: Category[];
  onAdd: () => void;
  onEdit: (category: Category, index: number) => void;
  loading?: boolean;
  error?: string | null;
}

export function CategoryList({ 
  categories, 
  onAdd, 
  onEdit, 
  loading = false, 
  error = null 
}: CategoryListProps) {

  console.log( 'categories: ', categories)
  const renderCategory = (category: Category) => {
    return (
      <div className="space-y-2">
        <div className="font-medium text-slate-800">{category.name}</div>
        {category.description && (
          <div className="text-sm text-muted-foreground">{category.description}</div>
        )}
        <div className="text-xs text-muted-foreground">
          Created: {new Date(category.created_at).toLocaleDateString()}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-muted-foreground">Loading categories...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-destructive">Error: {error}</div>
      </div>
    );
  }

  return (
    <EditableList
      items={categories}
      onAdd={onAdd}
      onEdit={onEdit}
      renderItem={renderCategory}
      title="Categories"
    />
  );
} 