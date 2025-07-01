'use server';

// Server actions for category mutations
// Following the frontend structure guide pattern

const API_BASE_URL = 'http://localhost:3002';

export interface AddCategoryData {
  categoryTableSchema: {
    id: string;
    name: string;
    description?: string;
    created_at: string;
    user_id: string;
  };
}

export interface UpdateCategoryData {
  id: string;
  user_id: string;
  name?: string;
  description?: string;
}

export interface DeleteCategoryData {
  id: string;
  user_id: string;
}

/**
 * Add a new category
 * Based on /category/add-category endpoint
 */
export async function addCategory(categoryData: AddCategoryData) {
  try {
    const response = await fetch(`${API_BASE_URL}/category/add-category`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(categoryData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return { success: true, id: data.id };
  } catch (error) {
    console.error('Error adding category:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Update an existing category
 * Based on /category/update-category endpoint
 */
export async function updateCategory(updateData: UpdateCategoryData) {
  try {
    const response = await fetch(`${API_BASE_URL}/category/update-category`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    });

    if (!response.ok) {
      if (response.status === 404) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Category not found');
      }
      const errorData = await response.json();
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return { success: true, result: data.result };
  } catch (error) {
    console.error('Error updating category:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Delete a category
 * Based on /category/delete-category endpoint
 */
export async function deleteCategory(deleteData: DeleteCategoryData) {
  try {
    const response = await fetch(`${API_BASE_URL}/category/delete-category`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(deleteData),
    });

    if (!response.ok) {
      if (response.status === 404) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Category not found');
      }
      const errorData = await response.json();
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return { success: true, message: data.message, deletedCategory: data.deletedCategory };
  } catch (error) {
    console.error('Error deleting category:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
} 