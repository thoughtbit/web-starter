import { Suspense, useEffect } from "react";
import { RenderRouter, useRouter } from "@/router";

import { Spin } from "antd";
import type { Unsubscribe } from "@reduxjs/toolkit";
import { startAppListening, store } from "./store";
import { setupThemeListeners, changeColorScheme } from "./store/modules/theme";

import styles from "./app.module.scss";

function App() {
  const element = useRouter();

  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      store.dispatch(changeColorScheme("dark"));
    }

    const subscriptions: Unsubscribe[] = [setupThemeListeners(startAppListening)];
    return () => subscriptions.forEach((unsubscribe) => unsubscribe());
  }, []);

  return (
    <Suspense
      fallback={
        <div className={styles.loading}>
          <Spin tip="Loading..." size="large" />
        </div>
      }
    >
      {element}
      {/* {<RenderRouter />} */}
    </Suspense>
  );
}

export default App;
