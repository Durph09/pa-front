import { CategoryList } from '@/components/CategoryList';

// This would typically come from your auth system
// For demo purposes, using a placeholder user ID
const DEMO_USER_ID = 'demo-user-123';

export default async function CategoriesPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Categories</h1>
      <CategoryList userId={DEMO_USER_ID} />
    </div>
  );
} 