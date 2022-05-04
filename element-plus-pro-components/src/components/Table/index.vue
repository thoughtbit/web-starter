<template>
  <div class="ui-table">
    <el-table :data="tableData" v-bind="$attrs" v-loading="isLoading">
      <template v-for="(item, index) in tableOption" :key="index">
        <el-table-column
          v-if="item.prop && !item.action"
          :label="item.label"
          :prop="item.prop"
          :width="item.width"
          :align="item.align"
        />
      </template>
    </el-table>
  </div>
  <div v-if="isPagination && !isLoading" class="ui-pagination">
    <el-pagination
      :currentPage="currentPage"
      :page-size="pageSize"
      :page-sizes="pageSizes"
      :disabled="paginationDisabled"
      :background="true"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, toRefs } from "vue";
import type { PropType } from "vue";
import _cloneDeep from "lodash/cloneDeep";
import type { TableOptions } from "./types";

export default defineComponent({
  name: "ui-table",
  props: {
    // 表格配置选项
    options: {
      type: Array as PropType<TableOptions[]>,
      required: true,
    },
    // 表格数据
    data: {
      type: Array,
      required: true,
    },

    // 是否显示分页
    isPagination: {
      type: Boolean,
      default: false,
    },
    // 显示分页的对齐方式
    paginationAlign: {
      type: String as PropType<"left" | "center" | "right">,
    },
    // 分页是否可用
    paginationDisabled: {
      type: Boolean,
      default: false,
    },
    // 当前是第几页
    currentPage: {
      type: Number,
      default: 1,
    },
    // 每页显示 N 条记录
    pageSize: {
      type: Number,
      default: 10,
    },
    // 显示分页数据多少条的选项
    pageSizes: {
      type: Array,
      default: () => [10, 20, 50, 100],
    },
    // 数据总条数
    total: {
      type: Number,
      default: 0,
    },
  },
  emits: ["size-change", "current-change"],
  setup(props, { emit }) {
    const { options, data } = toRefs(props);
    // 表格数据是否在加载中
    const isLoading = computed(() => {
      return !data.value || !data.value.length;
    });

    // 过滤操作项之后的配置
    const tableOption = computed(() => {
      return options.value.filter((item) => !item.action);
    });

    // 拷贝一份表格的数据
    let tableData = computed(() => _cloneDeep(data.value));

    // 分页的每一页数据变化
    let handleSizeChange = (val: number) => {
      // console.log("handleSizeChange: ", val)
      emit("size-change", val);
    };
    // 分页页数改变
    let handleCurrentChange = (val: number) => {
      // console.log("handleCurrentChange: ", val)
      emit("current-change", val);
    };

    return {
      isLoading,
      tableData,
      tableOption,

      handleSizeChange,
      handleCurrentChange,
    };
  },
});
</script>

<style scope lang="scss"></style>
