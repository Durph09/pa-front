import { TaskForm } from "@/components/_components/task-form";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Task, Project } from "@/lib/types";

export function TaskView({ tasks, projects, handleSaveTask, handleDeleteTask, getStatusBadge, getPriorityBadge }: { tasks: Task[], projects: Project[], handleSaveTask: (data: any) => void, handleDeleteTask: (id: string) => void, getStatusBadge: (status: string) => React.ReactNode, getPriorityBadge: (priority: string) => React.ReactNode }){
    return (
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
                                <TableCell>{projects.find((project) => project.id === task.project_id)?.name}</TableCell>
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
    )
}