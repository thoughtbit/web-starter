<script lang="ts">
import { createVNode, defineComponent, resolveComponent } from "vue";
import { ElIcon } from "element-plus";
import SvgIcon from "./../svg-icon/svg-icon.vue";

export const LOCAL_ICON_PREFIX = "ui-icon";
export const EL_ICON_PREFIX = "el-icon";

export default defineComponent({
  name: "Icon",
  props: {
    type: {
      type: String,
      default: "", // ui= 本地 icons; el = element-plus/icons-vue
    },
    name: {
      type: String,
      required: true,
    },
    size: {
      type: [String, Number],
      default: 16,
    },
    color: {
      type: String,
      default: "inherit",
    },
    className: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    if (props.type.indexOf(EL_ICON_PREFIX) === 0) {
      // el-icon
      return () =>
        createVNode(
          ElIcon,
          {
            size: props.size,
            color: props.color,
          },
          () => [createVNode(resolveComponent(props.name))]
        );
    }
    if (props.type.indexOf(LOCAL_ICON_PREFIX) === 0) {
      // 本地icon
      return () =>
        createVNode(
          ElIcon,
          {
            size: props.size,
            color: props.color,
          },
          () => createVNode(SvgIcon, { ...props })
        );
    }
  },
});
</script>
