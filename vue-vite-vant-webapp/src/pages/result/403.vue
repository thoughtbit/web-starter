<template>
  <result title="403 Forbidden" tip="抱歉，您无权限访问此页面">
    <button type="button" class="ui-btn ui-btn-primary" @click="goBack">返回首页</button>
  </result>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import Result from "@/components/result/index.vue";

export default defineComponent({
  name: "Result403",
  components: { Result },
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
