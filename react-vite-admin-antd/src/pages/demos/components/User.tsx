import { setUserUsername, setUserAge, useGlobalState } from "../state";

const User = () => {
  const [value /*setValue*/] = useGlobalState("user");
  return (
    <div>
      <div>
        用户名:
        <input
          value={value.username}
          onChange={(event) => {
            const username = event.target.value;
            // setValue((p) => ({ ...p, username }));
            setUserUsername(username);
          }}
        />
      </div>
      <div>
        年龄:
        <input
          value={value.age}
          onChange={(event) => {
            const age = Number(event.target.value) || 0;
            // setValue((p) => ({ ...p, age }));
            setUserAge(age);
          }}
        />
      </div>
    </div>
  );
};

export default User;
