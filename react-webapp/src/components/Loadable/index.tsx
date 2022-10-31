import { Suspense } from "react";
import type { BrowserRouterProps } from "react-router-dom";
import { DotLoading } from "antd-mobile";
import styles from "./index.module.scss";

type ComponentType = React.FC<BrowserRouterProps> | (() => any);
const Loadable = (Component: ComponentType) => (props: any) =>
  (
    <Suspense
      fallback={
        <div className={styles.loading}>
          <DotLoading color="primary" />
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
