import mpx, { createPage, ref, reactive, toRefs, onMounted, onUnmounted } from '@mpxjs/core';
import { useUserStore } from '@/stores';
import { storeToRefs } from '@mpxjs/pinia';

createPage({
  setup() {
    const user = useUserStore();

    // 默认是 静态对象,  使用 storeToRefs 包裹转换成 响应式对象
    const { isLogin, getUserInfo } = storeToRefs(user);

    const timer = ref();
    const location = reactive({
      latitude: 30,
      longitude: 120,
    });
    const scale = ref(12);
    const markers = ref([
      {
        iconPath: 'https://blog.moocss.com/icons/car.png',
        id: 0,
        latitude: 30,
        longitude: 120,
        width: 20,
        height: 20,
      },
    ]);

    const setupLocationUpdator = () => {
      mpx.startLocationUpdate({
        fail: console.error,
      });
      mpx.onLocationChange((loc) => {
        console.log('onLocationChange:', loc);
        location.latitude = loc.latitude;
        location.longitude = loc.longitude;
      });
    };

    const setupTimer = () => {
      timer.value = setInterval(() => {
        console.log('setupTimer');
        // 定时拉取小汽车上传的轨迹服务

        // 定位
        location.latitude = 30;
        location.longitude = 120;

        // 小汽车绘制
        markers.value[0].latitude = 30;
        markers.value[0].longitude = 120;
      }, 1000);
    };

    onMounted(() => {
      setupLocationUpdator();
      setupTimer();
    });

    onUnmounted(() => {
      mpx.stopLocationUpdate();
      if (timer.value) {
        clearInterval(timer.value);
      }
    });

    return {
      isLogin,
      getUserInfo,

      ...toRefs(location),
      scale,
      markers,
    };
  },
});
