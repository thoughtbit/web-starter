import { memo } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Layout } from "antd";
import Content from "./components/app-router";

function Navbar() {

  return (
    <nav className="navbar">
      <ul className="flex items-center justify-center">
        <li>
          <NavLink to="/" className="nav-link" end>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/demos/demo1" className="nav-link">
            Demo1
          </NavLink>
        </li>
        <li>
          <NavLink to="/demos/demo2" className="nav-link">
            Demo2
          </NavLink>
        </li>
        <li>
          <NavLink to="/demos/demo3" className="nav-link">
            Demo3
          </NavLink>
        </li>
        <li>
          <NavLink to="/demos/demo4" className="nav-link">
            Demo4
          </NavLink>
        </li>
        <li>
          <NavLink to="/demos/demo5" className="nav-link">
            Demo5
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default memo(() => (
  <Layout>
    <Navbar />
    <Content />
  </Layout>
));
