<template>
  <footer class="footer" id="footer" role="complementary">
    <div class="container">
      <nav class="footer-nav">
        <ul class="footer-nav">
          <li class="nav-item">
            <h3 class="title">主办机构</h3>
            <p class="info">榆林市工业和信息化局</p>
          </li>
          <li class="nav-item">
            <h3 class="title">技术支持</h3>
            <p class="info">西安未来国际信息股份有限公司</p>
          </li>
          <li class="nav-item">
            <h3 class="title">联系我们</h3>
            <p class="info">0912-3891948</p>
          </li>
          <li class="nav-item">
            <h3 class="title">工作时间</h3>
            <p class="info">8:30~17:00</p>
          </li>
          <li class="nav-title">
            <h3 class="title">电子邮件</h3>
            <p class="info">yls_gzzb@163.com</p>
          </li>
        </ul>
        <div class="footer-social">
          <div class="info">
            <h3 class="title">关注我们</h3>
            <p class="subtitle">榆林市工业和信息化局</p>
            <p>扫码关注公众号</p>
          </div>
          <div class="qrcode">
            <img src="https://www.yls.gov.cn/images/qrcode.png" alt="" />
          </div>
        </div>
      </nav>
      <div class="copyright" role="contentinfo">
        <p>Copyright &copy; 陕公网安备 &emsp; 61019002002244号 &emsp; 陕ICP备13003545号</p>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "LayoutFooter",
  setup() {
    return {};
  },
});
</script>
<style lang="scss" scoped>
.footer {
  .copyright {

  }
}
</style>
