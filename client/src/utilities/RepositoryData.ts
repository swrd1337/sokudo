interface RepositoryData {
  id: number;
  ownerName: string;
  repoName: string;
  defaultBranch: string;
  visibility: string;
  boardColumns: Set<string>;
  doneColumnIndex: number;
}

export default RepositoryData;
