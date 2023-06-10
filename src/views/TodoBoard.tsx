import AddTodo from '../components/AddTodo';
import TodoList from '../components/TodoList';

const TodoBoard: React.FC = () => {
  return (
    <div className='p-4 rounded shadow bg-white border border-gray-300'>
      <AddTodo />
      <TodoList />
    </div>
  );
};

export default TodoBoard;
