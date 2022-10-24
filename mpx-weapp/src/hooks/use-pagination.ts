import { watch, isRef, computed, ref } from '@mpxjs/core';
import type { Ref } from '@mpxjs/core';
import { isNumber, minMax } from '@/utils/util';
import { MaybeRef } from './types';

/**
 * Pagination control
 */
export type PaginationControl = () => void;

/**
 * Pagination result object
 */
export interface PaginationResult {
  /**
   * @reactive
   * Current page size
   */
  pageSize: Ref<number>;
  /**
   * Total number of items
   */
  total: Ref<number>;

  /**
   * @reactive
   * Current page
   */
  currentPage: Ref<number>;

  /**
   * @reactive
   * Current offset
   */
  offset: Ref<number>;

  /**
   * @readonly
   * Last page number
   */
  lastPage: Readonly<Ref<number>>;

  /**
   * go next page
   */
  next: PaginationControl;
  /**
   * go prev page
   */
  prev: PaginationControl;
  /**
   * go first page
   */
  first: PaginationControl;
  /**
   * go last page
   */
  last: PaginationControl;
}

/**
 * Pagination Options
 */
export interface PaginationOptions {
  /**
   * @reactive
   * Page size
   */
  pageSize: MaybeRef<number>;
  /**
   * @reactive
   * Total number of pages
   */
  total: MaybeRef<number>;
  /**
   * @reactive
   * Starting page
   */
  currentPage: MaybeRef<number>;
}

// const DEV = process.env.NODE_ENV === 'development';

export function wrap(o: any): any {
  return isRef(o) ? o : ref(o); // NOTE in v3 this is not necessary
}

/**
 * Create a pagination controller based on the arguments
 * @param options -
 */
export function usePagination(options: PaginationOptions): PaginationResult {
  const _currentPage = wrap(options.currentPage);
  const _pageSize = wrap(options.pageSize);
  const _offset = ref(0);
  const total = wrap(options.total);

  const offset = computed<number>({
    get() {
      return _offset.value;
    },
    set(v) {
      if (!isNumber(v)) {
        /* istanbul ignore else */
        // if (DEV) {
        //   console.warn(`[offset] expected number but got: '${typeof v}' value: '${v}'`);
        // }
        return;
      }
      _offset.value = Math.min(v, total.value);
    },
  });

  const currentPage: Ref<number> = computed<number>({
    get() {
      return _currentPage.value;
    },
    set(v) {
      if (!isNumber(v)) {
        /* istanbul ignore else  */
        // if (DEV) {
        //   console.warn(`[currentPage] expected number but got: '${typeof v}' value: '${v}'`);
        // }
        return;
      }
      _currentPage.value = minMax(v, 1, lastPage.value);
      // set the offset
      offset.value = (_currentPage.value - 1) * pageSize.value;
    },
  });

  const pageSize = computed<number>({
    get() {
      return _pageSize.value;
    },
    set(v) {
      if (!isNumber(v)) {
        /* istanbul ignore else */
        // if (DEV) {
        //   console.warn(`[pageSize] expected number but got: '${typeof v}' value: '${v}'`);
        // }
        return;
      }
      _pageSize.value = v;
    },
  });

  const lastPage = computed(() => Math.ceil(total.value / pageSize.value));
  // make sure the current page is the correct value
  currentPage.value = _currentPage.value;

  const prev = () => --currentPage.value;
  const next = () => ++currentPage.value;
  const first = () => (currentPage.value = 1);
  const last = () => (currentPage.value = lastPage.value);

  watch(
    [total, pageSize],
    () => {
      if (currentPage.value > lastPage.value) {
        currentPage.value = lastPage.value;
      }
    },
    { immediate: false } // no need to run on first render
  );

  return {
    // Mutable state
    pageSize,
    total,
    currentPage,
    offset,

    // Computed
    lastPage,

    // Functions
    next,
    prev,
    first,
    last,
  };
}

/*
const arrayRef = ref(new Array(100).fill(1).map((_, i) => i));
// paginate array
const { currentPage, lastPage, next, prev, offset, pageSize } = usePagination({
  currentPage: 1,
  pageSize: 10,
  total: computed(() => arrayRef.value.length),
});

const result = computed(() => {
  const array = arrayRef.value;
  if (!Array.isArray(array)) return [];
  return array.slice(offset.value, offset.value + pageSize.value);
});

return {
  currentPage,
  lastPage,
  next,
  prev,
  result,
};
*/
