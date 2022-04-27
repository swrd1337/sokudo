import Owner from './Owner';

interface Repository {
  id: number;
  name: string;
  htmlUrl: string;
  visibility: string;
  description: string;
  fork: boolean;
  language: string;
  defaultBranch: string;
  owner: Owner;
}

export default Repository;
