import { getUser } from '@/lib/get-user';
import { CategoryListContainer } from './containers/category-list-container';
import { getCategories } from '@/app/protected/dashboard/lib/categories';

interface CategoryListProps {
  userId: string;
}

export async function CategoryList({ userId }: CategoryListProps) {
  // Server-side data fetching
  const user = await getUser();
  const categories = await getCategories(user.id);

  return (
    <CategoryListContainer 
      initialCategories={categories} 
      userId={user.id} 
    />
  );
} 