<template>
  <div>
    <ul class="list">
      <li>列表内容</li>
      <li>列表内容</li>
      <li>列表内容</li>
      <li>列表内容</li>
      <li>列表内容</li>
      <li>列表内容</li>
    </ul>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";

@Component
export default class Recommend extends Vue {}
</script>
<style lang="scss">
.list {
  font-size: 14px;
  li {
    line-height: 20px;
    padding: 10px;
    border-bottom: 1px solid #eee;
    background-color: #fff;
  }
}
</style>