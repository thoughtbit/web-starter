import { useState } from "react";
import _debounce from "lodash/debounce";
import useRequest from "@/hooks/useRequest";
import request from "@/services/request";

export default function Demo3() {
  const getUsers = async () => {
    return await request({
      url: "/api/users",
      method: "get",
    });
  };

  // const { data, error, loading, run } = useRequest(getUsers, {
  //   manual: true,
  //   throttleWait: 1000,
  //   loadingDelay: 300,
  // });

  // const users = useMemo(() => data?.data.list, [data]);

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


  if (error) return <p> {error?.message}</p>;
  if (loading) return <p>Loading...</p>;

  return (
    <>
      <h2>Dashboard Index</h2>
      <p>
        <button type="button" onClick={run} className="btn">
          run
        </button>
      </p>

      <ul>
        {state &&
          state.map((user: any) => {
            return (
              <li key={user.id}>
               {user.id} - {user.name} -- {user.email} -- {user.salary}
              </li>
            );
          })}
      </ul>
    </>
  );
}
