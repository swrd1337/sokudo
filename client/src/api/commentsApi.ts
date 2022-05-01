import Comment from '../utilities/types/Comment';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

async function fetchTaskComments(taskId: number, accessToken: string): Promise<Comment[]> {
  const response: Response = await fetch(`${apiBaseUrl}/comments/task/${taskId}`, {
    headers: {
      Authorization: `token ${accessToken}`,
    },
  });
  return response.json();
}

async function fetchSaveTaskComment(comment: Comment, accessToken: string): Promise<Comment> {
  const response: Response = await fetch(`${apiBaseUrl}/comments`, {
    method: 'POST',
    headers: {
      Authorization: `token ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(comment),
  });
  return response.json();
}

async function fetchDeleteTaskComment(commentId: number, accessToken: string) {
  await fetch(`${apiBaseUrl}/comments/${commentId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `token ${accessToken}`,
    },
  });
}

export { fetchTaskComments, fetchSaveTaskComment, fetchDeleteTaskComment };
