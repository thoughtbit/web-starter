import mpx, { createPage } from '@mpxjs/core';
import { useUserStore } from '@/stores';
import { storeToRefs } from '@mpxjs/pinia';

createPage({
  setup() {
    const user = useUserStore();

    // 默认是 静态对象,  使用 storeToRefs 包裹转换成 响应式对象
    const { isLogin, getUserInfo } = storeToRefs(user);

    const handleLogin = () => {
      mpx.navigateTo({
        url: '../../pages/login/index',
      });
    };

    return {
      isLogin,
      getUserInfo,

      handleLogin,
    };
  },
});
