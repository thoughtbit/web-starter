<template>
  <div class="sub-login-page">
    <ui-header msg="子用户登录" />
    <div class="sub-login-box">
      <div class="box-hd">
        <h2 class="title">{{$t('sublogin.title')}}</h2>
      </div><!--/.box-hd -->
      <div class="box-bd">
        <el-form ref="subLoginForm" :model="subLoginForm" :rules="subLoginRules" class="sub-login-form" label-position="left">
          <el-form-item prop="owner">
            <el-input
                clearable
                ref="owner"
                v-model="subLoginForm.owner"
                :placeholder="$t('sublogin.owner')"
                name="owner"
                type="text"
                tabindex="1"
                maxlength="20"
                prefix-icon="el-icon-postcard"
                autocomplete="off"
                @keyup.enter.native="handleLogin"
            />
          </el-form-item>
          <el-form-item prop="username">
            <el-input
                clearable
                ref="username"
                v-model="subLoginForm.username"
                :placeholder="$t('sublogin.username')"
                name="username"
                type="text"
                tabindex="2"
                maxlength="16"
                prefix-icon="el-icon-user"
                autocomplete="off"
                @keyup.enter.native="handleLogin"
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
                clearable
                ref="password"
                v-model="subLoginForm.password"
                :placeholder="$t('sublogin.password')"
                :show-password="true"
                name="password"
                type="password"
                maxlength="16"
                minlength="8"
                tabindex="3"
                autocomplete="off"
                prefix-icon="el-icon-key"
                @keyup.enter.native="handleLogin"
            />
          </el-form-item>
          <el-form-item class="sub-login-action">
            <el-button :loading="loading" type="primary" tabindex="4" class="login-btn" @click.native.prevent="handleLogin">{{
              $t("sublogin.sumbitBtn")
              }}</el-button>
            <router-link to="/login" class="goto-login-link"><ui-icon icon-class="arrow-left-outlined" class="xl" />切换其他账号</router-link>
          </el-form-item>
        </el-form>
      </div><!-- /.box-bd -->
    </div><!-- /.box -->
    <ui-footer />
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Watch } from "vue-property-decorator";
  import { State } from "vuex-class";
  import { Route } from "vue-router";
  interface User {
    owner: string | any[];
    username: string | any[];
    password: string | any[];
  }

  @Component({})
  export default class SubLogin extends Vue {
    private subLoginForm = <User>{
      owner: "",
      username: "",
      password: ""
    };
    private subLoginRules = <User>{
      owner: [
        { required: true, trigger: "blur", message: "请输入子用户登录" },
        { min: 2, message: '子用户名长度最少为2位', trigger: 'blur' }
      ],
      username: [
        { required: true, trigger: "blur", message: "请输入用户名" },
        { min: 2, message: '用户名长度最少为2位', trigger: 'blur' }
      ],
      password: [
        { required: true, trigger: "blur",  message: "请输入密码" },
        { min: 8, max: 16, message: '密码长度最少为8位, 最多16位', trigger: 'blur' }
      ]
    };

    private loading: boolean = false;
    private redirect: any = null;
    private otherQuery: any = {};

    private checkLoginStatus = false;

    @State("auth")
    private authState: any;

    get loginStatus(): boolean {
      return this.authState.isLogin;
    }

    @Watch("loginStatus")
    change() {
      this.checkLoginStatus = this.loginStatus;
    }

    @Watch("$route", { immediate: true })
    private onRouteChange(route: Route) {
      const query = route.query;
      if (query) {
        this.redirect = route.query && (route.query.redirect as string);
        this.otherQuery = this.getOtherQuery(query);
      }
    }

    private created() {}

    private beforeMount() {
      setTimeout(() => {
        if (!!this.authState.isLogin) {
          this.$router.push({
            name: "/"
          });
        }
      }, 1000);
    }

    private mounted() {
      if (this.subLoginForm.owner === "") {
        // @ts-ignore
        this.$refs.owner.focus();
      } else if (this.subLoginForm.username === "") {
        // @ts-ignore
        this.$refs.username.focus();
      } else if (this.subLoginForm.password === "") {
        // @ts-ignore
        this.$refs.password.focus();
      }
    }

    private handleLogin(): void {
      // @ts-ignore
      this.$refs.subLoginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("auth/login", this.subLoginForm)
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

    private getOtherQuery(query: any) {
      return Object.keys(query).reduce((acc: any, cur: any) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc;
      }, {})
    }
  }
</script>

<style lang="scss" scoped>
  .sub-login-page {
    background-color: #f5f5f8;
    position: relative;
    margin: 0 auto;
    overflow-x: auto;
    min-width: 1200px;
    min-height: 720px;
    height: 100%;
  }
  .sub-login-box {
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 4px 40px 0px rgba(0, 0, 0, .15);
    border: 1px solid #f5f5f5;
    width: 480px;
    margin: 80px auto 0;
    padding: 40px;
    .box-hd {
      .title {
        padding: 10px 0;
        line-height: 22px;
        text-align: center;
        color: #409eff;
        font-size: 24px;
      }

      margin-bottom: 20px;
    }
    .verify-code-btn {
      width: 128px;
      text-align: center;
      color: #409eff;
      padding: 12px 20px;
      &:hover {
        background-color: #fff;
      }
      &.is-disabled {
        background-color: #f5f7fa;
      }
    }
  }
  .sub-login-action {
    .login-btn {
      width: 100%;
      margin-bottom: 20px;
    }

  }
  .goto-login-link {
    display: block;
    color: #409eff;
    line-height: 22px;
    padding: 10px;
    text-align: center;
    font-size: 16px;
    .ui-icon {
      vertical-align: top;
      margin-right: 5px;
    }
    &:hover {
      color: #0587f8;
    }
  }
</style>
