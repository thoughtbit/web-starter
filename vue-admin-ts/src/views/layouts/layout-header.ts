import { Component, Vue } from "vue-property-decorator";

@Component
export default class LayoutHeader extends Vue {
  private logout() {
    // @ts-ignore
    this.$confirm("是否退出系统, 是否继续?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    })
      .then(async () => {
        // @ts-ignore
        await this.$store.dispatch("auth/logout").then(() => {
          // @ts-ignore
          this.$router.push({ path: `/login?redirect=${escape(this.$route.fullPath)}` });
        });
      })
      .catch(() => {
        return false;
      });
  }
}
