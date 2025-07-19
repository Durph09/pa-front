import { Task } from "@/lib/types";

const API_BASE_URL = process.env.API_URL;


export async function getTasks(userId: string, project_id=null, id=null): Promise<Task[]> {
const body:any ={}
    if(project_id){
        body.project_id = project_id
    }
    if(id){
        body.id = id
    }
    body.user_id = userId

  const options = {
    method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.API_KEY || '',
      },
      body: JSON.stringify(body)
  }
  

  try {
    const response = await fetch(`${API_BASE_URL}/task/get-task`, options);

    

    if (!response.ok) {
      if (response.status === 404) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Categories not found');
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
  
    return data.results || [];
  } catch (error) {
    console.error('Error fetching tasks', error);
    throw error;
  }
}

export async function addTask( 
    project_id: "string",
    title: "string",
    description: "string",
    status: "string",
    due_date: "string",
    user_id: "string",
    priority= 10): Promise<Task> {
  const body = {
    project_id,
    title,
    description,
    status,
    due_date,
    user_id,
    priority
  }
  const options = {
    method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.API_KEY || '',
      },
      body: JSON.stringify(body)
  }
  

  try {
    const response = await fetch(`${API_BASE_URL}/task/AddTask`, options);

    

    if (!response.ok) {
      if (response.status === 404) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Task not added');
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
  
    return data.results || [];
  } catch (error) {
    console.error('Error fetching tasks', error);
    throw error;
  }
}


