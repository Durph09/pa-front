"use client"

import type React from "react"

import { useState } from "react"
import { Plus, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface QuickTaskData {
  title: string
  description: string
  status: "todo" | "in_progress" | "completed"
  priority: "low" | "medium" | "high"
  due_date?: string
}

interface QuickAddTaskProps {
  onSave: (data: QuickTaskData) => void
  trigger?: "button" | "fab" | "popover"
  className?: string
}

export function QuickAddTask({ onSave, trigger = "button", className }: QuickAddTaskProps) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState<QuickTaskData>({
    title: "",
    description: "",
    status: "todo",
    priority: "medium",
    due_date: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title.trim()) return

    onSave(formData)
    setFormData({
      title: "",
      description: "",
      status: "todo",
      priority: "medium",
      due_date: "",
    })
    setOpen(false)
  }

  const handleReset = () => {
    setFormData({
      title: "",
      description: "",
      status: "todo",
      priority: "medium",
      due_date: "",
    })
  }

  const QuickForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="quick-title">Task Title *</Label>
        <Input
          id="quick-title"
          placeholder="What needs to be done?"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
          autoFocus
        />
      </div>

      <div>
        <Label htmlFor="quick-description">Description (optional)</Label>
        <Textarea
          id="quick-description"
          placeholder="Add more details..."
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={2}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="quick-priority">Priority</Label>
          <Select
            value={formData.priority}
            onValueChange={(value) => setFormData({ ...formData, priority: value as QuickTaskData["priority"] })}
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

        <div>
          <Label htmlFor="quick-status">Status</Label>
          <Select
            value={formData.status}
            onValueChange={(value) => setFormData({ ...formData, status: value as QuickTaskData["status"] })}
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
      </div>

      <div>
        <Label htmlFor="quick-due-date">Due Date (optional)</Label>
        <Input
          id="quick-due-date"
          type="date"
          value={formData.due_date}
          onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
        />
      </div>

      <div className="bg-muted/50 p-3 rounded-lg">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Zap className="h-4 w-4" />
          <span>This task will be unassigned. You can assign it to a project later.</span>
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            handleReset()
            setOpen(false)
          }}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={!formData.title.trim()}>
          <Plus className="mr-2 h-4 w-4" />
          Add Task
        </Button>
      </div>
    </form>
  )

  // Floating Action Button style
  if (trigger === "fab") {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            size="lg"
            className={`fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-shadow z-50 ${className}`}
          >
            <Plus className="h-6 w-6" />
            <span className="sr-only">Quick add task</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Quick Add Task
            </DialogTitle>
            <DialogDescription>Quickly capture a task. You can assign it to a project later.</DialogDescription>
          </DialogHeader>
          <QuickForm />
        </DialogContent>
      </Dialog>
    )
  }

  // Popover style (compact)
  if (trigger === "popover") {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className={className}>
            <Zap className="mr-2 h-4 w-4" />
            Quick Add
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80" align="end">
          <div className="space-y-2">
            <h4 className="font-medium leading-none flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Quick Add Task
            </h4>
            <p className="text-sm text-muted-foreground">Capture a task quickly without assignment.</p>
          </div>
          <div className="mt-4">
            <QuickForm />
          </div>
        </PopoverContent>
      </Popover>
    )
  }

  // Default button style
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className={className}>
          <Zap className="mr-2 h-4 w-4" />
          Quick Add Task
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Quick Add Task
          </DialogTitle>
          <DialogDescription>Quickly capture a task. You can assign it to a project later.</DialogDescription>
        </DialogHeader>
        <QuickForm />
      </DialogContent>
    </Dialog>
  )
}
