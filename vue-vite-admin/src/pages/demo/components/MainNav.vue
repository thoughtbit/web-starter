<template>
  <nav class="main-nav">
    <ul>
      <li class="nav-item" v-for="link in mainNavLinks" :key="link.name">
        <app-link v-if="link.type === 'route'" class="nav-link" :name="link.name" :params="link.params">
          {{ link.title }}
        </app-link>
        <a v-else :href="link.url" class="nav-link">{{ link.title }}</a>
      </li>
    </ul>
  </nav>
</template>
<script lang="ts">
import { defineComponent, computed } from "vue";
import type { RouteParams } from "vue-router";

type NavLink = {
  url: string;
  name: string;
  params?: Partial<RouteParams>;
  title: string;
  display: "all" | "anonym" | "authorized";
  type: "url" | "route";
};

export default defineComponent({
  name: "MainNav",
  setup(props) {
    const mainNavLinks = computed<NavLink[]>(() => [
      {
        url: "https://www.baidu.com",
        name: "rtdj",
        title: "入铜登记",
        display: "all",
        type: "url",
      },
      {
        url: "https://www.baidu.com",
        name: "jkm",
        title: "健康码",
        display: "all",
        type: "url",
      },
      {
        url: "https://www.baidu.com",
        name: "hscx",
        title: "核酸查询",
        display: "all",
        type: "url",
      },
      {
        url: "",
        name: "fyzc",
        title: "防疫政策",
        display: "all",
        params: {},
        type: "route",
      },
    ]);

    return {
      mainNavLinks,
    };
  },
});
</script>

<style lang="scss" scoped>
.main-nav {
  ul {
    display: flex;
    flex-direction: row;
    li {
      margin: 0 10px;
      font-size: 15px;
      .nav-link {
        display: block;

        &:hover {
          color: #04d2ff;
        }
      }
    }
  }
}
</style>
