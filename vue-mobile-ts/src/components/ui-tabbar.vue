<template>
  <van-tabbar fixed v-model="active" @change="onChange">
    <van-tabbar-item v-for="(item, index) in data" :key="index">
      <template #icon="props">
        <ui-icon
          :icon-class="props.active ? item.icon.active : item.icon.inactive"
          class="lg"
        />
      </template>
      {{ item.title }}
    </van-tabbar-item>
  </van-tabbar>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { Tabbar, TabbarItem } from "vant";

@Component({
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
  }
})
export default class TabBar extends Vue {
  @Prop({
    type: Number,
    default: 0
  })
  private defaultActive!: number;

  @Prop({
    type: Array,
    required: true,
    default: () => []
  })
  private data!: any;

  private active = this.defaultActive;

  private onChange(index: number) {
    this.$emit("onChangeFragment", index);
  }

  /**
   * 指定切换的 tab 页
   */
  private onChangeComponent(index: number) {
    // 调用 onChange 切换对应的 tab
    this.onChange(index);
  }
}
</script>
<style scoped lang="scss"></style>
