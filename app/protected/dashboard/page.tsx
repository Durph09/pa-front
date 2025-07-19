import { Suspense } from "react";
import { ClientContainer } from "./containers/client-container"
import { getCategories } from "./lib/categories"
import { getUser } from "@/lib/get-user"
import { Category } from "@/lib/types"
import { getProjects } from "./lib/projects"
import { getTasks } from "./lib/tasks"
import { StatsOverview } from "./_components/stats-overview"

export default async function Page() {
  const user = await getUser();
  const [categories, projects, tasks] = await Promise.all([
    getCategories(user.id),
    getProjects(user.id),
    getTasks(user.id)
  ])
  console.log("categories",categories);
  console.log("projects",projects);
  console.log("tasks",tasks);
  
 

 

    return (
      <div className="space-y-6">
        <StatsOverview categories={categories} projects={projects} tasks={tasks} />
        <ClientContainer categoriesProp={categories} projectsProp={projects} tasksProp={tasks} />
     
    </div>
    )
}



