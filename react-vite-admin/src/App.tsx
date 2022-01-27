import { useState, useCallback, useEffect } from "react";
import { useDarkMode, useFetch } from "usehooks-ts";
import { MODE, APP_VERSION } from "@/constants";

type Data = {
  id: number;
  name: string;
  avatar: string;
  createdAt: string;
};

function UserList() {
  const { data, error } = useFetch<Data[]>("/reviews");

  if (error) return <p>There is an error. {error}</p>;
  if (!data) return <p>Loading...</p>;

  return (
    <div className="box">
      <div className="box-hd">例子1</div>
      <div className="box-bd">
        <ul className="list">
          {data.map((item, index) => {
            return (
              <li className="item item-hairline" key={item.id}>
                <img src={item.avatar} className="avatar" />
                {item.name}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

function App() {
  const [count, setCount] = useState(0);
  const { isDarkMode, toggle } = useDarkMode();

  // const onChanged = useCallback(() => {
  //   const el = window?.document.querySelector("html");
  //   el?.classList.toggle("dark", isDarkMode);
  // }, [isDarkMode]);

  useEffect(() => {
    // document.documentElement.dataset.theme = isDarkMode ? 'dark' : '';
    const el = window?.document.querySelector("html");
    el?.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  return (
    <div className="page">
      <header className="">
        <p>
          <button type="button" onClick={() => setCount((count) => count + 1)}>
            count is: {count}
          </button>
        </p>
        <p className="text-base">
          当前环境: {MODE}, {APP_VERSION}
        </p>
      </header>
      <main>
        <p className="flex flex-col">
          <button
            className="btn"
            onClick={() => {
              toggle();
            }}
          >
            {isDarkMode ? "🌛" : "🌞"}
          </button>
        </p>
        <UserList />
      </main>
    </div>
  );
}

export default App;
