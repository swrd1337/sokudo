import Task from '../utilities/types/Task';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

async function fetchRepositoryTasks(repoDataId: number, accessToken: string): Promise<Task[]> {
  const response: Response = await fetch(`${apiBaseUrl}/repositories/tasks/${repoDataId}`, {
    headers: {
      Authorization: `token ${accessToken}`,
    },
  });
  return response.json();
}

async function fetchSaveRepositoryTask(task: Task, accessToken: string): Promise<Task> {
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

async function fetchUpdateRepositoryTask(task: Task, accessToken: string): Promise<Task> {
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

async function fetchDeleteRepositoryTask(taskId: number, accessToken: string) {
  await fetch(`${apiBaseUrl}/repositories/tasks/${taskId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `token ${accessToken}`,
    },
  });
}

export {
  fetchSaveRepositoryTask,
  fetchRepositoryTasks,
  fetchUpdateRepositoryTask,
  fetchDeleteRepositoryTask,
};
