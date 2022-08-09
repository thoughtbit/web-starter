import { memo } from "react";
import { Layout } from "antd";
import AppRouter from "./components/app-router";

const { Header, Sider, Content } = Layout;

export default memo(() => (
  <Layout>
    <Header>Header</Header>
    <Layout>
      <Sider>Sider</Sider>
      <Content>
        <AppRouter />
      </Content>
    </Layout>
  </Layout>
));
