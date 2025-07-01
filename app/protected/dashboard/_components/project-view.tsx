import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ProjectForm } from "@/components/_components/project-form";
import { Category, Project } from "@/lib/types";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function ProjectView({ projects, categories, handleSaveProject, handleDeleteProject, getStatusBadge }: { projects: Project[], categories: Category[], handleSaveProject: (data: any) => void, handleDeleteProject: (id: string) => void, getStatusBadge: (status: string) => React.ReactNode }){

    return (
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
                                {/* <TableCell>{getStatusBadge(project.status)}</TableCell> */}
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
    )
}