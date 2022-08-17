import { useEffect } from "react";
import { useRequest } from "../../hooks";
import { GetUserList } from "../../services";

export default function BlogPage() {
  const { data, pagination, loading, reset, run } = useRequest(GetUserList, {
    loadingText: false,
    onSuccess: () => {
      console.log("获取用户成功");
    },
  });

  useEffect(() => {
    run();
  }, []);

  return (
    <>
      <h1>文章列表</h1>
      {loading ? (
        <>加载中...</>
      ) : (
        <ul className="list">
          {data &&
            data.map((item: any, index: number) => {
              return (
                <li className="item item-hairline" key={item.id}>
                  {item.name}
                </li>
              );
            })}
        </ul>
      )}
    </>
  );
}
