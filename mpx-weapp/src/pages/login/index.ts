import mpx, { createPage } from '@mpxjs/core';
import { useUserStore } from '@/stores';
import { storeToRefs } from '@mpxjs/pinia';

createPage({
  setup() {
    const user = useUserStore();

    // 默认是 静态对象,  使用 storeToRefs 包裹转换成 响应式对象
    const { isLogin, getUserInfo } = storeToRefs(user);

    const handleLogin = () => {
      mpx
        .showActionSheet({
          itemList: ['管理员', '普通用户', '匿名用户'],
        })
        .then((res: any) => {
          console.log(res.tapIndex);

          user.login();
        })
        .catch((err: any) => {
          console.log(err);
        });
    };

    return {
      isLogin,
      getUserInfo,

      handleLogin,
    };
  },
});
