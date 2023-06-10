import { useBoardMolecule } from '../store/boards';

import AddTodo from '../components/AddTodo';
import TodoList from '../components/TodoList';

const TodoBoard: React.FC = () => {
  const { useBoard } = useBoardMolecule();
  const [board] = useBoard();

  return (
    <div className='p-4 rounded shadow bg-white border border-gray-300'>
      <h1 className='text-2xl font-bold text-black mb-4'>
        {board ? board.label : 'Global'}
      </h1>
      <AddTodo />
      <TodoList />
    </div>
  );
};

export default TodoBoard;
