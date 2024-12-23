import { useMutation, useQuery } from '@tanstack/react-query';
import { ajax } from '@/services';

function useResource<t>(resource: string) {
  const query = useQuery({
    queryKey: [resource],
    queryFn: () => ajax.get(`/${resource}`).then(res => res.data),
    // 配置缓存策略
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    // 重试策略
    retry: 3,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000)
  })

  const mutation = useMutation({
    mutationFn: (data: Partial<t>) => ajax.post(`/${resource}`, data),
    onSuccess: () => {
      // 更新缓存
      query.invalidate()
    }
  })

  return {
    data: query.data,
    isLoading: query.isLoading,
    error: query.error,
    create: mutation.mutate,
    isCreating: mutation.isLoading
  }
}

/*
// 使用示例
function UserList() {
  const { data: users, isLoading, error } = useResource<user>('users')

  if (isLoading) return <loading />
  if (error) return <error message="{error.message}" />

  return (
    <div>
      {users.map(user => (
        <usercard key="{user.id}" user="{user}" />
      ))}
    </div>
  )
}
*/