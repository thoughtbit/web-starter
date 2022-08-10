import { type PropsWithChildren, memo } from "react";
import { Breadcrumb } from "antd";

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
