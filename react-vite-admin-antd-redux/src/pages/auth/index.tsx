import { memo } from "react";
import Styles from "./index.module.scss";

export const Login = () => <div className={Styles["login-wrapper"]}>登录</div>;
export default memo(Login);
