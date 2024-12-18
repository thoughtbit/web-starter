<template>
  <el-dialog v-model="dialogVisible" v-bind="$attrs" :custom-class="className">
    <template #default>
      <slot name="body"></slot>
    </template>
    <template #footer>
      <slot name="footer"></slot>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
export default defineComponent({
  name: "ui-dialog",
  props: {
    visible: {
      type: Boolean,
      default: false,
      required: true,
    },
    className: {
      type: String,
      default: "ui-dialog",
    },
    // 是否只在可视区域内滚动
    isScroll: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:visible"],
  setup(props, { emit, expose }) {
    // 弹出框的显示与隐藏
    const dialogVisible = computed({
      get: () => props.visible,
      set: (value) => emit("update:visible", value),
    });

    // 关闭对话框
    const close = () => {
      emit("update:visible", false);
    };

    expose({
      close,
    });

    return {
      dialogVisible,
    };
  },
});
</script>
