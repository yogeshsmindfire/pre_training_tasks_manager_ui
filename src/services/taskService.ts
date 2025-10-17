import axios from 'axios';

export const fetchTasks = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/tasks', {
      withCredentials: true,
    });
    return { status: response.status, data: response.data };
  } catch (error) {
    console.error(error);
    return { status: 500, data: error };
  }
};

export const updateTask = async (
  id: string,
  title: string,
  description: string,
  dueDate: string,
  completed: boolean
) => {
  try {
    const result = await axios.post(
      `http://localhost:8000/api/tasks/${id}`,
      {
        title,
        description,
        dueDate,
        completed,
      },
      {
        withCredentials: true,
      }
    );
    return { status: result.status, data: result.data };
  } catch (error) {
    console.error(error);
    throw new Error('Failed to update task');
  }
};

export const deleteTask = async (id: string) => {
  try {
    const result = await axios.delete(`http://localhost:8000/api/tasks/${id}`, {
      withCredentials: true,
    });
    return { status: result.status, data: result.data };
  } catch (error) {
    console.error(error);
    throw new Error('Failed to delete task');
  }
};
