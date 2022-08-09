import { memo } from "react";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";

const { Header, Sider, Content } = Layout;

export default memo(() => (
  <Layout>
    <Header>Header</Header>
    <Layout>
      <Sider>Sider</Sider>
      <Content>
        <Outlet />
      </Content>
    </Layout>
  </Layout>
));
