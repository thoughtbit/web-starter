import React from "react";
import { Button, Result } from "antd";

const UnAuthorized = () => (
  <Result
    status="403"
    title="403 Forbidden"
    subTitle="抱歉，您无权限访问此页面."
    extra={<Button type="primary">返回首页</Button>}
  />
);

export default React.memo(UnAuthorized);
