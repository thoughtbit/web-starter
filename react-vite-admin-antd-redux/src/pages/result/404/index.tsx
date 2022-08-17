import { memo } from "react";
import { Button, Result } from "antd";
import { useRoute } from "@/hooks";

const NotFound = () => {
  const { history } = useRoute();
  return (
    <Result
      status="404"
      title="404 Not Found"
      subTitle="抱歉，您访问的页面不存在."
      extra={
        <Button
          type="primary"
          onClick={() => {
            history.replace("/");
          }}
        >
          返回上一页
        </Button>
      }
    />
  );
};
export default memo(NotFound);
