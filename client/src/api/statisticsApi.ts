import CommitsStatistics from '../utilities/types/statistics/CommitsStatistics';
import ProjectStatistics from '../utilities/types/statistics/ProjectStatistics';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

async function fetchCommitsStatistics(
  owner: string,
  repo: string,
  accessToken: string,
): Promise<CommitsStatistics> {
  const response: Response = await fetch(
    `${apiBaseUrl}/statistics/${owner}/${repo}/commits`,
    {
      headers: {
        Authorization: `token ${accessToken}`,
      },
    },
  );

  return response.json();
}

async function fetchProjectStatistics(
  owner: string,
  repo: string,
  accessToken: string,
): Promise<ProjectStatistics> {
  const response: Response = await fetch(
    `${apiBaseUrl}/statistics/${owner}/${repo}/general`,
    {
      headers: {
        Authorization: `token ${accessToken}`,
      },
    },
  );

  return response.json();
}

export {
  fetchCommitsStatistics,
  fetchProjectStatistics,
};
