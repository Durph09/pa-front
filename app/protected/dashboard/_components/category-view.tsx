import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { CategoryForm } from "@/components/_components/category-form"
import { Category } from "@/lib/types"
import { Plus, Edit, Trash2, FolderOpen, FileText, CheckSquare, Zap } from "lucide-react"


export function CategoryView({ categories, activeView, handleSaveCategory, handleDeleteCategory }: { categories: Category[], activeView: string, handleSaveCategory: (data: any) => void, handleDeleteCategory: (id: string) => void }){

    return (
       <>
        {activeView === "categories" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold tracking-tight">Categories</h2>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Category
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create New Category</DialogTitle>
                      <DialogDescription>Add a new category to organize your projects.</DialogDescription>
                    </DialogHeader>
                    <CategoryForm onSave={handleSaveCategory} onCancel={() => {}} />
                  </DialogContent>
                </Dialog>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {categories.map((category) => (
                  <Card key={category.id}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">{category.name}</CardTitle>
                      <div className="flex space-x-1">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Edit Category</DialogTitle>
                            </DialogHeader>
                            <CategoryForm category={category} onSave={handleSaveCategory} onCancel={() => {}} />
                          </DialogContent>
                        </Dialog>
                        <Button variant="ghost" size="sm" onClick={() => handleDeleteCategory(category.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{category.project_count || 0}</div>
                      <p className="text-xs text-muted-foreground">{category.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </>
    )
}