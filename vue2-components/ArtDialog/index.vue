<template>
  <el-dialog
    v-bind="$attrs"
    custom-class="art-dialog"
    :visible.sync="dialog.show"
    :title="dialog.title"
    :append-to-body="true"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    @close="handleClickClose"
    destroy-on-close
  >
    <span class="dialog-title" slot="title">
      <slot name="header">
        <strong>{{ dialog.title }}</strong>
      </slot>
    </span>

    <div :class="['dialog-content', customClass]">
      <slot name="content"></slot>
    </div>

    <span slot="footer" class="dialog-footer">
      <slot name="footer">
        <el-button @click="handleClickCancel()">取 消</el-button>
        <el-button
          type="primary"
          @click="handleClickConfirm()"
          :loading="loading"
        >
          确 定
        </el-button>
      </slot>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: "ArtDialog",

  data() {
    return {
      loading: false,
      dialog: {
        show: false,
        title: "",
        type: 1, // 1: 新增 2：编辑 3：查看
      },
    };
  },
  computed: {
    customClass() {
      const typeClass = {
        1: "dialog-content-add",
        2: "dialog-content-edit",
        3: "dialog-content-view",
      };
      return typeClass[this.dialog.type];
    },
  },
  props: [],
  methods: {
    openDialog(options = { title: "", type: 1, data: {} }) {
      this.dialog.show = true;
      this.dialog.title = options.title || "新增";
      this.dialog.type = options.type;
    },
    handleClickCancel() {
      this.dialog.show = false;
      this.$emit("cancel");
      this.loading = false;
    },
    handleClickClose() {
      this.dialog.show = false;
      this.$emit("close");
      this.loading = false;
    },
    handleClickConfirm() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 10 * 1000);
      this.$emit("confirm", () => {
        this.loading = false;
        this.dialog.show = false;
      });
    },
  },
};
</script>

<style lang="scss">
.art-dialog {
  .el-icon-close {
    font-size: 20px;
  }
  .el-dialog__body {
    padding: 6px 20px !important;
  }
  .dialog-content {
    max-height: calc(100vh - 204px);
    overflow: hidden;
    overflow-y: auto;
    &-add {
    }
    &-edit {
    }
    &-view {
    }
  }
}
</style>

/*
    <ArtDialog
      ref="artDialogRef"
      top="7vh"
      width="800px"
      @close="handleDialogClose"
      @confirm="handleDialogConfirm"
      @cancel="handleDialogCancel"
    >
      <template #content>
        ddd
      </template>
    </ArtDialog>
    <button @click="handleClickArtDialog">点击</button>

    handleClickArtDialog() {
      this.$refs["artDialogRef"].openDialog({
        title: "修改",
        type: 2,
        data: {
          name: "moocss",
        },
      });
    },
    handleDialogConfirm(callback) {
      callback();
    },
    handleDialogCancel() {
      console.log("handleDialogCancel");
    },
    handleDialogClose() {
      console.log("handleDialogClose");
    },
*/
