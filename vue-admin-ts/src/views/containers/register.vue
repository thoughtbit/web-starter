<template>
  <div class="register-page">
    <ui-header msg="注册" />
    <div class="register-box">
      <div class="box-hd">
        <h2 class="title">注册</h2>
      </div>
      <!--/.box-hd -->
      <div class="box-bd">
        <el-form
          ref="registerForm"
          :model="registerForm"
          :rules="registerRules"
          class="register-form"
          autocomplete="on"
          label-position="left"
        >
          <el-form-item prop="username">
            <span class="svg-container">
              <i class="ui-icon icon-user"></i>
            </span>
            <el-input
              ref="username"
              v-model="registerForm.username"
              placeholder="用户名"
              name="username"
              type="text"
              tabindex="1"
              autocomplete="on"
            />
          </el-form-item>
          <el-button :loading="loading" type="primary" class="register-btn" @click.native.prevent="handleRegister"
            >注册</el-button
          >
        </el-form>
      </div><!-- /.box-bd -->
    </div><!-- /.box -->
    <ui-footer />
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Watch } from "vue-property-decorator";
  import { Route } from "vue-router";
  import { isValidUsername } from "@/utils/validation";
  import { State } from "vuex-class";

  interface User {
    username: string | any[];
    password: string | any[];
  }

  const validateUsername = (rule: any, value: string, callback: any): void => {
    if (!isValidUsername(value)) {
      callback(new Error("请输入正确的用户名"));
    } else {
      callback();
    }
  };

  @Component({})
  export default class Login extends Vue {
    private registerForm = <User>{
      username: ""
    };
    private registerRules = <User>{
      username: [{ required: true, trigger: "blur", validator: validateUsername }]
    };

    private loading: boolean = false;
    private redirect: any = null;
    private otherQuery: any = {};

    @State("auth")
    private authState: any;

    @Watch("$route", { immediate: true })
    private onRouteChange(route: Route) {
      this.redirect = route.query && (route.query.redirect as string);
    }

    // private created() {
    //   console.log("===> created");
    // }

    private beforeMount () {
      setTimeout(() => {
        if (!! this.authState.isLogin) {
          this.$router.push({
            name: "/"
          })
        }
      }, 1000);
    }

    private mounted() {
      if (this.registerForm.username === "") {
        // @ts-ignore
        this.$refs.username.focus();
      }
    }

    // private destroyed() {
    //   console.log("===> destroyed");
    // }

    private handleRegister(): void {
      // @ts-ignore
      this.$refs.registerForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("user/register", this.registerForm)
            .then(() => {
              this.$router.push({ path: this.redirect || "/", query: this.otherQuery });
              this.loading = false;
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
</script>

<style lang="scss" scoped>
  .register-box {
    width: 480px;
    margin: 0 auto;
    padding: 20px 0;
    .box-hd {
    }
    .box-bd {
    }
    .register-btn {
      width: 100%;
    }
  }
</style>
