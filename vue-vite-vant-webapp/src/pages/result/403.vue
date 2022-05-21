<template>
  <result>
    <van-empty image="error" description="抱歉，您无权限访问此页面">
      <van-button round block type="primary" class="bottom-button" size="small" @click="goBack">返回首页</van-button>
    </van-empty>
  </result>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "Result403",
  setup(props) {
    const router = useRouter();
    const goBack = () => {
      router.push({
        name: "home",
      });
    };

    return {
      goBack,
    };
  },
});
</script>
