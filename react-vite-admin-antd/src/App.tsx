import { Spin } from "antd";
import { Suspense } from "react";
import { useRouter } from "@/router";

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
    </Suspense>
  );
}

export default App;
