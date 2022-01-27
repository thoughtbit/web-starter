<template>
  <result title="500 Internal Server Error" type="500" tip="抱歉，服务器出错啦">
    <button type="button" class="ui-btn ui-btn-primary" @click="goBack">返回首页</button>
  </result>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import Result from "@/components/result/index.vue";

export default defineComponent({
  name: "Result500",
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
