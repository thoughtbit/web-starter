<template>
  <el-form ref="form" v-if="model" validate-on-rule-change="false" :model="model" :rules="rules" v-bind="$attrs">
    <template v-for="(item, index) in options" :key="index">
      <el-form-item v-if="!item.children || !item.children!.length" :prop="item.prop" :label="item.label">
        <component
          v-if="item.type != 'editor'"
          :placeholder="item.placeholder"
          v-bind="item.attrs"
          :is="`el-${item.type}`"
          v-model="model[item.prop!]"
        />
        <div class="ui-editor" v-if="item.type === 'editor'">
          <div id="toolbar-container" class="ui-toolbar-container"></div>
          <div id="editor-container" class="ui-editor-container"></div>
        </div>
      </el-form-item>
      <el-form-item v-if="item.children && item.children.length" :prop="item.prop" :label="item.label">
        <component
          :placeholder="item.placeholder"
          v-bind="item.attrs"
          :is="`el-${item.type}`"
          v-model="model[item.prop!]"
        >
          <component
            v-for="(child, i) in item.children"
            :key="i"
            :is="`el-${child.type}`"
            :label="child.label"
            :value="child.value"
          />
        </component>
      </el-form-item>
    </template>
    <el-form-item>
      <slot name="action" :form="form" :model="model"></slot>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { ref, defineComponent, onMounted, watch, nextTick } from "vue";
import type { PropType } from "vue";
import type { FormInstance, FormOptions } from "./types/types";
import cloneDeep from "lodash/cloneDeep";
import { createEditor, createToolbar } from "@wangeditor/editor";
import type { IEditorConfig, IDomEditor } from "@wangeditor/editor";

import "@wangeditor/editor/dist/css/style.css";

export default defineComponent({
  name: "ui-form",
  props: {
    // 表单的配置项
    options: {
      type: Array as PropType<FormOptions[]>,
      required: true,
    },
  },
  setup(props, { expose }) {
    const model = ref<any>(null);
    const rules = ref<any>(null);
    const form = ref<FormInstance>();
    const edit = ref(null);

    // 初始化 富文本编辑器
    const initEditor = (defaultValue: any, cb: any) => {
      const editorConfig: Partial<IEditorConfig> = {};
      editorConfig.placeholder = "请输入内容";
      editorConfig.onChange = (editor: IDomEditor) => {
        // 当编辑器选区、内容变化时，即触发
        console.log("content", editor.children);
        console.log("html", editor.getHtml());
        typeof cb == "function" && cb(editor.getHtml());
      };

      // 创建编辑器
      const editor = createEditor({
        selector: "#editor-container",
        config: editorConfig,
        mode: "simple", // 或 'simple' 参考下文
      });
      // 创建工具栏
      const toolbar = createToolbar({
        editor,
        selector: "#toolbar-container",
        mode: "simple", // 或 'simple' 参考下文
      });

      editor.insertText(defaultValue);

      edit.value = editor;
    };

    // 初始化表单
    const initForm = () => {
      if (props.options && props.options.length) {
        let m: any = {};
        let r: any = {};
        props.options.map((item: FormOptions) => {
          m[item.prop!] = item.value;
          r[item.prop!] = item.rules;
          if (item.type === "editor") {
            // 初始化富文本
            nextTick(() => {
              if (document.getElementById("editor-container") && document.getElementById("toolbar-container")) {
                initEditor(item.value, (newHtml: any) => {
                  model.value[item.prop!] = newHtml;
                });
              }
            });
          }
        });
        model.value = cloneDeep(m);
        rules.value = cloneDeep(r);
      }
    };

    // 重置表单
    const resetFields = () => {
      // 重置element-plus的表单
      form.value.resetFields();

      // 重置富文本编辑器的内容
      // 获取到富文本的配置项
      if (props.options && props.options.length) {
        const editorItem = props.options.find((item) => item.type === "editor")!;
        // console.log("------>", editorItem.value);
        editorItem && edit.value.dangerouslyInsertHtml(editorItem.value);
      }
    };

    // 表单验证方法
    const validate = () => {
      return form.value!.validate;
    };

    // 获取表单数据
    const getFormData = () => {
      return model.value;
    };

    // 监听父组件传递进来的options
    watch(
      () => props.options,
      () => {
        initForm();
      },
      { deep: true },
    );

    // 分发方法
    expose({
      resetFields,
      validate,
      getFormData,
    });

    onMounted(() => {
      initForm();
    });

    return {
      model,
      rules,
      form,
    };
  },
});
</script>

<style lang="scss" scoped>
.ui-editor {
  border: 1px solid #eee;
  width: 100%;
  z-index: 999;
}
.ui-toolbar-container {
  border: 1px solid #eee;
}
.ui-editor-container {
  height: 500px;
}
</style>
