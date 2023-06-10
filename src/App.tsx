import { ScopeProvider } from 'jotai-molecules';

import { Board, BoardScope, useBoards } from './store/boards';

import TodoBoard from './views/TodoBoard';

import './App.css';

const App: React.FC = () => {
  const [boards] = useBoards();

  return (
    <div className='container gap-2 flex flex-col'>
      <div className='flex gap-4'>
        {boards.map(({ id }: Board) => (
          <ScopeProvider scope={BoardScope} value={id} key={id}>
            <TodoBoard />
          </ScopeProvider>
        ))}
      </div>
      <TodoBoard />
    </div>
  );
};

export default App;
