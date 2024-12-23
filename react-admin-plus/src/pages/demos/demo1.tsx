import React from 'react';
import Counter from './components/Counter';
import { LoginForm } from './components/LoginForm';

const Demo1 = () => {
  return (
    <div>
      <Counter />
      <LoginForm formData={
        {
          username: 'luo',
          password: 'ss',
        }
      }
        onSubmit={onSubmit}
      />
    </div>
  );
};

const onSubmit = async (data: any) => {
  console.log('onSubmit:', data);
};

export default Demo1;
