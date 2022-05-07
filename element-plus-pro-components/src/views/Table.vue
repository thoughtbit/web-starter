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
  </ui-table>
</template>

<script lang="ts">
import { ref, defineComponent, getCurrentInstance, nextTick, onMounted } from "vue";
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
  props: {},
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

    const tableData = ref<any[]>([]);

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
      tableData,
      current,
      total,
      pageSize,
      arraySpanMethod,
      handleSizeChange,
      handleCurrentChange,
    };
  },
});
</script>

<style scoped lang="scss"></style>
