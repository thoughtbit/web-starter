import { memo, useState } from "react";
import classNames from "classnames";
import { Navigate } from "react-router-dom";
import { useRoute } from "@/hooks";
import { useAppSelector } from "@/store";
import { selectTheme } from "@/store/modules/theme";
import { selectAuth } from "./state";
import { APP_NAME } from "@/constants";
import Login from "./components/Login";
import Register from "./components/Register";

import "./index.scss";

export default memo(() => {
  const { location } = useRoute();
  const [type, setType] = useState("login");
  const { colorScheme } = useAppSelector(selectTheme);
  const { isAuthenticated } = useAppSelector(selectAuth);
  const handleSwitchLoginType = () => {
    setType(type === "register" ? "login" : "register");
  };

  const { from } = (location.state as any) || { from: { pathname: "/", search: location.search } };
  if (isAuthenticated) {
    return <Navigate to={from} replace />;
  }

  return (
    <div
      className={classNames("login-wrapper", {
        ["light"]: colorScheme === "light",
        ["dark"]: colorScheme === "dark",
      })}
    >
      <div className="login-container">
        <div className="hd">
          <h1 className="title">欢迎来到</h1>
          <h1 className="title">{APP_NAME}</h1>
          <div className="sub-title">
            <p className="tip">{type === "register" ? "已有账号?" : "没有账号吗?"}</p>
            <p className="tip link" onClick={handleSwitchLoginType}>
              {type === "register" ? "登录" : "注册新账号"}
            </p>
          </div>
        </div>
        <div className="bd">{type === "login" ? <Login /> : <Register />}</div>
      </div>
    </div>
  );
});
