import Markdown from '../utilities/types/Markdown';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

async function fetchMarkdowns(repoId: number, accessToken: string): Promise<Markdown[]> {
  const response: Response = await fetch(`${apiBaseUrl}/markdown/${repoId}`, {
    headers: {
      Authorization: `token ${accessToken}`,
    },
  });
  return response.json();
}

async function fetchSaveMarkdown(md: Markdown, accessToken: string): Promise<Markdown> {
  const response: Response = await fetch(`${apiBaseUrl}/markdown`, {
    method: 'POST',
    headers: {
      Authorization: `token ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(md),
  });
  return response.json();
}

async function fetchUpdateMarkdown(mdId: number, md: Markdown, accessToken: string)
: Promise<Markdown> {
  const response: Response = await fetch(`${apiBaseUrl}/markdown/${mdId}`, {
    method: 'PUT',
    headers: {
      Authorization: `token ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(md),
  });
  return response.json();
}

async function fetchDeleteMarkdown(mdId: number, accessToken: string) {
  await fetch(`${apiBaseUrl}/markdown/${mdId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `token ${accessToken}`,
    },
  });
}

export {
  fetchMarkdowns,
  fetchSaveMarkdown,
  fetchUpdateMarkdown,
  fetchDeleteMarkdown,
};
