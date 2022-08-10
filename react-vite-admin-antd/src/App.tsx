import { Spin } from "antd";
import { Suspense } from "react";
import { RenderRouter, useRouter } from "@/router";

import Styles from "./app.module.scss";

function App() {
  const element = useRouter();
  return (
    <Suspense
      fallback={
        <div className={Styles.loading}>
          <Spin />
        </div>
      }
    >
      {element}
      {/* <RenderRouter /> */}
    </Suspense>
  );
}

export default App;
