<template>
  <el-table
    ref="table"
    :data="tableData"
    border
    show-summary
    :span-method="arraySpanMethod"
    style="width: 100%"
    height="200"
  >
    <el-table-column prop="id" label="编号" />
    <el-table-column prop="name" label="姓名" />
    <el-table-column prop="email" label="邮箱" />
    <el-table-column prop="age" label="年龄" />
  </el-table>

  <hr />

  <ui-table
    :options="options"
    :data="tableData"
    loadingText="加载中..."
    isPagination
    stripe
    border
    :total="total"
    :currentPage="current"
    :pageSize="pageSize"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    style="width: 100%"
  >
    <template #action="scope">
      <el-button size="small" type="primary" @click="view(scope.scope)">查看</el-button>
    </template>
  </ui-table>

  <hr />

  <ui-table
    :options="options2"
    :data="tableData"
    loadingText="加载中..."
    isEditRow
    isPagination
    stripe
    border
    :total="total"
    :currentPage="current"
    :pageSize="pageSize"
    :editRowIndex="editRowIndex"
    @confirm="confirm"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    style="width: 100%"
  >
    <template #name="{ scope }">
      <el-popover effect="light" trigger="hover" placement="top">
        <template #default>
          <p>姓名: {{ scope.row.name }}</p>
          <p>邮箱: {{ scope.row.email }}</p>
        </template>
        <template #reference>
          <div class="name-wrapper">
            <el-tag size="medium">{{ scope.row.name }}</el-tag>
          </div>
        </template>
      </el-popover>
    </template>
    <template #email="{ scope }">
      <el-icon><user /></el-icon>
      <span style="margin-left: 10px">{{ scope.row.email }}</span>
    </template>
    <template #age="{ scope }">
      {{ scope.row.age }}
    </template>

    <template #editRow="scope">
      <el-button size="small" type="primary" @click="sure(scope.scope)">确认</el-button>
      <el-button size="small" type="danger">取消</el-button>
    </template>
    <template #action="scope">
      <el-button size="small" type="primary" @click="edit(scope.scope)">编辑</el-button>
      <el-button size="small" type="danger">删除</el-button>
    </template>
  </ui-table>
</template>

<script lang="ts">
import { ref, defineComponent, getCurrentInstance, nextTick, onMounted } from "vue";
import { User } from "@element-plus/icons-vue";
import type { TableOptions } from "@/components/Table/types";
import { useState } from "@/hooks/use-state";
import { createAsyncProcess } from "@/utils/create-async-process";
import { request } from "@/services";

function useData() {
  const [value, setValue] = useState<any[]>([]);
  async function fetchData(): Promise<void> {
    await request({ url: "/api/users", method: "get" }).then((res: any) => {
      if (res.code === 0) {
        setValue(res.data.list);
      }
    });
  }

  const { active: loading, run: runWrappedFetchData } = createAsyncProcess(fetchData);

  return {
    loading,
    data: value,
    fetchData: runWrappedFetchData,
  };
}

export default defineComponent({
  name: "TableDemo",
  components: {
    User,
  },
  setup() {
    const { proxy } = getCurrentInstance() as any;

    const current = ref<number>(1);
    const pageSize = ref<number>(10);
    const total = ref<number>(0);

    const options: TableOptions[] = [
      {
        prop: "id",
        label: "编号",
        width: 100,
        align: "center",
      },
      {
        prop: "name",
        label: "姓名",
        width: 120,
        align: "center",
      },
      {
        prop: "email",
        label: "邮箱",
        width: 240,
        align: "center",
      },
      {
        prop: "age",
        label: "年龄",
        width: 200,
        align: "center",
      },

      {
        label: "操作",
        action: true,
        align: "center",
      },
    ];

    const options2: TableOptions[] = [
      {
        prop: "id",
        label: "编号",
        width: 100,
        align: "center",
      },
      {
        prop: "name",
        label: "姓名",
        width: 120,
        align: "center",
        slot: "name",
      },
      {
        prop: "email",
        label: "邮箱",
        width: 240,
        align: "center",
        slot: "email",
        editable: true,
      },
      {
        prop: "age",
        label: "年龄",
        width: 200,
        align: "center",
        slot: "age",
        editable: true,
      },

      {
        label: "操作",
        action: true,
        align: "center",
      },
    ];

    const tableData = ref<any[]>([]);
    const editRowIndex = ref<string>("");

    const arraySpanMethod = () => {
      nextTick(() => {
        if (proxy.$refs.table.$el) {
          const current = proxy.$refs.table.$el
            .querySelector(".el-table__footer-wrapper")
            .querySelector(".el-table__footer");
          const cell = current.rows[0].cells;
          cell[1].style.display = "none";
          cell[2].style.display = "none";
          cell[0].colSpan = "3";
        }
      });
    };

    const handleSizeChange = (val: number) => {
      console.log("handleSizeChange:", val);
      pageSize.value = val;
    };
    const handleCurrentChange = (val: number) => {
      console.log("handleCurrentChange:", val);
      // current.value = val;
    };

    const view = (scope: any) => {
      // console.log(scope)
    };

    const edit = (scope: any) => {
      // console.log(scope)
      editRowIndex.value = "edit";
    };
    const sure = (scope: any) => {
      console.log(scope);
    };
    const confirm = (scope: any) => {
      // console.log(scope)
    };

    const getData = () => {
      const { data, fetchData } = useData();
      fetchData().then(() => {
        total.value = data.value.length;
        tableData.value = data.value;
      });
    };

    // const data = ref([]);
    // const pagination = ref({
    //   defaultPageSize: 20,
    //   total: 100,
    //   defaultCurrent: 1,
    // });
    // const dataLoading = ref(false);
    // const fetchData = async () => {
    //   dataLoading.value = true;
    //   try {
    //     const res = await request.get('/api/get-list');
    //     if (res.code === 0) {
    //       const { list = [] } = res.data;
    //       data.value = list;
    //       pagination.value = {
    //         ...pagination.value,
    //         total: list.length,
    //       };
    //     }
    //   } catch (e) {
    //     console.log(e);
    //   } finally {
    //     dataLoading.value = false;
    //   }
    // };

    onMounted(() => {
      getData();
    });

    return {
      options,
      options2,
      tableData,
      current,
      total,
      pageSize,
      arraySpanMethod,
      handleSizeChange,
      handleCurrentChange,

      editRowIndex,
      edit,
      sure,
      confirm,
      view,
    };
  },
});
</script>

<style scoped lang="scss"></style>
