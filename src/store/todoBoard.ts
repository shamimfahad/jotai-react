import { atom, useAtomValue, useSetAtom } from 'jotai';

export interface Todo {
  id: string;
  task: string;
  completed: boolean;
}

const todosAtom = atom<Todo[]>([]);
// i follow the naming convention of the main utitlity hook, so it's easy for other devs to understand what they'll be working with
// useAtomValue only returns the value rather than the default array
export const useTodosValue = () => useAtomValue(todosAtom);

// this is a write only atom, that we can use to modify other atoms
const toggleTodoAtom = atom(null, (get, set, id: string) => {
  const existingTodos = get(todosAtom);
  const updatedTodos = existingTodos.map((todo) => {
    if (todo.id === id) return { ...todo, completed: !todo.completed };
    return todo;
  });

  set(todosAtom, updatedTodos);
});
// useSetAtom only returns the function to update the atom
export const useSetToggleTodo = () => useSetAtom(toggleTodoAtom);

const addTodoAtom = atom(null, (get, set, newTodo: Todo) => {
  const existingTodos = get(todosAtom);
  const updatedTodos = [...existingTodos, newTodo];

  set(todosAtom, updatedTodos);
});
export const useSetAddTodo = () => useSetAtom(addTodoAtom);

const removeTodoAtom = atom(null, (get, set, id: string) => {
  const existingTodos = get(todosAtom);
  const updatedTodos = existingTodos.filter((todo) => todo.id !== id);

  set(todosAtom, updatedTodos);
});
export const useSetRemoveTodo = () => useSetAtom(removeTodoAtom);
