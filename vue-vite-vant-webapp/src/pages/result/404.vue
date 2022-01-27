<template>
  <result title="404 Not Found" tip="抱歉，您访问的页面不存在" type="404">
    <button type="button" class="ui-btn ui-btn-primary" @click="goBack">返回首页</button>
  </result>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import Result from "@/components/result/index.vue";

export default defineComponent({
  name: "Result404",
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
