<template>
  <van-tabbar fixed v-model="active" @change="handleChange">
    <van-tabbar-item v-for="(item, index) in data" :key="index">
      <template #icon="props">
        <ui-icon :icon-class="props.active ? item.icon.active : item.icon.inactive" class="lg" />
      </template>
      {{ item.title }}
    </van-tabbar-item>
  </van-tabbar>
</template>
<script>
import { Tabbar, TabbarItem } from "vant";

export default {
  name: "TabBar",
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
  },
  props: {
    defaultActive: {
      type: Number,
      default: 0
    },
    data: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
      active: this.defaultActive
    };
  },
  methods: {
    handleChange(index) {
      this.$emit("onChangeFragment", index);
    }
  }
};
</script>
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
