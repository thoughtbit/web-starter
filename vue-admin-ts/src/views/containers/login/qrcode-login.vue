<template>
  <div class="qrcode-login-page">
    <ui-header msg="扫描登录" />
    <div class="qrcode-login-wrapper">
      <div class="qrcode-login-box">
        <div class="box-hd">
          <h2 class="title">{{$t('qrcodelogin.title')}}</h2>
        </div><!--/.box-hd -->
        <div class="box-bd">
          <div class="qrcode-wrapper">
            <div class="hd">
              <span class="text">请使用某某APP扫一扫登录</span>
              <a href="javascript:;" class="qrcode-btn" @click="refreshQrcode">刷新</a>
            </div>
            <div class="bd">
              <div class="qrcode-panel">
                <img src="//static.clewm.net/cli/images/beautify_demo/blackwhite/1.png" alt="" class="qrcode" width="225" height="225" />
                <div class="qrcoce-rl-bg">
                  <div class="qrcode-rl-mask"></div>
                  <div class="qrcode-rl-info">
                    <i class="ui-icon-warning el-icon-warning-outline"></i>
                    <strong class="qrcode-rl-label">当前二维码已过期</strong>
                    <a href="javascript:;" class="qrcode-btn" @click="refreshQrcode">刷新</a>
                  </div>
                </div>
              </div>
            </div>
            <div class="ft">
              <router-link to="/login" class="goto-login-link"><ui-icon icon-class="arrow-left-outlined" class="xl" />切换其他账号</router-link>
            </div>
          </div>
        </div><!-- /.box-bd -->
      </div><!-- /.box -->
    </div>
    <ui-footer />
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Watch } from "vue-property-decorator";
  import { State } from "vuex-class";
  import { Route } from "vue-router";

  @Component
  export default class QrcodeLogin extends Vue {
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
  .qrcode-login-page {
    display: flex;
    flex-direction: column;
    background-color: #f5f5f8;
    position: relative;
    margin: 0 auto;
    overflow-x: auto;
    min-width: 1200px;
    min-height: 800px;
    height: 100%;
  }
  .qrcode-login-wrapper {
    flex: 1;
  }
  .qrcode-login-box {
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
  }
  .qrcode-wrapper {
    text-align: center;
    font-size: 14px;
    .hd {
      line-height: 30px;
      .text {
        color: #666;
      }
    }
    .bd {
      padding: 20px 0;
    }
    .qrcode-btn {
      display: inline-block;
      vertical-align: top;
      padding: 5px 10px;
      line-height: 20px;
      color: #1890ff;
      border-radius: 4px;
      &:hover {
        background-color: #1890ff;
        color: #fff;
      }
    }
  }
  .qrcode-panel {
    position: relative;
    margin: 0 auto;
    width: 190px;
    height: 190px;
    border: 1px solid #eee;
    background-color: #fff;
    .qrcode {
      display: block;
      width: 188px;
      height: 188px;
      background-color: #f5f5f5;
      margin: 0 auto;
    }

  }
  .qrcoce-rl-bg {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }
  .qrcode-rl {
    &-mask {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.8);
    }
    &-info {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      z-index: 2;
      .ui-icon-warning {
        margin-bottom: 10px;
        color: #ff4d51;
        font-size: 28px;
      }
    }
    &-label {
      line-height: 22px;
      padding: 5px 0;
      color: #fff;
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
