import { memo } from "react";
import useAntdTable from "@/hooks/useAntdTable";
import styles from "./index.module.scss";
import { Table } from "antd";

const getTableData = ({ current, pageSize }: any): Promise<any> => {
  let query = `pageNumber=${current}&pageSize=${pageSize}`;
  const initializer = () => Math.random();
  console.log(query);
  return new Promise((resolve, reject) => {
    if (Math.random() > 0.5) {
      resolve({
        total: 100,
        list: [
          {
            id: 1001,
            age: 18,
            name: {
              "title": "Miss",
              "first": "Fatma",
              "last": "Erçetin",
            },
            phone: "078 664 22 21",
            email: "foo@bar.com" + initializer(),
          },
          {
            id: 1002,
            age: 22,
            name: {
              "title": "Miss",
              "first": "Fatma",
              "last": "Erçetin",
            },
            phone: "078 664 22 21",
            email: "foo@bar.com" + initializer(),
          },
          {
            id: 1003,
            age: 32,
            name: {
              "title": "Miss",
              "first": "Fatma",
              "last": "Erçetin",
            },
            phone: "078 664 22 21",
            email: "foo@bar.com" + initializer(),
          },
          {
            id: 1004,
            age: 36,
            name: {
              "title": "Miss",
              "first": "Fatma",
              "last": "Erçetin",
            },
            phone: "078 664 22 21",
            email: "foo@bar.com" + initializer,
          },
          {
            id: 1005,
            age: 38,
            name: {
              "title": "Miss",
              "first": "Fatma",
              "last": "Erçetin",
            },
            phone: "078 664 22 21",
            email: "foo@bar.com",
          },
        ],
      });
    } else {
      reject({
        total: 0,
        list: [],
      });
    }
  });
};

export const Workplace = () => {
  const { tableProps } = useAntdTable(getTableData);

  const columns = [
    {
      title: "name",
      dataIndex: ["name", "last"],
    },
    {
      title: "email",
      dataIndex: "email",
    },
    {
      title: "phone",
      dataIndex: "phone",
    },
    {
      title: "age",
      dataIndex: "age",
    },
  ];

  return (
    <div className="flex">
      <Table columns={columns} rowKey="id" {...tableProps} />
    </div>
  );
};
export default memo(Workplace);
