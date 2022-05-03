import Board from './Board';

interface RepositoryData {
  id: number;
  name: string;
  ownerName: string;
  repoName: string;
  defaultBranch: string;
  visibility: string;
  boards: Board[];
}

export default RepositoryData;
