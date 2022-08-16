import { memo } from "react";
import styles from "./index.module.scss";

export const Users = () => <div className={styles["users-wrapper"]}>用户中心</div>;

export default memo(Users);
