import SimpleUser from './SimpleUser';

interface PullRequest {
  title: string;
  state: string;
  htmlUrl: string;
  user: SimpleUser;
  createdAt: string;
  mergeCommitSha: string;
  body: string;
}

export default PullRequest;
