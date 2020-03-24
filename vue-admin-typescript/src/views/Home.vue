<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <router-link to="/">首页</router-link>
    <router-link to="/about">关于</router-link>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  import { MetaInfoHome } from "@/config/metaInfo.config";
  import HelloWorld from "@/components/HelloWorld.vue";

  @Component({
    name: "Home",
    metaInfo: MetaInfoHome,
    components: {
      HelloWorld
    }
  })
  export default class extends Vue {}
</script>
