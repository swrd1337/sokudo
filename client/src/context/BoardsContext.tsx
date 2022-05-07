import React from 'react';
import Board from '../utilities/types/Board';

interface BoardsContextInterface {
  boardIndex: number,
  boards: Board[],
  repoId: number,
  setBoardIndex(_index: number): void,
  addBoard(_board: Board): void,
  deleteBoard(): void,
}

const contextDefaultValue: BoardsContextInterface = {
  boardIndex: 0,
  boards: [],
  repoId: 0,
  setBoardIndex: () => {},
  addBoard: () => {},
  deleteBoard: () => {},
};

const BoardsContext = React.createContext<BoardsContextInterface>(contextDefaultValue);

export default BoardsContext;
