<template>
  <div class="forgot-page">
    <ui-header msg="找回密码" />
    <div class="forgot-wrapper">
      <div class="forgot-box">
        <div class="box-bd">
          <nav class="forgot-nav" v-show="activeName==='email' || activeName==='phone'">
            <a @click.stop="activeName='email'" class="item" :class="{active:activeName==='email'}">{{ $t('forgot.emailForgot') }}</a>
            <a @click.stop="activeName='phone'" class="item" :class="{active:activeName==='phone'}">{{ $t('forgot.phoneForgot') }}</a>
          </nav>
          <email-forgot v-if="activeName==='email'"></email-forgot>
          <phone-forgot v-else-if="activeName==='phone'"></phone-forgot>
        </div><!-- /.box-bd -->
      </div><!-- /.box -->
    </div>
    <ui-footer />
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";

  import EmailForgot from "@/views/containers/forgot/email-forgot.vue";
  import PhoneForgot from "@/views/containers/forgot/phone-forgot.vue";

  @Component({
    components: {
      PhoneForgot,
      EmailForgot
    }
  })
  export default class Forgot extends Vue {
    private activeName: string = "email";
  }
</script>

<style lang="scss" scoped>
  .forgot-page {
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
  .forgot-wrapper {
    flex: 1;
  }
  .forgot-box {
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

  .forgot-nav {
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
