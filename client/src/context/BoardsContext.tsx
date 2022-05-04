import React from 'react';
import Board from '../utilities/types/Board';
import RepositoryData from '../utilities/types/RepositoryData';

interface BoardsContextInterface {
  boardIndex: number,
  repoData: RepositoryData | undefined,
  setBoardIndex(_index: number): void,
  addBoard(_board: Board): void,
}

const contextDefaultValue: BoardsContextInterface = {
  boardIndex: 0,
  repoData: undefined,
  setBoardIndex: () => {},
  addBoard: () => {},
};

const BoardsContext = React.createContext<BoardsContextInterface>(contextDefaultValue);

export default BoardsContext;
