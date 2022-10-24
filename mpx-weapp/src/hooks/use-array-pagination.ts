import { computed } from '@mpxjs/core';
import type { ComputedRef } from '@mpxjs/core';
import { wrap, usePagination, PaginationResult, PaginationOptions } from './use-pagination';
import { MaybeRef } from './types';

export interface ArrayPaginationResult<T extends Array<any>> extends PaginationResult {
  result: ComputedRef<T>;
}

// eslint-disable-next-line no-use-before-define
export function useArrayPagination<T extends Array<TR>, TR>(
  array: MaybeRef<T>,
  options?: Partial<Omit<PaginationOptions, 'total'>>
): ArrayPaginationResult<T>;
export function useArrayPagination<T extends Array<any>>(
  array: MaybeRef<T>,
  options?: Partial<Omit<PaginationOptions, 'total'>>
): ArrayPaginationResult<T> {
  const arrayRef = wrap(array);

  const pagination = usePagination({
    ...{
      currentPage: 1,
      pageSize: 10,
    },
    ...options,
    total: computed(() => arrayRef.value.length),
  });

  const result = computed(() => {
    const array = arrayRef.value;
    if (!Array.isArray(array)) return [];
    return array.slice(pagination.offset.value, pagination.offset.value + pagination.pageSize.value);
  }) as ComputedRef<T>;

  return {
    ...pagination,
    result,
  };
}

/*
const array = new Array(1000).fill(0).map((_, i) => i);
const { result, next, prev, currentPage, lastPage } = useArrayPagination(
  array,
  {
    pageSize: 3
  }
);

return { result, next, prev, currentPage, lastPage };
*/
