<template>
  <HelloWorld msg="Hello" />
  <hr />
  <Counter />
  <hr />
  <User />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HelloWorld from "./components/HelloWorld.vue";
import Counter from "./components/Counter";
import User from "./components/User";

export default defineComponent({
  name: "Home",
  components: {
    HelloWorld,
    Counter,
    User,
  },
  setup() {
    return {};
  },
});
</script>
