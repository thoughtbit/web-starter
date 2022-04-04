import { defineComponent } from "vue";
import DisplayModeControl from "./components/DisplayModeControl";
import ConfigProvider from "@/context/ConfigProvider";
import { CountProvider } from "@/context/CountProvider";
import { UserProvider } from "@/context/UserProvider";
import Demo from "./demo.vue";

export const Root = defineComponent({
  name: "Root",
  setup() {
    return () => (
      <ConfigProvider>
        <DisplayModeControl />
        <CountProvider>
          <UserProvider>
            <Demo />
          </UserProvider>
        </CountProvider>
      </ConfigProvider>
    );
  },
});
