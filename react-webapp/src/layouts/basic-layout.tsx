import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { AddOutline, AddCircleOutline } from "antd-mobile-icons";

export default () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <>
      <header>
        <h1>LOGO</h1>
        {React.createElement(collapsed ? AddOutline : AddCircleOutline, {
          className: "trigger",
          onClick: () => setCollapsed(!collapsed),
        })}
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};
