import { atom, useAtomValue, useSetAtom } from 'jotai';
import { molecule, useMolecule } from 'jotai-molecules';

import { BoardScope } from './boards';

export interface Todo {
  id: string;
  task: string;
  completed: boolean;
  boardId: string | null;
}

type TodoInput = Omit<Todo, 'boardId'>;

const todosAtom = atom<Todo[]>([]);

export const todosMolecule = molecule((_getMol, getScope) => {
  const boardId = getScope(BoardScope);

  const todosValueAtom = atom((get) => {
    const allTodos = get(todosAtom);

    if (boardId) return allTodos.filter((todo) => todo.boardId === boardId);
    return allTodos;
  });
  const useTodosValue = () => useAtomValue(todosValueAtom);

  const toggleTodoAtom = atom(null, (get, set, id: string) => {
    const existingTodos = get(todosAtom);
    const updatedTodos = existingTodos.map((todo) => {
      if (todo.id === id) return { ...todo, completed: !todo.completed };
      return todo;
    });

    set(todosAtom, updatedTodos);
  });
  const useSetToggleTodo = () => useSetAtom(toggleTodoAtom);

  const addTodoAtom = atom(null, (get, set, newTodo: TodoInput) => {
    const existingTodos = get(todosAtom);
    const updatedTodos = [
      ...existingTodos,
      { ...newTodo, boardId: boardId || null },
    ];

    set(todosAtom, updatedTodos);
  });
  const useSetAddTodo = () => useSetAtom(addTodoAtom);

  const removeTodoAtom = atom(null, (get, set, id: string) => {
    const existingTodos = get(todosAtom);
    const updatedTodos = existingTodos.filter((todo) => todo.id !== id);

    set(todosAtom, updatedTodos);
  });
  const useSetRemoveTodo = () => useSetAtom(removeTodoAtom);

  return {
    useTodosValue,
    useSetToggleTodo,
    useSetAddTodo,
    useSetRemoveTodo,
  };
});
export const useTodosMolecule = () => useMolecule(todosMolecule);
