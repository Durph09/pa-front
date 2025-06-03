"use client"

import type React from "react"

import { useState } from "react"
import { Plus, Edit, Trash2, FolderOpen, FileText, CheckSquare, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { SidebarInset } from "@/components/ui/sidebar"
import { QuickAddTask } from "@/components/quick-add-task"

// Types for our data structure
interface Category {
  id: string
  name: string
  description: string
  created_at: string
  project_count?: number
}

interface Project {
  id: string
  name: string
  description: string
  category_id: string
  category_name?: string
  status: "active" | "completed" | "on_hold"
  created_at: string
  task_count?: number
}

interface Task {
  id: string
  title: string
  description: string
  project_id: string
  project_name?: string
  status: "todo" | "in_progress" | "completed"
  priority: "low" | "medium" | "high"
  created_at: string
  due_date?: string
}

// Sample data - replace with actual Supabase queries
const sampleCategories: Category[] = [
  {
    id: "1",
    name: "Web Development",
    description: "All web-related projects",
    created_at: "2024-01-15",
    project_count: 3,
  },
  {
    id: "2",
    name: "Mobile Apps",
    description: "Mobile application projects",
    created_at: "2024-01-20",
    project_count: 2,
  },
  {
    id: "3",
    name: "Design",
    description: "UI/UX and graphic design projects",
    created_at: "2024-01-25",
    project_count: 1,
  },
]

const sampleProjects: Project[] = [
  {
    id: "1",
    name: "E-commerce Platform",
    description: "Online shopping website",
    category_id: "1",
    category_name: "Web Development",
    status: "active",
    created_at: "2024-01-16",
    task_count: 5,
  },
  {
    id: "2",
    name: "Portfolio Website",
    description: "Personal portfolio site",
    category_id: "1",
    category_name: "Web Development",
    status: "completed",
    created_at: "2024-01-18",
    task_count: 3,
  },
  {
    id: "3",
    name: "Task Manager App",
    description: "Mobile task management application",
    category_id: "2",
    category_name: "Mobile Apps",
    status: "in_progress",
    created_at: "2024-01-22",
    task_count: 8,
  },
]

const sampleTasks: Task[] = [
  {
    id: "1",
    title: "Setup database schema",
    description: "Create tables for products and users",
    project_id: "1",
    project_name: "E-commerce Platform",
    status: "completed",
    priority: "high",
    created_at: "2024-01-17",
  },
  {
    id: "2",
    title: "Design product catalog",
    description: "Create UI for product listing page",
    project_id: "1",
    project_name: "E-commerce Platform",
    status: "in_progress",
    priority: "medium",
    created_at: "2024-01-18",
  },
  {
    id: "3",
    title: "Implement user authentication",
    description: "Add login and registration functionality",
    project_id: "3",
    project_name: "Task Manager App",
    status: "todo",
    priority: "high",
    created_at: "2024-01-23",
  },
]

function AppSidebar() {
  const menuItems = [
    { title: "Categories", icon: FolderOpen, id: "categories" },
    { title: "Projects", icon: FileText, id: "projects" },
    { title: "Tasks", icon: CheckSquare, id: "tasks" },
  ]

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton>
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

function CategoryForm({
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

function ProjectForm({
  project,
  categories,
  onSave,
  onCancel,
}: { project?: Project; categories: Category[]; onSave: (data: any) => void; onCancel: () => void }) {
  const [formData, setFormData] = useState({
    name: project?.name || "",
    description: project?.description || "",
    category_id: project?.category_id || "",
    status: project?.status || "active",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Project Name</Label>
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
      <div>
        <Label htmlFor="category">Category</Label>
        <Select
          value={formData.category_id}
          onValueChange={(value) => setFormData({ ...formData, category_id: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="status">Status</Label>
        <Select
          value={formData.status}
          onValueChange={(value) => setFormData({ ...formData, status: value as Project["status"] })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="on_hold">On Hold</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">{project ? "Update" : "Create"} Project</Button>
      </div>
    </form>
  )
}

function TaskForm({
  task,
  projects,
  onSave,
  onCancel,
}: { task?: Task; projects: Project[]; onSave: (data: any) => void; onCancel: () => void }) {
  const [formData, setFormData] = useState({
    title: task?.title || "",
    description: task?.description || "",
    project_id: task?.project_id || "",
    status: task?.status || "todo",
    priority: task?.priority || "medium",
    due_date: task?.due_date || "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Task Title</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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
      <div>
        <Label htmlFor="project">Project</Label>
        <Select value={formData.project_id} onValueChange={(value) => setFormData({ ...formData, project_id: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select a project" />
          </SelectTrigger>
          <SelectContent>
            {projects.map((project) => (
              <SelectItem key={project.id} value={project.id}>
                {project.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="status">Status</Label>
          <Select
            value={formData.status}
            onValueChange={(value) => setFormData({ ...formData, status: value as Task["status"] })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todo">To Do</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="priority">Priority</Label>
          <Select
            value={formData.priority}
            onValueChange={(value) => setFormData({ ...formData, priority: value as Task["priority"] })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div>
        <Label htmlFor="due_date">Due Date</Label>
        <Input
          id="due_date"
          type="date"
          value={formData.due_date}
          onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
        />
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">{task ? "Update" : "Create"} Task</Button>
      </div>
    </form>
  )
}

export default function Page() {
  const [categories, setCategories] = useState<Category[]>(sampleCategories)
  const [projects, setProjects] = useState<Project[]>(sampleProjects)
  const [tasks, setTasks] = useState<Task[]>(sampleTasks)
  const [activeView, setActiveView] = useState<"categories" | "projects" | "tasks">("categories")

  // CRUD handlers - replace with actual Supabase operations
  const handleSaveCategory = (data: any) => {
    console.log("Save category:", data)
    // Add Supabase insert/update logic here
  }

  const handleDeleteCategory = (id: string) => {
    console.log("Delete category:", id)
    // Add Supabase delete logic here
  }

  const handleSaveProject = (data: any) => {
    console.log("Save project:", data)
    // Add Supabase insert/update logic here
  }

  const handleDeleteProject = (id: string) => {
    console.log("Delete project:", id)
    // Add Supabase delete logic here
  }

  const handleSaveTask = (data: any) => {
    console.log("Save task:", data)
    // Add Supabase insert/update logic here
  }

  const handleDeleteTask = (id: string) => {
    console.log("Delete task:", id)
    // Add Supabase delete logic here
  }

  const handleQuickAddTask = (data: any) => {
    console.log("Quick add task:", data)
    // Add Supabase insert logic here for unassigned tasks
    // You might want to set project_id to null or create a special "unassigned" project
  }

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      active: "default",
      completed: "secondary",
      on_hold: "outline",
      todo: "outline",
      in_progress: "default",
    }
    return <Badge variant={variants[status] || "default"}>{status.replace("_", " ")}</Badge>
  }

  const getPriorityBadge = (priority: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive"> = {
      low: "secondary",
      medium: "default",
      high: "destructive",
    }
    return <Badge variant={variants[priority] || "default"}>{priority}</Badge>
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <div className="flex items-center justify-between w-full">
            <h1 className="text-lg font-semibold">Project Management Dashboard</h1>
            <div className="flex items-center gap-2">
              <QuickAddTask onSave={handleQuickAddTask} trigger="popover" />
              <QuickAddTask onSave={handleQuickAddTask} trigger="fab" />
            </div>
          </div>
        </header>

        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
          {/* Navigation Tabs */}
          <div className="flex space-x-1 rounded-lg bg-muted p-1">
            {[
              { id: "categories", label: "Categories", icon: FolderOpen },
              { id: "projects", label: "Projects", icon: FileText },
              { id: "tasks", label: "Tasks", icon: CheckSquare },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveView(tab.id as any)}
                className={`flex items-center space-x-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  activeView === tab.id
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Categories View */}
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

          {/* Projects View */}
          {activeView === "projects" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold tracking-tight">Projects</h2>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Project
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create New Project</DialogTitle>
                      <DialogDescription>Add a new project to a category.</DialogDescription>
                    </DialogHeader>
                    <ProjectForm categories={categories} onSave={handleSaveProject} onCancel={() => {}} />
                  </DialogContent>
                </Dialog>
              </div>

              <Card>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Tasks</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {projects.map((project) => (
                      <TableRow key={project.id}>
                        <TableCell className="font-medium">
                          <div>
                            <div>{project.name}</div>
                            <div className="text-sm text-muted-foreground">{project.description}</div>
                          </div>
                        </TableCell>
                        <TableCell>{project.category_name}</TableCell>
                        <TableCell>{getStatusBadge(project.status)}</TableCell>
                        <TableCell>{project.task_count || 0}</TableCell>
                        <TableCell>{new Date(project.created_at).toLocaleDateString()}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-1">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Edit Project</DialogTitle>
                                </DialogHeader>
                                <ProjectForm
                                  project={project}
                                  categories={categories}
                                  onSave={handleSaveProject}
                                  onCancel={() => {}}
                                />
                              </DialogContent>
                            </Dialog>
                            <Button variant="ghost" size="sm" onClick={() => handleDeleteProject(project.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </div>
          )}

          {/* Tasks View */}
          {activeView === "tasks" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold tracking-tight">Tasks</h2>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Task
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create New Task</DialogTitle>
                      <DialogDescription>Add a new task to a project.</DialogDescription>
                    </DialogHeader>
                    <TaskForm projects={projects} onSave={handleSaveTask} onCancel={() => {}} />
                  </DialogContent>
                </Dialog>
              </div>

              <Card>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Project</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tasks.map((task) => (
                      <TableRow key={task.id}>
                        <TableCell className="font-medium">
                          <div>
                            <div>{task.title}</div>
                            <div className="text-sm text-muted-foreground">{task.description}</div>
                          </div>
                        </TableCell>
                        <TableCell>{task.project_name}</TableCell>
                        <TableCell>{getStatusBadge(task.status)}</TableCell>
                        <TableCell>{getPriorityBadge(task.priority)}</TableCell>
                        <TableCell>{new Date(task.created_at).toLocaleDateString()}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-1">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Edit Task</DialogTitle>
                                </DialogHeader>
                                <TaskForm task={task} projects={projects} onSave={handleSaveTask} onCancel={() => {}} />
                              </DialogContent>
                            </Dialog>
                            <Button variant="ghost" size="sm" onClick={() => handleDeleteTask(task.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </div>
          )}

          {/* Unassigned Tasks Section */}
          {activeView === "tasks" && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Unassigned Tasks
                <Badge variant="secondary">{tasks.filter((task) => !task.project_id).length}</Badge>
              </h3>
              <Card>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tasks
                      .filter((task) => !task.project_id)
                      .map((task) => (
                        <TableRow key={task.id}>
                          <TableCell className="font-medium">
                            <div>
                              <div>{task.title}</div>
                              <div className="text-sm text-muted-foreground">{task.description}</div>
                            </div>
                          </TableCell>
                          <TableCell>{getStatusBadge(task.status)}</TableCell>
                          <TableCell>{getPriorityBadge(task.priority)}</TableCell>
                          <TableCell>{new Date(task.created_at).toLocaleDateString()}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end space-x-1">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Edit Task</DialogTitle>
                                  </DialogHeader>
                                  <TaskForm
                                    task={task}
                                    projects={projects}
                                    onSave={handleSaveTask}
                                    onCancel={() => {}}
                                  />
                                </DialogContent>
                              </Dialog>
                              <Button variant="ghost" size="sm" onClick={() => handleDeleteTask(task.id)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    {tasks.filter((task) => !task.project_id).length === 0 && (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                          No unassigned tasks. Use the quick add button to capture tasks quickly!
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </Card>
            </div>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
