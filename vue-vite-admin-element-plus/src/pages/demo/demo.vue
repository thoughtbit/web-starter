<template>
  <HelloWorld msg="Hello" />
  <hr />
  <TCounter />
  <hr />
  <User />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HelloWorld from "./components/HelloWorld.vue";
import TCounter from "./components/Counter";
import User from "./components/User";

export default defineComponent({
  name: "Home",
  components: {
    HelloWorld,
    TCounter,
    User,
  },
  setup() {
    return {};
  },
});
</script>
