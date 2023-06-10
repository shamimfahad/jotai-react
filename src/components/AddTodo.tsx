import { useState } from 'react';

import { genUniqueId } from '../utils';

import { useTodosMolecule } from '../store/todos';

const AddTodo: React.FC = () => {
  const { useSetAddTodo } = useTodosMolecule();
  const addTodo = useSetAddTodo();

  const [inputValue, setInputValue] = useState('');

  const handleAddTodo = () => {
    if (inputValue.trim() !== '') {
      addTodo({ id: genUniqueId(), task: inputValue.trim(), completed: false });
    }
    setInputValue('');
  };

  return (
    <div className='flex mb-4'>
      <input
        type='text'
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            handleAddTodo();
          }
        }}
        className='cursor-text border border-gray-300 rounded px-4 py-2 w-full'
        placeholder='Enter a new todo'
      />
    </div>
  );
};

export default AddTodo;
