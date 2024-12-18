import { ref, UnwrapRef } from "vue";
import { AxiosResponse } from "axios";
import { HttpResponse } from "@/services/request";
import { useLoading } from "@/hooks";

export function useRequest<T>(
  api: () => Promise<AxiosResponse<HttpResponse>>,
  defaultValue = [] as unknown as T,
  isLoading = true,
) {
  const { loading, setLoading } = useLoading(isLoading);
  const response = ref<T>(defaultValue);
  api()
    .then((res) => {
      response.value = res.data as unknown as UnwrapRef<T>;
    })
    .finally(() => {
      setLoading(false);
    });
  return { loading, response };
}
