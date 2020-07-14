<template>
  <main>
    <keep-alive>
      <component :is="currentComponent"></component>
    </keep-alive>
    <TabBar
      ref="toolBar"
      :data="tabbars"
      @onChangeFragment="onChangeFragment"
    />
  </main>
</template>

<script lang="js">
import TabBar from '@/components/ui-tabbar';

const loadView = (view) => (resolve) => require([`@/${view}`], resolve);

export default {
  name: 'main',
  components: {
    TabBar,
    'home': loadView("views/home.vue"),
    'about': loadView("views/about.vue"),
    'setting': loadView("views/setting.vue"),
  },
  data() {
    return {
      currentComponent: 'home',
      tabbars: [
        {
          title: '首页',
          name: 'home',
          icon: {
            active: 'shouye',
            inactive: 'shouye-o',
          }
        },
        {
          title: '关于我',
          name: 'about',
          icon: {
            active: 'zhishi',
            inactive: 'zhishi-o',
          }
        },
        {
          title: '设置',
          name: 'setting',
          icon: {
            active: 'shezhi',
            inactive: 'shezhi-o',
          }
        },
      ]
    }
  },
  activated() {
    // 在 keepAlive 被激活的时候，调用指定加载页面组件的方法
    this.pushFragment();
  },
  methods: {
    // 组件切换
    onChangeFragment: function (index) {
      // console.log("componentName:", this.tabbars[index].name);
      this.currentComponent = this.tabbars[index].name;
    },
    // 指定加载的页面组件
    pushFragment: function () {
      // 获取到组件加载的下标
      const componentIndex = this.$route.params.componentIndex;
       // 如果没有下标的话，直接让方法 return 掉。
      if (!componentIndex) return;
       // 通过 toolbar 来切换对应的组件
      this.$refs.toolBar.onChangeComponent(componentIndex);
    },

  }
}
</script>
