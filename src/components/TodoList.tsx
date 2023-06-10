import { useTodosMolecule, Todo } from '../store/todos';

const TodoList: React.FC = () => {
  const { useTodosValue, useSetToggleTodo, useSetRemoveTodo } =
    useTodosMolecule();

  const todos: Todo[] = useTodosValue();
  const toggleTodo: (id: string) => void = useSetToggleTodo();
  const deleteTodo: (id: string) => void = useSetRemoveTodo();

  return (
    <div className='flex flex-col overflow-y-auto h-64'>
      {todos.map((todo: Todo) => (
        <div key={todo.id} className='flex items-center mb-2'>
          <input
            type='checkbox'
            checked={todo.completed}
            onChange={() => toggleTodo(todo.id)}
            id={`checkbox-${todo.id}`}
            className='form-checkbox cursor-pointer h-5 w-5 text-blue-500 border-gray-300 rounded mr-2'
          />

          <label
            htmlFor={`checkbox-${todo.id}`}
            className={`flex-grow text-black text-left cursor-pointer ${
              todo.completed ? 'line-through' : ''
            }`}
          >
            {todo.task}
          </label>
          <div className='cursor-pointer' onClick={() => deleteTodo(todo.id)}>
            🗑
          </div>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
