import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";

import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

const { Header, Sider, Content } = Layout;

export default () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout>
      <Header className="flex flex-row items-center content-center px-20px">
        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
          className: "trigger",
          onClick: () => setCollapsed(!collapsed),
        })}
        <h1 className="m-0 ml-20px">LOGO</h1>
      </Header>
      <Layout>
        <Sider collapsible collapsed={collapsed} trigger={null} onCollapse={(value) => setCollapsed(value)}>
          menu
        </Sider>
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
