export interface Category {
    id: string
    name: string
    description: string
    created_at: string
    user_id: string
  }
  export enum ProjectStatus {
   open = "open",
   closed = "closed",
   on_hold = "on_hold",
   in_progress = "in_progress"
  }
 export  interface Project {
    id: string
    name: string
    description: string
    category_id: string
    priority: number
    created_at: string
    user_id: string
  }
  
  export interface Task {
   id: string
   project_id: string
   title: string
   status: Status
   due_date: string
   created_at: string
   priority: Priority
   user_id: string
   updated_at: string
   description: string
   
  }
  export enum Status {
    TODO = "todo",
    IN_PROGRESS = "in_progress",
    DONE = "done", 
    ACTIVE = "active",
    ON_HOLD = "on_hold"
  }

  // set enum for priority of high, medium, low
  export enum Priority {
    HIGH = "high",
    MEDIUM = "medium",
    LOW = "low"
  }