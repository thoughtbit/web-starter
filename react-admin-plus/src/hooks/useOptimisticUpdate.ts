import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { QueryKey } from "@tanstack/react-query";

function useOptimisticUpdate<T>(
  queryKey: QueryKey,
  mutationFn: (data: T) => Promise<T>
) {
  const queryClient = useQueryClient();
  
  return useMutation<T, Error, T, {
    previous: unknown;
  }>({
    mutationFn,
    onMutate: async (newData: T) => {
      await queryClient.cancelQueries({queryKey});
      const previous = queryClient.getQueryData(queryKey);
      
      queryClient.setQueryData(queryKey, (old: T[] | undefined) => {
        return Array.isArray(old)
          ? [...old, newData]
          : [newData];
      });
      
      return { previous };
    },
    
    onError: (err, payload, context) => {
      if (context?.previous) {
        queryClient.setQueryData(queryKey, context?.previous);
      }
    },
    
    onSettled: () => {
      queryClient.invalidateQueries({queryKey});
    }
  });
}

/*
function ProductList() {
  const optimisticUpdate = useOptimisticUpdate('products', api.createProduct);
  
  const handleAdd = async (product) =&gt; {
    try {
      await optimisticUpdate.mutateAsync(product);
      toast.success('产品添加成功！');
    } catch (error) {
      toast.error('添加失败，请重试');
    }
  };
  
  return ();
}
*/