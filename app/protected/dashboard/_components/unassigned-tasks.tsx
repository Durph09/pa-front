import { TaskForm } from "@/components/_components/task-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Task, Project } from "@/lib/types";
import { Edit, Trash2, Zap } from "lucide-react";

export function UnassignedTasks({ tasks, projects, handleSaveTask, handleDeleteTask, getStatusBadge, getPriorityBadge }: { tasks: Task[], projects: Project[], handleSaveTask: (data: any) => void, handleDeleteTask: (id: string) => void, getStatusBadge: (status: string) => React.ReactNode, getPriorityBadge: (priority: string) => React.ReactNode }){
    return (
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
        
    )
}