interface PullRequest {
  title: string;
  state: string;
  htmlUrl: string;
  user: {
    login: string;
    avatarUrl: string;
    htmlUrl: string;
  };
  createdAt: string;
  mergeCommitSha: string;
}

export default PullRequest;
