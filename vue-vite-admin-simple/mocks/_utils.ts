import { nanoid } from "nanoid";

export const uuid = () => nanoid();

type Recordable<T = any> = Record<string, T>;

export function resultSuccess<T = Recordable>(result: T, message = "ok") {
  return {
    code: 0,
    data: result,
    message,
    type: "success",
  };
}

export function resultPageSuccess<T = any>(page: number, pageSize: number, list: T[], { message = "ok" } = {}) {
  const pageData = pagination(page, pageSize, list);

  return {
    ...resultSuccess({
      items: pageData,
      total: list.length,
    }),
    message,
  };
}

export function resultError({ code = -1, result = null } = {}, message = "Request failed") {
  return {
    code,
    data: result,
    message,
    type: "error",
  };
}

export function pagination<T = any>(pageNo: number, pageSize: number, array: T[]): T[] {
  const offset = (pageNo - 1) * Number(pageSize);
  const ret =
    offset + Number(pageSize) >= array.length
      ? array.slice(offset, array.length)
      : array.slice(offset, offset + Number(pageSize));
  return ret;
}
