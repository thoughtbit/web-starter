import { useState } from 'react';
import { useStore } from '@/store';

const Form = () => {
  const addTodo = useStore((state) => state.addTodo);

  const [inputValue, setInputValue] = useState('');

  const onChange = (e: any) => {
    setInputValue(e.target.value);
  };

  const onSubmit = (e: any) => {
    e.preventDefault();

    if (!inputValue) return;

    const todo = {
      id: Math.floor(Math.random() * 100) + 1,
      title: inputValue,
    };

    addTodo(todo);
    setInputValue('');
  };

  return (
    <form onSubmit={onSubmit}>
      <input value={inputValue} onChange={onChange} />
    </form>
  );
};

export default Form;