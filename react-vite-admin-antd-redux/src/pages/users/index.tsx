import { memo } from "react";
import type { BrowserRouterProps } from "react-router-dom";

const Users: React.FC<BrowserRouterProps> = () => {
  return <div>用户中心</div>;
};

export default memo(Users);
