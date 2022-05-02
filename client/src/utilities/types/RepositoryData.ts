interface RepositoryData {
  id: number;
  name: string;
  ownerName: string;
  repoName: string;
  defaultBranch: string;
  visibility: string;
  boardColumns: Set<string>;
  doneColumnName: string;
}

export default RepositoryData;
