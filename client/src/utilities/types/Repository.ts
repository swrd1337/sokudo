import SimpleUser from './SimpleUser';

interface Repository {
  id: number;
  name: string;
  htmlUrl: string;
  visibility: string;
  description: string;
  fork: boolean;
  language: string;
  defaultBranch: string;
  owner: SimpleUser;
}

export default Repository;
