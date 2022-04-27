interface RepositoryData {
  id: number;
  ownerName: string;
  repoName: string;
  defaultBranch: string;
  visibility: string;
  boardColumns: Set<string>;
  doneColumnName: string;
}

export default RepositoryData;
