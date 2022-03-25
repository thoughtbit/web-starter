import { defineComponent, inject, provide, reactive, readonly } from "vue";
import type { InjectionKey, Ref } from "vue";

export const userStoreKey: InjectionKey<Ref<any>> = Symbol("User");

export const UserProvider = defineComponent({
  name: "UserProvider",
  setup(porps, { slots }) {
    const localState = reactive({
      name: "",
      age: 18,
    });

    // 只读, 防止直接修改状态
    const state = readonly(localState);

    // mutations
    const mutations = {
      updateName(name: string) {
        localState.name = name;
      },
    };

    const actions = {
      fetchUser() {
        setTimeout(() => {
          mutations.updateName("moocss");
        }, 1000);
      },
    };

    const store: any = {
      state,
      dispatch(name: string, ...rest: any[]) {
        actions[name](...rest);
      },
      commit(name: string, ...rest: any[]) {
        mutations[name](...rest);
      },
    };

    provide(userStoreKey, store);

    return () => slots.default && slots.default();
  },
});

export const useStore = () => inject(userStoreKey);

export const mapAction = (name: string) => {
  const store: any = useStore();
  return (...args: any[]) => store.dispatch(name, ...args);
};

export const mapState = () => {
  const store: any = useStore();
  return store.state;
};
