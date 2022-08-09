import { type PropsWithChildren, memo } from "react";
import { Layout, Breadcrumb } from "antd";

const { Content } = Layout;

const Page = ({
  children,
  isFullPage,
  breadcrumbs,
}: PropsWithChildren<{ isFullPage?: boolean; breadcrumbs?: string[] }>) => {
  if (isFullPage) {
    return <>{children}</>;
  }

  return (
    <div className="page">
      {
        <Breadcrumb>
          {breadcrumbs?.map((item, index) => (
            <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>
          ))}
        </Breadcrumb>
      }
      {children}
    </div>
  );
};

export default memo(Page);
