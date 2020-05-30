<template>
  <div class="login-page h-full flex flex-col">
    <ui-header msg="未来智能云" class="login-header" />
    <main class="container mx-auto flex flex-1 items-center">
      <div class="flex-1">
        <div class="brand ">
          <h2>数字改变未来, 数据驱动生活</h2>
          <ul>
            <li>开放, 方便的数据共享</li>
            <li>安全, 可靠的数字管家</li>
            <li>先进, 快速的服务保障</li>
          </ul>
          <div class="divider"></div>
          <div class="banner">

          </div>
          <div class="copyright">Copyright &copy; 2020-2022 moocss.com 版权所有</div>
        </div>
      </div>
      <div class="login-box">
        <div class="box-bd">
          <nav class="login-nav" v-show="activeName==='user' || activeName==='code'">
            <a @click.stop="activeName='user'" class="item" :class="{active:activeName==='user'}">{{ $t('login.userLogin') }}</a>
            <a @click.stop="activeName='code'" class="item" :class="{active:activeName==='code'}">{{ $t('login.phoneLogin') }}</a>
          </nav>
          <user-login v-if="activeName==='user'"></user-login>
          <code-login v-else-if="activeName==='code'"></code-login>
        </div><!-- /.box-bd -->
        <div class="box-ft">
          <ul class="login-quick-nav">
            <li class="item">
              <router-link class="nav-link" to="/forgot">忘记密码</router-link>
            </li>
            <li class="item">
              <router-link class="nav-link" to="/register">立即注册</router-link>
            </li>
            <li class="item">
              <router-link class="nav-link" to="/qrcodelogin">扫码登录</router-link>
            </li>
            <li class="item">
              <router-link class="nav-link" to="/sublogin">子用户登录</router-link>
            </li>
          </ul>

          <dl class="login-other-nav">
            <dt>其他登录方式</dt>
            <dd>
              <a href="javascript:;" class="nav-link" @click.native.stop="">
                <ui-icon icon-class="wechat-outlined" class="xl" />
              </a>
              <a href="javascript:;" class="nav-link" @click.native.stop="">
                <ui-icon icon-class="qq-outlined" class="xl" />
              </a>
            </dd>
          </dl>

          <dl class="login-hint">
            <dt>温馨提示：</dt>
            <dd>我们不会公开的你的敏感信息</dd>
          </dl>
        </div>
      </div><!-- /.box -->
    </main>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  import { State } from "vuex-class";

  import UserLogin from "@/views/containers/login/user-login.vue";
  import CodeLogin from "@/views/containers/login/code-login.vue";


  @Component({
    components: {
      UserLogin,
      CodeLogin
    }
  })
  export default class Login extends Vue {
    private activeName: string = "user";

    @State("auth")
    private authState: any;

    get loginStatus(): boolean {
      return this.authState.isLogin;
    }
  }
</script>

<style lang="scss">
  .login-page {
    background-color: #f5f5f8;
    position: relative;
    margin: 0 auto;
    overflow-x: auto;
    min-width: 1200px;
    min-height: 720px;
    &::before {
      content: "";
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
      width: 18%;
      background-color: #2468f2;
      z-index: 1;
    }

    .container {
      position: relative;
      &::before {
        content: "";
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        width: 16.5%;
        background-color: #2468f2;
        z-index: 1;
      }
    }
    .header,
    .footer {
      position: absolute;
      left: 0;
      right: 0;
      z-index: 8;
    }

    .footer {
      bottom: 0;
    }
    .login-header {
      background-color: transparent;
      .header-logo {
        background: url(../../../assets/images/logo_b.png) no-repeat 0 50%;
      }
    }

    .banner {
      background-color: #2468f2;
      width: 368px;
      height: 140px;
      border-radius: 8px;
      margin-bottom: 30px;
    }
    .brand {
      width: 368px;
      margin-left: 120px;
      h2 {
        margin-bottom: 10px;
        font-size: 28px;
      }

      ul {
        padding: 20px 0;
        li {
          position: relative;
          line-height: 22px;
          padding: 8px 0 8px 20px;
          color: #717a92;
          &::before {
            content: "";
            position: absolute;
            left: 5px;
            top: 50%;
            width: 5px;
            height: 5px;
            border-radius: 50%;
            background-color: #aaa;
            margin-top: -2.5px;
          }
        }
      }
    }

    .divider {
      border-bottom: 1px solid #bbbbbb;
      margin: 20px 0 50px;
    }

    .copyright {
      padding: 20px 0;
      color: #999;
      font-size: 14px;
    }
  }
  .login-box {
    position: relative;
    z-index: 88;
    /*height: 540px;*/
    width: 426px;
    padding: 30px;
    overflow: hidden;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 4px 40px 0px rgba(0, 0, 0, .15);
    border: 1px solid #f5f5f5;
    .box-hd {
    }
    .box-bd {
    }
    .login-btn {
      width: 100%;
    }
    .login-action {
      margin-bottom: 20px;
    }
  }

  .login-nav {
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 2px solid #ececec;
    margin-bottom: 20px;
    .item {
      flex: 1;
      line-height: 48px;
      text-align: center;
      cursor: pointer;
      font-size: 18px;
      &:hover,
      &.active {
        position: relative;
        &:before {
          content: "";
          position: absolute;
          left: 0;
          bottom: -2px;
          width: 100%;
          height: 2px;
          background: #2468F2;
          margin-top: 12px;
          width: 100%;
          height: 2px;
          background: #2468F2;
          margin-top: 12px;
        }
        color: #2468f2;
      }
    }
  }

  .login-quick-nav {
    font-size: 14px;
    overflow: hidden;
    margin-bottom: 10px;
    .item {
      float: left;
      width: 50%;
      &:nth-child(2n) {
        text-align: right;
      }

      margin-bottom: 10px;
      .nav-link {
        padding: 10px 0;
        line-height: 22px;
        color: #2468f2;
        &:hover {
          color: #409EFF;
        }
      }
    }
  }

  .login-other-nav {
    font-size: 14px;
    text-align: center;
    margin-bottom: 10px;
    dt {
      position: relative;
      color: #999;
      &:before,
      &:after {
        content: "";
        position: absolute;
        top: 50%;
        border-bottom: 1px solid #DCDFE6;
        width: 120px;
        height: 0;
        font-size: 0;
      }

      &:before {
        left: 0;
      }
      &:after {
        right: 0;
      }
    }
    dd {
      padding: 10px 0;
      .nav-link {
        display: inline-block;
        width: 42px;
        height: 42px;
        line-height: 42px;
        background-color: #eee;
        border-radius: 50%;
        margin: 0 10px;
        .ui-icon {
          vertical-align: middle;
          color: #1890ff;
        }
        &:hover {
          background-color: #1890ff;
          .ui-icon {
            color: #fff;
          }
        }
      }
    }
  }

  .login-hint {
    font-size: 14px;
    color: #999;
    dt {
      line-height: 22px;
      margin-bottom: 10px;
    }
  }


  @media (min-width: 1024px) {
    .login-page {
      .container {
        &::before {
          width: 20.5%;
        }
      }
    }
  }

  @media (min-width: 1280px) {
    .login-page {
      .container {
        &::before {
          width: 16.5%;
        }
      }
    }
  }
</style>
