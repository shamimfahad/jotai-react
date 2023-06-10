import './App.css';
import TodoBoard from './views/TodoBoard';

function App() {
  return (
    <div className='flex gap-4'>
      <TodoBoard />
      <TodoBoard />
    </div>
  );
}

export default App;
