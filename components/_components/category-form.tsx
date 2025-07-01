import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Category } from "@/app/protected/dashboard/lib/categories"

export function CategoryForm({
    category,
    onSave,
    onCancel,
  }: { category?: Category; onSave: (data: any) => void; onCancel: () => void }) {
    const [formData, setFormData] = useState({
      name: category?.name || "",
      description: category?.description || "",
    })
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      onSave(formData)
    }
  
    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name">Category Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>
        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">{category ? "Update" : "Create"} Category</Button>
        </div>
      </form>
    )
  }