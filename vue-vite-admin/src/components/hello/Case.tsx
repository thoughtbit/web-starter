import { defineComponent, ref, watchEffect } from "vue";
import type { PropType } from "vue";

const renderIcon = (item: any) => {
  return (
    <>
      <div>标题</div>
      <div>图片</div>
    </>
  );
};

export default defineComponent({
  name: "TestComponent",
  props: {
    value: {
      type: String as PropType<string>,
      default: "",
    },
    // list: {
    //   type: Array as PropType<string[]>,
    //   default: () => [],
    // },
    // isShow: {
    //   type: Boolean as PropType<boolean>,
    //   default: false,
    // },
  },
  emits: ["update:value"],
  setup(props, { emit }) {
    const local = ref("");

    watchEffect(() => {
      emit("update:value", local);
    });
    watchEffect(() => {
      local.value = props.value!;
    });

    return {
      local,
    };
  },
  render() {
    return (
      <div>
        <select v-model={[this.local, "value"]}>
          <option value="aaa">aaa</option>
        </select>
        {renderIcon("")}
      </div>
    );
  },
});
