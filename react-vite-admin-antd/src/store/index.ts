// zustand 采用观察者模式，对组件进行订阅更新，因此不需要在最外层提供一个类似redux的Provider包裹层
import create from "zustand";
import { devtools, persist } from "zustand/middleware";
import type { StoreState } from "./types";
import { createAuthSlice } from "./modules/auth";
import { createGlobalsSlice } from "./modules/global";

export const useStore = create<StoreState>()(
  devtools(
    persist((...a) => ({
      ...createAuthSlice(...a),
      ...createGlobalsSlice(...a),
    }))
  )
);

// const login = useStore((state) => state.login);
