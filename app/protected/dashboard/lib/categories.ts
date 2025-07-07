import { Category } from "@/lib/types";

const API_BASE_URL = process.env.API_URL;


/**
 * Fetch all categories for a user from the API
 * Based on /category/get-all-categories endpoint
 */
export async function getCategories(userId: string): Promise<Category[]> {

  const options = {
    method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.API_KEY || '',
      },
      body: JSON.stringify({ user_id: userId })
  }
  

  try {
    const response = await fetch(`${API_BASE_URL}/category/get-all-categories`, options);

    

    if (!response.ok) {
    
       // throw new Error(response.statusText || 'Categories not found');
       return []
      }
      
    

    const data = await response.json();
  
    return data.results || [];
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
}

/**
 * Fetch a single category by ID
 * Based on /category/get-category-by-id endpoint
 */
export async function getCategoryById(categoryId: string, userId: string): Promise<Category | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/category/get-category-by-id`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.API_KEY || '',
      },
      body: JSON.stringify({ 
        id: categoryId,
        user_id: userId 
      }),
    });

    if (!response.ok) {
      if (response.status === 404) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Category not found');
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.results?.[0] || null;
  } catch (error) {
    console.error('Error fetching category:', error);
    throw error;
  }
}

