import { createClient } from '@/utils/supabase/server';

export interface Category {
  id: number;
  name: string;
  description?: string;
  created_at: string;
  updated_at: string;
  // Add any other fields from your categories table
}

export interface CategoryWithRelations extends Category {
  // Add your related tables here, for example:
  subcategories?: Subcategory[];
  items?: Item[];
  // Add any other related tables
}

export interface Subcategory {
  id: number;
  category_id: number;
  name: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface Item {
  id: number;
  category_id: number;
  subcategory_id?: number;
  name: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

export async function getCategoriesWithRelations(): Promise<CategoryWithRelations[]> {
  const supabase = await createClient();
  
  const { data: categories, error } = await supabase
    .from('categories')
    .select(`
      *,
      subcategories (*),
      items (*)
    `)
    .order('name');

  if (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }

  return categories as CategoryWithRelations[];
}

export async function getCategoryById(id: number): Promise<CategoryWithRelations | null> {
  const supabase = await createClient();
  
  const { data: category, error } = await supabase
    .from('categories')
    .select(`
      *,
      subcategories (*),
      items (*)
    `)
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching category:', error);
    throw error;
  }

  return category as CategoryWithRelations;
} 