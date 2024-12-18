import { onMounted, ref, Ref } from "vue";

export function useIsMounted(): Ref<boolean> {
  const isMounted = ref(false);

  onMounted(() => {
    isMounted.value = true;
  });

  return isMounted;
}
