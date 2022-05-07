import Repositories from '../utilities/types/Repositories';
import RepositoryData from '../utilities/types/RepositoryData';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

async function fetchRepositoriesData(
  page: number, perPage: number, accessToken: string): Promise<Repositories> {
  const response: Response = await fetch(`${apiBaseUrl}/repositories?page=${page}&perPage=${perPage}`, {
    headers: {
      Authorization: `token ${accessToken}`,
    },
  });
  return response.json();
}

async function fetchCreateRepositoryData(
  owner: string,
  repo: string,
  accessToken: string,
): Promise<RepositoryData> {
  const response: Response = await fetch(
    `${apiBaseUrl}/repositories/${owner}/${repo}/data`,
    {
      method: 'POST',
      headers: {
        Authorization: `token ${accessToken}`,
      },
    },
  );
  return response.json();
}

async function fetchRepositoryData(
  owner: string,
  repo: string,
  accessToken: string,
): Promise<RepositoryData | undefined > {
  const response: Response = await fetch(
    `${apiBaseUrl}/repositories/${owner}/${repo}/data`,
    {
      headers: {
        Authorization: `token ${accessToken}`,
      },
    },
  );

  if (response.status === 204) {
    return Promise.resolve(undefined);
  }

  return response.json();
}

export {
  fetchRepositoriesData,
  fetchRepositoryData,
  fetchCreateRepositoryData,
};
