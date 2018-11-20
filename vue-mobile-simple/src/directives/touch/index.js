export default {
  install: (Vue) => {
    Vue.directive('touch', {
      bind(el, binding, vnode) {
        let passiveSupported = false;

        // 传入的模式 press swipeRight swipeLeft swipeTop swipeDowm
        const touchType = binding.arg;
        
        let timeOutEvent = 0;
        let direction = '';

        // 滑动处理
        let startX;
        let startY;

        // 启用passive mode
        try {
          const options = Object.defineProperty({}, 'passive', {
            get() {
              passiveSupported = true;
            },
          });
          window.addEventListener('test', null, options);
        } catch (err) {}
        function fn() {
          console.log('fn');
        }

        // 返回角度
        function GetSlideAngle(dx, dy) {
          return Math.atan2(dy, dx) * 180 / Math.PI;
        }

        // 根据起点和终点返回方向 1：向上，2：向下，3：向左，4：向右,0：未滑动
        function GetSlideDirection(startX, startY, endX, endY) {
          const dy = startY - endY;
          const dx = endX - startX;
          let result = 0;

          // 如果滑动距离太短
          if (Math.abs(dx) < 2 && Math.abs(dy) < 2) {
            return result;
          }

          const angle = GetSlideAngle(dx, dy);
          if (angle >= -45 && angle < 45) {
            result = 'swiperight';
          } else if (angle >= 45 && angle < 135) {
            result = 'swipeup';
          } else if (angle >= -135 && angle < -45) {
            result = 'swipedown';
          } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
            result = 'swipeleft';
          }
          return result;
        }

        el.addEventListener('touchstart', (ev) => {
          startX = ev.touches[0].pageX;
          startY = ev.touches[0].pageY;

          // 判断长按
          timeOutEvent = setTimeout(() => {
            timeOutEvent = 0;
            if (touchType === 'press') {
              binding.value(vnode);
            }
          }, 500);
        }, passiveSupported ? { passive: true } : false);

        el.addEventListener('touchmove', (ev) => {
          clearTimeout(timeOutEvent);
          timeOutEvent = 0;
        }, passiveSupported ? { passive: true } : false);

        el.addEventListener('touchend', (ev) => {
          let endX,
            endY;
          endX = ev.changedTouches[0].pageX;
          endY = ev.changedTouches[0].pageY;
          direction = GetSlideDirection(startX, startY, endX, endY);

          clearTimeout(timeOutEvent);

          switch (direction) {
            case 0:

              break;
            case 'swipeup':
              if (touchType === 'swipeup') {
                binding.value();
              }
              break;
            case 'swipedown':
              if (touchType === 'swipedown') {
                binding.value();
              }
              break;
            case 'swipeleft':
              if (touchType === 'swipeleft') {
                binding.value(vnode);
              }
              break;
            case 'swiperight':
              if (touchType === 'swiperight') {
                binding.value();
              }
              break;
            default:
          }
        }, passiveSupported ? { passive: true } : false);
      },
    });
  },
};

/*
<figure
  v-touch:swipeleft="handleSwipeleft"
  v-touch:swiperight="handleSwiperight"
  v-touch:swipeup="handleSwipeup"
  v-touch:swipedown="handleSwipedown"
  v-touch:press="handlePress">
</figure>
methods: {
  handleSwipeleft(){
    alert('左滑了')
 },
 handleSwiperight(){
    alert('右滑了')
 }, handleSwipeup(){
    alert('上滑了')
 }, handleSwipedown(){
    alert('下滑了')
 }, handlePress(){
    alert('按住了')
 }
}

*/