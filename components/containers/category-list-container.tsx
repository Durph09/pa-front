'use client';

import { Category } from '@/app/protected/dashboard/lib/categories';
import { CategoryList } from '../_components/category-list';
import { addCategory, updateCategory, deleteCategory } from '@/actions/category-actions';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Textarea } from '../ui/textarea';

interface CategoryListContainerProps {
  initialCategories: Category[];
  userId: string;
}

export function CategoryListContainer({ initialCategories, userId }: CategoryListContainerProps) {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editIndex, setEditIndex] = useState<number>(-1);

  const handleAdd = () => {
    setIsAddDialogOpen(true);
  };

  const handleEdit = (category: Category, index: number) => {
    setEditingCategory(category);
    setEditIndex(index);
    setIsEditDialogOpen(true);
  };

  const handleAddSubmit = async (formData: FormData) => {
    setLoading(true);
    setError(null);

    try {
      const name = formData.get('name') as string;
      const description = formData.get('description') as string;

      const result = await addCategory({
        categoryTableSchema: {
          id: crypto.randomUUID(),
          name,
          description,
          created_at: new Date().toISOString(),
          user_id: userId,
        },
      });

      if (result.success) {
        const newCategory: Category = {
          id: result.id!,
          name,
          description,
          created_at: new Date().toISOString(),
          user_id: userId,
        };
        setCategories(prev => [...prev, newCategory]);
        setIsAddDialogOpen(false);
      } else {
        setError(result.error || 'Failed to add category');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleEditSubmit = async (formData: FormData) => {
    if (!editingCategory) return;

    setLoading(true);
    setError(null);

    try {
      const name = formData.get('name') as string;
      const description = formData.get('description') as string;

      const result = await updateCategory({
        id: editingCategory.id,
        user_id: userId,
        name,
        description,
      });

      if (result.success) {
        setCategories(prev => prev.map((cat, index) => 
          index === editIndex 
            ? { ...cat, name, description }
            : cat
        ));
        setIsEditDialogOpen(false);
        setEditingCategory(null);
        setEditIndex(-1);
      } else {
        setError(result.error || 'Failed to update category');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <CategoryList
        categories={categories}
        onAdd={handleAdd}
        onEdit={handleEdit}
        loading={loading}
        error={error}
      />

      {/* Add Category Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Category</DialogTitle>
          </DialogHeader>
          <form action={handleAddSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" required />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" />
            </div>
            <div className="flex justify-end gap-2">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsAddDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? 'Adding...' : 'Add Category'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Category Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
          </DialogHeader>
          {editingCategory && (
            <form action={handleEditSubmit} className="space-y-4">
              <div>
                <Label htmlFor="edit-name">Name</Label>
                <Input 
                  id="edit-name" 
                  name="name" 
                  defaultValue={editingCategory.name}
                  required 
                />
              </div>
              <div>
                <Label htmlFor="edit-description">Description</Label>
                <Textarea 
                  id="edit-description" 
                  name="description" 
                  defaultValue={editingCategory.description || ''}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsEditDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? 'Updating...' : 'Update Category'}
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
} 