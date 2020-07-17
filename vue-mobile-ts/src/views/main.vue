<template>
  <main class="main">
    <keep-alive>
      <component :is="currentComponent"></component>
    </keep-alive>
    <div class="ui-tabbar-placeholder"></div>
    <ui-tabbar
      ref="toolBar"
      :data="tabbars"
      @onChangeFragment="onChangeFragment"
    />
  </main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { loadView } from "@/utils/AsyncComponent";

interface Tabbar {
  title: string;
  name: string;
  icon: {
    active: string;
    inactive: string;
  };
}

@Component({
  name: "main",
  components: {
    home: loadView("views/home.vue"),
    about: loadView("views/about.vue"),
    setting: loadView("views/setting.vue")
  }
})
export default class Main extends Vue {
  private currentComponent = "home";
  private tabbars: Array<Tabbar> = [
    {
      title: "首页",
      name: "home",
      icon: {
        active: "shouye",
        inactive: "shouye-o"
      }
    },
    {
      title: "关于我",
      name: "about",
      icon: {
        active: "zhishi",
        inactive: "zhishi-o"
      }
    },
    {
      title: "设置",
      name: "setting",
      icon: {
        active: "shezhi",
        inactive: "shezhi-o"
      }
    }
  ];

  private activated() {
    // 在 keepAlive 被激活的时候，调用指定加载页面组件的方法
    this.pushComponent();
  }

  // 组件切换
  private onChangeFragment(index: number) {
    this.currentComponent = this.tabbars[index].name;
  }

  // 指定加载的页面组件
  private pushComponent() {
    // 获取到组件加载的下标
    const componentIndex = this.$route.params.componentIndex;
    // 如果没有下标的话，直接让方法 return 掉。
    if (!componentIndex) return;
    // 通过 toolbar 来切换对应的组件

    // @ts-ignore
    this.$refs.toolBar.onChangeComponent(componentIndex);
  }
}
</script>

<style scoped lang="scss">
.main {
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
}
.ui-tabbar-placeholder {
  height: 52px;
}
</style>
