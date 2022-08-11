import { memo } from "react";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import LayoutSidebar from "./components/layout-sidebar";

const { Header, Sider, Content } = Layout;

export default () => (
  <Layout>
    <Header>Header</Header>
    <Layout>
      <Sider>
        <LayoutSidebar collapsed={false}/>
      </Sider>
      <Content>
        <Outlet />
      </Content>
    </Layout>
  </Layout>
);
