import { Category, Project } from "@/lib/types";

const API_BASE_URL = process.env.API_URL;


export async function getProjects(userId: string, category_id=null, id=null): Promise<Project[]> {
const body:any ={}
    if(category_id){
        body.category_id = category_id
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
    const response = await fetch(`${API_BASE_URL}/project/get-projects`, options);

    

    if (!response.ok) {
      if (response.status === 404) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Projects not found');
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
  
    return data.results || [];
  } catch (error) {
    console.error('Error fetching projects', error);
    throw error;
  }
}

export async function addProject( 
    category_id: "string",
    name: "string",
    description: "string",
    status: "string",
    user_id: "string",
    priority= 10): Promise<Project> {
  const body = {
   category_id,
   name,
   description,
   status,
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
    const response = await fetch(`${API_BASE_URL}/project/AddProject`, options);

    

    if (!response.ok) {
      if (response.status === 404) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Project not added');
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
  
    return data.results || [];
  } catch (error) {
    console.error('Error fetching projects', error);
    throw error;
  }
}