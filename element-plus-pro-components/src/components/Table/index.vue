<template>
  <div class="ui-table">
    <el-table
      :data="tableData"
      v-bind="$attrs"
      v-loading="isLoading"
      :element-loading-text="loadingText"
      @row-click="rowClick"
    >
      <template v-for="(item, index) in tableOption" :key="index">
        <el-table-column
          v-if="item.prop && !item.action"
          :label="item.label"
          :prop="item.prop"
          :width="item.width"
          :align="item.align"
        >
          <template #default="scope">
            <template v-if="scope.row.rowEdit">
              <el-input size="small" v-model="scope.row[item.prop!]"></el-input>
            </template>
            <template v-else>
              <template v-if="scope.$index + scope.column.id === currentEdit">
                <div style="display: flex">
                  <el-input size="small" v-model="scope.row[item.prop!]"></el-input>
                  <div>
                    <slot name="cellEdit" v-if="$slots.cellEdit" :scope="scope"></slot>
                    <div class="action-icon" v-else>
                      <check class="check" @click.stop="check(scope)" />
                      <close class="close" @click.stop="cancel(scope)" />
                    </div>
                  </div>
                </div>
              </template>
              <template v-else>
                <slot v-if="item.slot" :name="item.slot" :scope="scope"></slot>
                <span v-else>{{ scope.row[item.prop!] }}</span>
                <component
                  :is="`${toLine(editIcon)}`"
                  class="edit"
                  v-if="item.editable"
                  @click.stop="clickEditIcon(scope)"
                />
              </template>
            </template>
          </template>
        </el-table-column>
      </template>
      <el-table-column :label="actionOption!.label" :width="actionOption!.width" :align="actionOption!.align">
        <template #default="scope">
          <slot name="editRow" :scope="scope" v-if="scope.row.rowEdit"></slot>
          <slot name="action" :scope="scope" v-else></slot>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <div v-if="isPagination && !isLoading" class="ui-pagination" :style="{ justifyContent }">
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
import { defineComponent, computed, toRefs, ref, onMounted, watch } from "vue";
import type { PropType } from "vue";
import _cloneDeep from "lodash/cloneDeep";
import { Check, Close, Edit } from "@element-plus/icons-vue";
import { toLine } from "@/utils/is";
import type { TableOptions } from "./types";

export default defineComponent({
  name: "ui-table",
  components: {
    Check,
    Close,
    Edit,
  },
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

    // 加载文案
    loadingText: {
      type: String,
      default: "",
    },

    // 编辑显示的图标
    editIcon: {
      type: String,
      default: "Edit",
    },
    // 是否可以编辑行
    isEditRow: {
      type: Boolean,
      default: false,
    },
    // 编辑行按钮的标识
    editRowIndex: {
      type: String,
      default: "",
    },

    // 是否显示分页
    isPagination: {
      type: Boolean,
      default: false,
    },
    // 显示分页的对齐方式
    paginationAlign: {
      type: String as PropType<"left" | "center" | "right">,
      default: "left",
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
  emits: ["size-change", "current-change", "confirm", "cancel", "update:editRowIndex"],
  setup(props, { emit }) {
    const { options, data } = toRefs(props);

    // 当前被点击的单元格的标识
    const currentEdit = ref<string>("");
    // 拷贝一份按钮的标识
    const cloneEditRowIndex = ref<string>(props.editRowIndex);

    // 监听的标识
    const watchData = ref<boolean>(false);

    // 表格数据是否在加载中
    const isLoading = computed(() => {
      return !data.value || !data.value.length;
    });

    // 过滤操作项之后的配置
    const tableOption = computed(() => {
      return options.value.filter((item) => !item.action);
    });

    // 操作项
    const actionOption = computed(() => props.options.find((item) => item.action));

    // 拷贝一份表格的数据
    const tableData = ref(_cloneDeep(data));

    // 分页的每一页数据变化
    const handleSizeChange = (val: number) => {
      // console.log("handleSizeChange: ", val)
      emit("size-change", val);
    };
    // 分页页数改变
    const handleCurrentChange = (val: number) => {
      // console.log("handleCurrentChange: ", val)
      emit("current-change", val);
    };

    // 点击行的事件
    const rowClick = (row: any, column: any) => {
      // 判断是否是点击的操作项
      if (column.label === actionOption.value!.label) {
        if (props.isEditRow && cloneEditRowIndex.value === props.editRowIndex) {
          // 编辑行的操作
          row.rowEdit = !row.rowEdit;
          // 重置其他数据的rowEdit
          tableData.value.map((item: any) => {
            if (item !== row) item.rowEdit = false;
          });
          // 重置按钮的标识
          if (!row.rowEdit) emit("update:editRowIndex", "");
        }
      }
    };

    // 表格分页的排列方式
    const justifyContent = computed(() => {
      if (props.paginationAlign === "left") return "flex-start";
      else if (props.paginationAlign === "right") return "flex-end";
      else return "center";
    });

    // 点击编辑图标
    const clickEditIcon = (scope: any) => {
      // 会做一个判断 判断是否当前单元格被点击了
      // 拼接$index和column的id
      currentEdit.value = scope.$index + scope.column.id;
      // console.log(currentEdit.value)
    };

    // 点击确认
    const check = (scope: any) => {
      emit("confirm", scope);
      currentEdit.value = "";
    };

    // 点击取消
    const cancel = (scope: any) => {
      emit("cancel", scope);
      currentEdit.value = "";
    };

    // 如果data的数据变了 要重新给tableData赋值
    // 只需要监听一次就可以了
    const stopWatchData = watch(
      () => props.data,
      (val) => {
        watchData.value = true;
        tableData.value = val;
        tableData.value.map((item: any) => {
          item.rowEdit = false;
        });
        if (watchData.value) stopWatchData();
      },
      { deep: true },
    );

    // 监听
    watch(
      () => props.editRowIndex,
      (val) => {
        if (val) cloneEditRowIndex.value = val;
      },
    );

    onMounted(() => {
      tableData.value.map((item: any) => {
        item.rowEdit = false;
      });
    });

    return {
      isLoading,
      tableData,
      tableOption,
      justifyContent,

      handleSizeChange,
      handleCurrentChange,
      rowClick,

      actionOption,
      currentEdit,
      clickEditIcon,
      check,
      cancel,
      toLine,
      cloneEditRowIndex,
    };
  },
});
</script>

<style scope lang="scss">
.edit {
  width: 1em;
  height: 1em;
  position: relative;
  top: 2px;
  left: 12px;
  cursor: pointer;
}
.action-icon {
  display: flex;
  svg {
    position: relative;
    top: 50%;
    margin-top: 5px;
    margin-left: 8px;
    width: 1em;
    height: 1em;
    cursor: pointer;
  }
  .check {
    color: red;
  }
  .close {
    color: green;
  }
}
.ui-pagination {
  margin-top: 16px;
  display: flex;
}
</style>
