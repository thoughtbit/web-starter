import { useCallback } from 'react';
import { Button, Form, Input } from 'antd';
import { shallow } from 'zustand/shallow';
import TodoForm from './components/TodoForm';
import Todos from './components/Todos';
import { useStore } from '@/store';
import type { StoreState } from '@/store/types';

const selector = (s: StoreState) => ({
  isEmptyTodoList: s.todos.length === 0,
  displayListSelector: s.todos.filter((item) => item.completed),
  removeAllTodos: s.removeAllTodos,
  loginByPassword: s.loginByPassword,
});

const Demo = () => {
  const { removeAllTodos, isEmptyTodoList, displayListSelector } = useStore(selector, shallow);

  const remove = useStore(useCallback((s: StoreState) => s.removeAllTodos, []));

  const loginByPassword = useStore((_: StoreState) => {
    return _.loginByPassword;
  });

  const [loginForm] = Form.useForm();

  return (
    <div>
      <button onClick={removeAllTodos}>Clear all</button>
      <button onClick={remove}>Clear all</button>
      <TodoForm />
      <Todos />

      {JSON.stringify(isEmptyTodoList)}
      <ul>
        {displayListSelector.map((item: any, index) => (
          <li key={item.id}>
            {item.id}-{item.title}
          </li>
        ))}
      </ul>

      <Form
        form={loginForm}
        autoComplete="off"
        onFinish={(field) => {
          const user = {
            ...field,
          };
          loginByPassword.run(user);
        }}
      >
        <Form.Item
          label="用户名"
          name="username"
          rules={[
            { required: true },
            {
              validator: async (_, value) => {
                if (!value) {
                  return Promise.reject();
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <Input placeholder="请输入用户名" />
        </Form.Item>

        <Form.Item noStyle>
          <Button loading={loginByPassword.loading} type={'primary'} htmlType={'submit'}>
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Demo;
