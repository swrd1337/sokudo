import Repositories from '../utilities/types/Repositories';
import RepositoryData from '../utilities/types/RepositoryData';
import CodeScanningAlert from '../utilities/types/security/CodeScanningAlert';
import DependabotResult from '../utilities/types/security/DependabotResult';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

async function fetchRepositoriesData(page: number, perPage: number, accessToken: string)
: Promise<Repositories> {
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

async function fetchCodeScanningAlerts(
  owner: string,
  repo: string,
  accessToken: string,
): Promise<CodeScanningAlert[]> {
  const response: Response = await fetch(
    `${apiBaseUrl}/repositories/${owner}/${repo}/code/scanning`,
    {
      headers: {
        Authorization: `token ${accessToken}`,
      },
    },
  );

  if (response.status === 204) {
    throw new Error('No code scanning alerts found. Make sure you have code scanning enabled!');
  }

  return response.json();
}

async function fetchDependabotAlerts(
  owner: string,
  repo: string,
  count: number,
  accessToken: string,
): Promise<DependabotResult> {
  const response: Response = await fetch(
    `${apiBaseUrl}/repositories/${owner}/${repo}/dependabot?count=${count}`,
    {
      headers: {
        Authorization: `token ${accessToken}`,
      },
    },
  );

  return response.json();
}

export {
  fetchRepositoriesData,
  fetchRepositoryData,
  fetchCreateRepositoryData,
  fetchCodeScanningAlerts,
  fetchDependabotAlerts,
};
