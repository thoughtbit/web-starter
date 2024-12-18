import { useState } from 'react';
import { Spin } from 'antd';
import useSWR from 'swr';
import qs from 'qs';
import { ajax, api } from '@/services';
import { useRequestSWR } from '@/hooks';

const Demo3 = () => {
  const [keepPreviousData, setKeepPreviousData] = useState(false);
  const [search, setSearch] = useState('s');
  const { data, isLoading, error } = useSWR('/users', (url) =>
    ajax.get(url).then((res: any) => {
      if (res.code === 0) {
        return res.data.list;
      } else {
        return [];
      }
    })
  );

  const { data: mydata } = useRequestSWR<string[]>({
    method: 'GET',
    url: '/users',
  });

  const { data: queryData, isLoading: queryIsLoading } = useSWR(`/users?q=${search}`, api.getUsers, {
    keepPreviousData,
  });

  // const { data: queryData, isLoading: queryIsLoading } = useRequestSWR<string[]>(
  //   {
  //     method: 'GET',
  //     url: `/users?q=${search}`,
  //   },
  //   {
  //     keepPreviousData,
  //   }
  // );

  if (error) return <div>failed to load</div>;

  if (queryIsLoading) return <Spin tip="数据加载中..." />;

  return (
    <div>
      <h2>SWR数据请求</h2>

      <h3>方式一:</h3>
      <p>{JSON.stringify(error)}</p>
      <ul className="list">
        {data?.map((item: any, index: number) => {
          return (
            <li key={`item_${index}`}>
              {index + 1} : {item.name}
            </li>
          );
        })}
      </ul>

      <h3>方式二:</h3>
      <ul className="list">
        {mydata?.map((item: any) => {
          return <li key={item.id}>{item.name}</li>;
        })}
      </ul>

      <h3>方式三:</h3>
      <div className="search-container">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Products..."
          autoFocus
        />
        <label>
          <input type="checkbox" value={keepPreviousData} onChange={(e) => setKeepPreviousData(e.target.checked)} />
          Keep Previous Data
        </label>
      </div>
      <ul className="list">
        {queryData?.map((item: any) => {
          return <li key={item.id}>{item.name}</li>;
        })}
      </ul>
    </div>
  );
};

export default Demo3;
