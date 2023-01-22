import React, { memo } from "react";
import { Button } from "antd-mobile";
import { useRoute } from "@/hooks";

import { ReactComponent as Light403Icon } from "@/assets/icons/result-403.svg";
import { ReactComponent as Light404Icon } from "@/assets/icons/result-404.svg";
import { ReactComponent as Light500Icon } from "@/assets/icons/result-500.svg";
import styles from "./index.module.scss";

enum ECode {
  forbidden = 403,
  notFount = 404,
  error = 500,
}

interface IErrorPageProps {
  code: ECode;
  title?: string;
  desc?: string;
}

const errorInfo = {
  [ECode.forbidden]: {
    title: "403 Forbidden",
    desc: "抱歉，您无权限访问此页面",
    icon: <Light403Icon />,
  },
  [ECode.notFount]: {
    title: "404 Not Found",
    desc: "抱歉，您访问的页面不存在。",
    icon: <Light404Icon />,
  },
  [ECode.error]: {
    title: "500 Internal Server Error",
    desc: "抱歉，服务器出错啦！",
    icon: <Light500Icon />,
  },
};

const ErrorPage: React.FC<IErrorPageProps> = (props) => {
  const { navigate } = useRoute();
  const info = errorInfo[props.code];
  return (
    <div className={styles["error-box"]}>
      {info?.icon}
      <div className={styles["title"]}>{info?.title}</div>
      <div className={styles["description"]}>{info?.desc}</div>
      <Button
        type="button"
        onClick={() => {
          navigate("..", { replace: true });
        }}
      >
        返回首页
      </Button>
    </div>
  );
};

export default memo(ErrorPage);
