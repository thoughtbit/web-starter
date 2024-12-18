// 请求响应结构
// const users = ref<ResponseResult<UserModel>>()
interface ResponseResult<T> {
  code: number;
  message: string;
  status: "success" | "error";
  data: T;
}

// 分页请求响应结构
interface ResponsePageResult<T> {
  data: T[];
  links: { url?: string; label: string; active: boolean };
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    links: { first: string; last: string; prev?: any; next?: any }[];
    path: string;
    per_page: number;
    to: number;
    total: number;
  };
}
