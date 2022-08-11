import { Suspense } from "react";
import type { BrowserRouterProps } from "react-router-dom";
import { Spin } from "antd";
import Styles from "./index.module.scss";

type ComponentType = React.FC<BrowserRouterProps> | (() => any);
const Loadable = (Component: ComponentType) => (props: any) =>
  (
    <Suspense
      fallback={
        <div className={Styles.loading}>
          <Spin tip="Loading..." size="large" />
        </div>
      }
    >
      <Component {...props} />
    </Suspense>
  );

export default Loadable;

/*
const User = Loadable(lazy(() => import('@/pages/user')));
*/
