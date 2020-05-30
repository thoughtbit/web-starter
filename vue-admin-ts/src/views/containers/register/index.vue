<template>
  <div class="register-page">
    <ui-header msg="注册" />
    <div class="register-wrapper">
      <div class="register-box">
        <div class="box-bd">
          <nav class="register-nav" v-show="activeName==='user' || activeName==='email'">
            <a @click.stop="activeName='user'" class="item" :class="{active:activeName==='user'}">{{ $t('register.userRegister') }}</a>
            <a @click.stop="activeName='email'" class="item" :class="{active:activeName==='email'}">{{ $t('register.emailRegister') }}</a>
          </nav>
          <user-register v-if="activeName==='user'"></user-register>
          <email-register v-else-if="activeName==='email'"></email-register>
        </div><!-- /.box-bd -->
      </div><!-- /.box -->
    </div>
    <ui-footer />
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";

  import UserRegister from "@/views/containers/register/user-register.vue";
  import EmailRegister from "@/views/containers/register/email-register.vue";

  @Component({
    components: {
      UserRegister,
      EmailRegister
    }
  })
  export default class Register extends Vue {
    private activeName: string = "user";
  }
</script>

<style lang="scss" scoped>
  .register-page {
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
  .register-wrapper {
    flex: 1;
  }
  .register-box {
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

  .register-nav {
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
</style>
