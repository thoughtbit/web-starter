import { memo } from "react";
import styles from "./index.module.scss";

export const Login = () => <div className={styles["login-wrapper"]}>登录</div>;
export default memo(Login);
