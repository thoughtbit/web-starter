import { Spin } from "antd";
import { Suspense } from "react";
import { RenderRouter, useRouter } from "@/router";

import styles from "./app.module.scss";


function App() {
  const element = useRouter();
  return (
    <Suspense
      fallback={
        <div className={styles.loading}>
          <Spin tip="Loading..." size="large" />
        </div>
      }
    >
      { element }
      {/* <RenderRouter /> */}
    </Suspense>
  );
}

export default App;
