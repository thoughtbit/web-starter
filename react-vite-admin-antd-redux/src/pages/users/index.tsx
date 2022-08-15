import { memo } from "react";
import Styles from "./index.module.scss";

export const Users = () => <div className={Styles["users-wrapper"]}>用户中心</div>;

export default memo(Users);
