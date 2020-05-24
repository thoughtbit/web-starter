import React, { useState, useEffect } from "react";
import { Card, Table, Avatar } from "antd";
import fetch from "isomorphic-fetch";

const fetchUsers = () => {
  return fetch("/user", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
  }).then((res) => res.json());
};

const { Column } = Table;
const List = () => {
  // 设置列表信息
  const [data, setData] = useState([]);
  // 设置页码信息
  const [page, setPage] = useState(1);
  const [pageInfo, setPageInfo] = useState();

  useEffect(() => {
    console.log({ page });
    (async () => {
      const result = await fetchUsers();
      
    })();
  }, [page]);

  return (
    <Card title="React 子应用列表页">
      列表页
    </Card>
  );
};

export default List;
