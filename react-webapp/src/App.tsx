import { DotLoading } from "antd-mobile";
import { Suspense } from "react";
import { RenderRouter, useRouter } from "@/router";

function App() {
  const element = useRouter();
  return (
    <Suspense fallback={<DotLoading />}>
      {element}
      {/* <RenderRouter /> */}
    </Suspense>
  );
}

export default App;
