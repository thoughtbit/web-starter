import React from "react";
import { Menu, type MenuProps } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { useRoute } from "@/hooks";

type Props = {
  style?: React.CSSProperties | undefined;
  collapsed?: boolean;
};

type MenuItem = {
  key: string;
  label?: string;
  icon?: React.ReactNode;
  path?: string;
  children?: MenuItem[];
  component?: React.ComponentType<any>;
};

const items: MenuItem[] = [
  {
    label: "用户管理",
    key: "/user",
    icon: <MailOutlined />,
    children: [
      { label: "首页", key: "/user/index" },
      { label: "用户列表", key: "/user/list" },
    ],
  },
];

const Sidebar: React.FC<Props> = (props) => {
  const { style } = props;
  const { navigate, location } = useRoute();
  const handleClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    navigate(e.key);
  };
  return (
    <Menu
      mode="inline"
      style={style}
      onClick={handleClick}
      defaultSelectedKeys={[location.pathname]}
      defaultOpenKeys={["index"]}
      items={items}
    />
  );
};

export default Sidebar;
