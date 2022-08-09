import { dispatch, useStoreState } from "../store";

const setUsername = (event: React.FormEvent<HTMLInputElement>) =>
  dispatch({
    username: event.currentTarget.value,
    type: "setUsername",
  });

const setAge = (event: React.FormEvent<HTMLInputElement>) =>
  dispatch({
    age: Number(event.currentTarget.value) || 0,
    type: "setAge",
  });

const User = () => {
  const value = useStoreState("user");
  return (
    <div>
      <div>
        用户名:
        <input value={value.username} type="input" onChange={setUsername} />
      </div>
      <div>
        年龄:
        <input value={value.age} type="input" onChange={setAge} />
      </div>
    </div>
  );
};

export default User;
