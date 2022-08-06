export interface ResPage {
    current: number;
    pageSize: number;
    total: number;
  }
  
  export interface BaseRes<T> {
    code: number;
    msg: string;
    data: T;
    pagination?: ResPage;
  }
  
  export interface ErrorWithResponse<T> extends Error {
    response?: BaseRes<T>;
  }
  
  
  export interface RequestOptions<R, P extends any[]> {
    // 刷新依赖
    // deps = undefined. 不执行
    // deps = []. 首次自动执行
    // deps = [x]. 依赖变化了之后执行
    deps?: any[];
  
    // 请求参数
    // 自动执行时使用本参数进行请求
    params?: P[];
  
    // 默认 loading 状态. defalt false
    defaultLoading?: boolean;
  
    // 防抖等待时间 (ms). default 1000ms
    debounceWait?: number;
  
    // service throw exception 时回调
    onError?: (e: any) => void | boolean;
  
    // service 调用成功后回调. 如果返回 false, 则不进行后续的异常提示
    onSuccess?: (res: BaseRes<R>) => void | boolean;
  
    // 加载的文字提示. 设置为 false 则不显示.
    loadingText?:
      | {
          loading?: string; // 正在加载中的文字提示
          done?: string; // 加载成功的文字提示
        }
      | false;
  }
  
  export interface RequestType<R, P extends any[] = any> {
    // 响应的数据
    data?: R;
  
    // 分页数据 (如果有的话)
    pagination?: ResPage;
  
    // loading状态
    loading: boolean;
  
    // 发起请求，返回值是 service 的响应值
    run: (...args: P) => Promise<BaseRes<R> | undefined>;
  
    // 清空 data
    reset: () => void;
  
    // 防抖模式执行, 无返回值
    debounceRun: (...args: P) => void;
  }