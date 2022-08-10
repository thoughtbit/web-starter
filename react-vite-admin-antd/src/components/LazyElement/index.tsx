import { lazy, Suspense } from "react";
import { Spin } from "antd";
import Styles from "./index.module.scss";

function LazyElement(props: { importFunc: () => any }) {
  const { importFunc } = props;
  const LazyComponent = lazy(importFunc);
  return (
    <Suspense
      fallback={
        <div className={Styles.loading}>
          <Spin />
        </div>
      }
    >
      <LazyComponent />
    </Suspense>
  );
}

export default LazyElement;
