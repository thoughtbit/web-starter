<template>
  <div class="ui-input-wrapper">
    <span class="ui-input-prefix" v-if="slots.prefix">
      <slot name="prefix"></slot>
    </span>
    <input
      :type="type"
      :name="name"
      :value="modelValue || value"
      :disabled="disabled"
      :placeholder="placeholder"
      :readonly="readonly"
      class="ui-input"
      @input="onInput"
      @focus="onFocus"
      @blur="onBlur"
      @change="onChange"
    />
    <span class="ui-input-suffix" v-if="slots.suffix">
      <slot name="suffix"></slot>
    </span>
    <span class="ui-input-clear" v-if="allowClear">
      <button type="button" @click="onClear">x</button>
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent, useSlots } from "vue"

export default defineComponent({
  name: "ui-input",
  props: {
    name: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "text",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    modelValue: {
      type: String,
      default: "",
    },
    value: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    allowClear: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:modelValue", "input", "change", "focus", "blur"],
  setup(props, { emit }) {
    const slots = useSlots()
    //
    const onInput = (event: InputEvent) => {
      const inputElement = event.target as HTMLInputElement;
      // console.log("onInput:", event, inputElement, inputElement.value);
      
      emit("update:modelValue", inputElement.value);
      emit("input", event);
    }

    //
    const onClear = () => {
      console.log("onClear:")
      emit("update:modelValue", "")
    }

    //
    const onFocus = (event: FocusEvent) => {
      console.log("onFocus", event)
      emit("focus", event)
    }

    //
    const onBlur = () => {
      console.log("onBlur:")
      emit("blur")
    }

    //
    const onChange = () => {
      console.log("onChange:")
      emit("change")
    }

    return {
      slots,
      onInput,
      onClear,
      onFocus,
      onBlur,
      onChange,
    }
  },
})
</script>

<style scoped lang="scss">
.ui-input-wrapper {
  width: 100%;
  display: inline-flex;
  align-items: center;

  .ui-input-prefix {
    display: flex;
    flex: none;
    align-items: center;
    padding-left: 8px;
  }

  .ui-input {
    height: 38px;
    line-height: 38px;
    background-color: #fff;
    color: rgba(0, 0, 0, 0.85);
    padding-left: 10px;
    display: inline-block;
    border: none;
    width: 100%;
  }

  .ui-input-suffix {
    display: flex;
    flex: none;
    align-items: center;
  }
  .ui-input-clear {
    button {
      border: 0 none;
      background-color: #eee;
      color: #ff233b;
      line-height: 24px;
      height: 24px;
      text-align: center;
      font-size: 12px;
    }
  }
}
</style>
