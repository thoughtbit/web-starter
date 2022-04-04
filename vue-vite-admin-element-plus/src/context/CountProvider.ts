import { defineComponent, provide, inject, reactive, readonly } from "vue";

const countStoreKey = Symbol("CountStoreKey");

export const CountProvider = defineComponent({
  name: "CountProvider",
  setup(porps, { slots }) {
    const localState = reactive({
      count: 0,
    });

    // 只读, 防止直接修改状态
    const state = readonly(localState);

    // mutations
    const mutations = {
      updateCount(value: number) {
        localState.count += value;
      },
    };

    // actions
    const actions = {
      increment() {
        mutations.updateCount(1);
      },
      decrement() {
        mutations.updateCount(-1);
      },
    };

    const store = {
      state,
      dispatch(name: string, ...rest: any[]) {
        actions[name](...rest);
      },
      commit(name: string, ...rest: any[]) {
        mutations[name](...rest);
      },
    };

    provide(countStoreKey, store);

    return () => slots.default && slots.default();
  },
});

export const useStore = () => inject(countStoreKey);

export const mapAction = (name: string) => {
  const store: any = useStore();
  return (...args: any[]) => store.dispatch(name, ...args);
};

export const mapState = () => {
  const store: any = useStore();
  return store.state;
};
