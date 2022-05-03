interface Board {
  id: number;
  name: string;
  boardColumns: Set<string>;
  doneColumnName: string;
}

export default Board;
