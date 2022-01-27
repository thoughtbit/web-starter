<template>
  <result title="网络异常" tip="网络异常，请稍后再试" type="wifi">
    <div>
      <button type="button" class="ui-btn ui-btn-primary" @click="goBack">返回首页</button>
      <button type="button" class="ui-btn ui-btn-secondary" @click="goReload">重新加载</button>
    </div>
  </result>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import Result from "@/components/result/index.vue";

export default defineComponent({
  name: "ResultNetworkError",
  components: { Result },
  setup(props) {
    const router = useRouter();
    const goBack = () => {
      router.push({
        name: "home",
      });
    };

    const goReload = () => {
      router.push({
        name: "home",
      });
    };

    return {
      goBack,
      goReload,
    };
  },
});
</script>
