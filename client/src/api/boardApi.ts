import Board from '../utilities/types/Board';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

async function fetchUpdateBoard(
  boardId: number,
  board: Board,
  accessToken: string,
): Promise<Board> {
  const json = JSON.stringify(board, (_key, value) => (value instanceof Set ? [...value] : value));

  const response: Response = await fetch(`${apiBaseUrl}/boards/${boardId}`, {
    method: 'PUT',
    headers: {
      Authorization: `token ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: json,
  });
  return response.json();
}

// eslint-disable-next-line import/prefer-default-export
export { fetchUpdateBoard };
