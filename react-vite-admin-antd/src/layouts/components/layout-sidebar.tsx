import React from "react";
import { Menu, type MenuProps } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { MailOutlined } from "@ant-design/icons";

type Props = {
  style?: React.CSSProperties | undefined;
  collapsed?: boolean;
};

type MenuItem = {
	key: string
	label?: string
	icon?: React.ReactNode
	path?: string
	children?: MenuItem[]
	component?: React.ComponentType<any>
}

const items: MenuItem[] = [
  {
    label: "用户",
    key: "/user",
    icon: <MailOutlined />,
    children: [{ label: "用户列表", key: "/user/list" }],
  },
];


const Sidebar: React.FC<Props> = ({ style, collapsed }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const handleClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    // navigate();
  };
  return (
    <Menu
      mode="inline"
      style={style}
      onClick={handleClick}
      inlineCollapsed={collapsed}
      defaultSelectedKeys={[pathname]}
      defaultOpenKeys={["sub1"]}
      items={items}
    />
  );
};

export default Sidebar;
