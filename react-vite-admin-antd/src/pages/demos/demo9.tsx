import useUsersList from "./hooks/useUsersList";

const Demo9 = () => {
  const { data, error, isLoading } = useUsersList();

  return (
    <>
      {isLoading ? <div>加载中</div> : null}
      {error ? <div>{error}</div> : null}
      <ul>
        {data &&
          data.users &&
          data.users.length > 0 &&
          data.users.map((item: any, index: number) => {
            return <li key={index}>{item.name}</li>;
          })}
      </ul>
    </>
  );
};

export default Demo9;
