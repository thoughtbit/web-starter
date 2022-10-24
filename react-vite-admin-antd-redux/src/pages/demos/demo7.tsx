import { useMemo, useState, useCallback, useEffect } from "react";
import { useSearchParam } from "react-use";
import useRequest from "@/hooks/useRequest";
import request from "@/services/request";

export default () => {
  const getUsers = async () => {
    return await request({
      url: "/api/users",
      method: "get",
    });
  };

  const [state, setState] = useState([]);

  const { error, loading, run } = useRequest(getUsers, {
    manual: true,
    onBefore: (params) => {
      console.info(`Start Request: ${params}`);
    },
    onSuccess: (result, params) => {
      setState(result.data.users);
      console.log("---->", result.data.users);
    },
    onError: (error) => {
      console.error(error.message);
    },
    onFinally: (params, result, error) => {
      console.info(`Request finish`);
    },
  });

  useEffect(() => {
    run();
  }, [])

  if (error) return <p> {error?.message}</p>;
  if (loading) return <p>Loading...</p>;

  return (
    <>
      <SearchBox data={state} />
    </>
  );
};

function SearchBox({ data }: any) {
  const searchKey = useSearchParam("key") || "";

  const filtered = useMemo(() => {
    return data.filter((item: any) => item.name.toLowerCase().includes(searchKey.toLowerCase()));
  }, [searchKey, data]);

  const handleSearch = useCallback((e: any) => {
    window.history.pushState({}, "", `${window.location.pathname}?key=${e.target.value}`);
  }, []);

  return (
    <div className="08-filter-list">
      <h2>查找用户</h2>
      <input value={searchKey} placeholder="Search..." onChange={handleSearch} />
      <ul style={{ marginTop: 20 }}>
        {filtered && filtered.length > 0 && filtered.map((item: any) => <li key={item.id}>{item.id} - {item.name}</li>)}
      </ul>
    </div>
  );
}
