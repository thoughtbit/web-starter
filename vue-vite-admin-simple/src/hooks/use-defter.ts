import { ref, getCurrentInstance, onUnmounted } from "vue";

export function useDefer(maxFrameCount = 100) {
  // 定义一个计数器变量，用于控制 defer 动画的次数，当为 0
  const frameCount = ref(0);
  // 获取当前实例对象，可以是 vm 对象或自定义实例。
  // 这个对象包含了一些方法，用于控制动画。
  //（请参见该实例的方法） 创建 defer 动画时，将 frameCount.value 加 1 并将其写入到动画定时器中，每当该变量的值大于等于 1 时，
  // 将重新开始定时器，以便在定时器中计数。
  const instance = getCurrentInstance();
  let rafId: number;
  function updateFrameCount() {
    rafId = requestAnimationFrame(() => {
      // requestAnimationFrame来设置当前已经渲染到哪一帧了
      frameCount.value++;
      if (frameCount.value >= maxFrameCount) {
        cancelAnimationFrame(rafId);
        return;
      }
      updateFrameCount();
    });
  }
  updateFrameCount();

  onUnmounted(() => {
    cancelAnimationFrame(rafId);
  }, instance);

  return function defer(showInFrameCount: number) {
    return frameCount.value >= showInFrameCount;
  };
}

/*
const defer = useDefer(100)
defer(1), 直接返回true 和 false
defer(n), 直接返回true 和 false
*/
