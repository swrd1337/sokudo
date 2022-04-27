import Repositories from '../utilities/types/Repositories';
import RepositoryData from '../utilities/types/RepositoryData';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

async function fetchRepositoriesData(accessToken: string) {
  const response: Response = await fetch(`${apiBaseUrl}/api/repositories`, {
    headers: {
      Authorization: `token ${accessToken}`,
    },
  });
  return await response.json() as Promise<Repositories>;
}

async function fetchCreateRepositoryData(owner: string, repo: string, accessToken: string) {
  const response: Response = await fetch(`${apiBaseUrl}/api/repositories/${owner}/${repo}/data`, {
    method: 'POST',
    headers: {
      Authorization: `token ${accessToken}`,
    },
  });
  return await response.json() as Promise<RepositoryData>;
}

async function fetchRepositoryData(owner: string, repo: string, accessToken: string) {
  const response: Response = await fetch(`${apiBaseUrl}/api/repositories/${owner}/${repo}/data`, {
    headers: {
      Authorization: `token ${accessToken}`,
    },
  });

  if (response.status === 204) {
    return undefined;
  }

  return await response.json() as Promise<RepositoryData>;
}

async function fetchUpdateRepositoryData(data: RepositoryData, accessToken: string) {
  const json = JSON.stringify(data, (_key, value) => (value instanceof Set ? [...value] : value));

  const response: Response = await fetch(`${apiBaseUrl}/api/repositories/${data.id}/data/`, {
    method: 'PUT',
    headers: {
      Authorization: `token ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: json,
  });
  return await response.json() as Promise<RepositoryData>;
}

export {
  fetchRepositoriesData,
  fetchRepositoryData,
  fetchCreateRepositoryData,
  fetchUpdateRepositoryData,
};
