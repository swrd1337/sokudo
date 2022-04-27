import Repositories from '../utilities/Repositories';
import RepositoryData from '../utilities/RepositoryData';

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

  if (response.status === 404) {
    console.log("HUH")
    const data = await fetchCreateRepositoryData(owner, repo, accessToken);
    console.log(data)
  }

  return await response.json() as Promise<RepositoryData>;
}

export { fetchRepositoriesData, fetchRepositoryData, fetchCreateRepositoryData };
