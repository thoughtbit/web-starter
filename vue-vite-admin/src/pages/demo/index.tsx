import { defineComponent } from "vue";
import ConfigProvider from "@/context/ConfigProvider";
import { CountProvider } from "@/context/CountProvider";
import { UserProvider } from "@/context/UserProvider";
import DisplayModeControl from "./components/DisplayModeControl";
import Demo from "./demo.vue";

export default defineComponent({
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
