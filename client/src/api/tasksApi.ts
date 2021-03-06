import Task from '../utilities/types/Task';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

async function fetchTasks(boardId: number, accessToken: string): Promise<Task[]> {
  const response: Response = await fetch(`${apiBaseUrl}/repositories/tasks/repo/${boardId}`, {
    headers: {
      Authorization: `token ${accessToken}`,
    },
  });
  return response.json();
}

async function fetchSaveTask(task: Task, accessToken: string): Promise<Task> {
  const response: Response = await fetch(`${apiBaseUrl}/repositories/tasks`, {
    method: 'POST',
    headers: {
      Authorization: `token ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });
  return response.json();
}

async function fetchUpdateTask(task: Task, accessToken: string): Promise<Task> {
  const response: Response = await fetch(`${apiBaseUrl}/repositories/tasks/${task.id}`, {
    method: 'PUT',
    headers: {
      Authorization: `token ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });
  return response.json();
}

async function fetchTask(taskId: number, accessToken: string): Promise<Task> {
  const response: Response = await fetch(`${apiBaseUrl}/repositories/tasks/${taskId}`, {
    headers: {
      Authorization: `token ${accessToken}`,
    },
  });
  return response.json();
}

async function fetchDeleteTask(taskId: number, accessToken: string) {
  await fetch(`${apiBaseUrl}/repositories/tasks/${taskId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `token ${accessToken}`,
    },
  });
}

export {
  fetchSaveTask,
  fetchTasks,
  fetchUpdateTask,
  fetchDeleteTask,
  fetchTask,
};
