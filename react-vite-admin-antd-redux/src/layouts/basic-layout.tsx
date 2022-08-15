import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import LayoutSidebar from "./components/layout-sidebar";
import ThemeToggler from "./components/theme-toogle";

const { Header, Sider, Content } = Layout;

export default () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout>
      <Header className="flex flex-row items-center justify-between px-20px ">
        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
          className: "trigger",
          onClick: () => setCollapsed(!collapsed),
        })}
        <h1 className="m-0 ml-20px">LOGO</h1>
        <div className="ml-20px content-end">
          <ThemeToggler />
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
