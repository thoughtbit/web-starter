import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Button, Layout, Tooltip } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined, PoweroffOutlined } from "@ant-design/icons";
import { useRoute } from "@/hooks";
import { useAppDispatch } from "@/store";

import LayoutSidebar from "./components/layout-sidebar";
import ThemeToggler from "./components/theme-toogle";
import { logout } from "@/pages/auth/state";

const { Header, Sider, Content } = Layout;

export default () => {
  const { navigate } = useRoute();
  const dispatch = useAppDispatch();

  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = async () => {
    await dispatch(logout());
    navigate("/login");
  };

  return (
    <Layout>
      <Header
        className=""
        style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}
      >
        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
          className: "trigger",
          onClick: () => setCollapsed(!collapsed),
        })}
        <h1 className="">LOGO</h1>
        <div className="">
          <ThemeToggler />
        </div>
        <div className="">
          <Tooltip title="退出登录">
            <Button type="primary" shape="circle" icon={<PoweroffOutlined />} onClick={handleLogout} />
          </Tooltip>
        </div>
      </Header>
      <Layout>
        <Sider collapsible collapsed={collapsed} trigger={null} onCollapse={(value) => setCollapsed(value)}>
          <LayoutSidebar />
        </Sider>
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
