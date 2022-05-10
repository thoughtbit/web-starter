<template>
  <div class="about">
    <h1>This is an about page</h1>
    <SvgIcon name="chart" color="#fff" class="icon-chart" size="28" />
    <SvgIcon name="date" color="#fa233b" />
    <SvgIcon name="lock" color="#fff" />
    <SvgIcon name="user" color="#fa233b" />
    <SvgIcon name="zip" color="#fff" />
    <hr />
    <button type="button" @click="openDialog">调用Element Plus 对话框</button>
    <hr />
    <button type="button" @click="openModal">调用函数对话框</button>
    <ui-dialog
      ref="myDialog"
      v-model:visible="dialogVisible"
      :title="'对话框标题'"
      className="ui-dialog"
      center
      destroy-on-close
    >
      <template #body>
        <el-form ref="form" :model="model" :rules="rules" label-width="120px">
          <el-form-item label="Activity name" prop="name">
            <el-input v-model="model.name" />
          </el-form-item>
          <el-form-item label="Activity zone" prop="region">
            <el-select v-model="model.region" placeholder="Activity zone">
              <el-option label="Zone one" value="shanghai" />
              <el-option label="Zone two" value="beijing" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm(form)">提交</el-button>
            <el-button @click="resetForm(form)">重置</el-button>
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <el-button size="large" @click="resetForm(form)">重置</el-button>
        <el-button size="large" type="primary" @click="submitForm(form)">提交</el-button>
      </template>
    </ui-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { ElMessage } from "element-plus";
import { modal } from "./reader";

const dialogVisible = ref<boolean>(false);
const myDialog = ref(null);

const form = ref(null);
const model = reactive({
  name: "",
  region: "",
});

const rules = reactive({
  name: [
    { required: true, message: "Please input Activity name", trigger: "blur" },
    { min: 3, max: 5, message: "Length should be 3 to 5", trigger: "blur" },
  ],
  region: [
    {
      required: true,
      message: "Please select Activity zone",
      trigger: "change",
    },
  ],
});

const openModal = () => {
  dialogVisible.value = true;
  modal(dialogVisible);
};

const openDialog = () => {
  dialogVisible.value = true;
};

const submitForm = (formEl) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      console.log("submitForm:", model);
      ElMessage.success("验证成功");
    } else {
      ElMessage.error("表单填写有误,请检查");
      return false;
    }
  });
};

const resetForm = (formEl) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>

<style scoped lang="scss">
:deep(.ui-dialog) {
  margin: 40px auto;

  .el-dialog__body {
    height: calc(100vh - 192px);
  }
}
</style>
