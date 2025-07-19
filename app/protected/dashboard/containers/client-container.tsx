"use client"
import type React from "react"

import { useState } from "react"
import { FolderOpen, FileText, CheckSquare } from "lucide-react"
import { Badge } from "@/components/ui/badge"

import { SidebarInset,SidebarTrigger } from "@/components/ui/sidebar"
import { QuickAddTask } from "@/components/quick-add-task"
import { Category, Project, Task } from "@/lib/types"

import { CategoryView } from "../_components/category-view"
import { ProjectView } from "../_components/project-view"
import { TaskView } from "../_components/task-view"
import { UnassignedTasks } from "../_components/unassigned-tasks"

export function ClientContainer({ categoriesProp, projectsProp, tasksProp }: { categoriesProp: Category[], projectsProp: Project[], tasksProp: Task[] }) {
           
        
       
          const [categories, setCategories] = useState<Category[]>(categoriesProp)
         
          const [projects, setProjects] = useState<Project[]>(projectsProp)
          const [tasks, setTasks] = useState<Task[]>(tasksProp)
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
              done: "secondary",
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
            <div>
              
              
                <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                 
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
                    <CategoryView categories={categories} activeView={activeView} handleSaveCategory={handleSaveCategory} handleDeleteCategory={handleDeleteCategory} />
                  )}
        
                  {/* Projects View */}
                  {activeView === "projects" && (
                    <ProjectView projects={projects} categories={categories} handleSaveProject={handleSaveProject} handleDeleteProject={handleDeleteProject} getStatusBadge={getStatusBadge} />
                  )}
        
                  {/* Tasks View */}
                  {activeView === "tasks" && (
                    <TaskView tasks={tasks} projects={projects} handleSaveTask={handleSaveTask} handleDeleteTask={handleDeleteTask} getStatusBadge={getStatusBadge} getPriorityBadge={getPriorityBadge} />
                  )}
        
                  {/* Unassigned Tasks Section */}
                  {activeView === "tasks" && (
                    <UnassignedTasks tasks={tasks} projects={projects} handleSaveTask={handleSaveTask} handleDeleteTask={handleDeleteTask} getStatusBadge={getStatusBadge} getPriorityBadge={getPriorityBadge} />
                  )}
                </div>
              
           </div>
          )
        }
        