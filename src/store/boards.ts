import { atom, useAtom } from 'jotai';
import { createScope, molecule, useMolecule } from 'jotai-molecules';

import { genUniqueId } from '../utils';

export interface Board {
  id: string;
  label: string;
}

const initialBoardsValue: Board[] = Array.from({ length: 3 }, (_, i) => ({
  id: genUniqueId(),
  label: String(i + 1),
}));

export const BoardScope = createScope<string | undefined>(undefined);
export const boardMolecule = molecule((_getMol, getScope) => {
  const boardId = getScope(BoardScope);

  const boardAtom = atom(
    (get) => {
      const boards = get(boardsAtom);

      return boards.find((board) => board.id === boardId);
    },
    (get, set, newValue: Board) => {
      const boards = get(boardsAtom);
      const updatedBoards = boards.map((board) =>
        board.id === boardId ? newValue : board
      );

      set(boardsAtom, updatedBoards);
    }
  );
  const useBoard = () => useAtom(boardAtom);
  return {
    useBoard,
  };
});
export const useBoardMolecule = () => useMolecule(boardMolecule);

export const boardsAtom = atom<Board[]>(initialBoardsValue);
export const useBoards = () => useAtom(boardsAtom);
