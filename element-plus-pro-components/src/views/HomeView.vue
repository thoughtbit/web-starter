<template>
  <main>
    <UIInput 
      v-model="username" 
      placeholder="请输入姓名" 
      @input="onInput"
      @blur="onBlur"
      @focus="onFocus"

      :allow-clear="true" 
      :disabled="false"
    >
      <template #prefix>
        姓名
      </template>
      <template #suffix>
        图标
      </template>
    </UIInput>
    {{username}}

    <hr />

    <Input v-model="email" placeholder="请输入邮箱" @input="onInput" >
      <template #prefix>
        姓名
      </template>
      <template #suffix>
        图标
      </template>
    </Input>
    {{email}}

    <hr />

    <CustomInput v-model="msg" /> {{ msg }}

    <hr />
    <CustomInput2 v-model:ipt="message" /> {{ message }}
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { UIInput, Input, CustomInput, CustomInput2 } from './vmodel';

const username = ref("admin");
const email = ref("admin@163.com");

const msg = ref("hello");
const message = ref("hello");

const onInput = (val: number) => {
  console.log("input: ", val);
}
const onBlur = () => {
  console.log("blur: ");
}
const onFocus = (event: FocusEvent) => {
  console.log("focus: ", event);
}

</script>

