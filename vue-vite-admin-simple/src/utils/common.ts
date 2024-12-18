import { isObject, isEmpty } from "./is";

// 驼峰命名
export function toCamel(str: string): string {
  return str.replace(/^\S/, (m) => m.toUpperCase());
}

// 把驼峰转换成横杠连接
export const toLine = (value: string) => {
  return value.replace(/(A-Z)g/, "-$1").toLocaleLowerCase();
};

/**
 * @description 添加单位
 * @param {String | Number} value 值 100
 * @param {String} unit 单位 px em rem
 */
export const addUnit = (value: string | number, unit = "px") => {
  return !Object.is(Number(value), NaN) ? `${value}${unit}` : value;
};

/**
 * 参数处理
 * @param {*} params  参数
 */
export function tansParams(params: Recordable<any>) {
  let result = "";
  for (const propName of Object.keys(params)) {
    const value = params[propName];
    var part = encodeURIComponent(propName) + "=";
    if (value !== null && value !== "" && typeof value !== "undefined") {
      if (typeof value === "object") {
        for (const key of Object.keys(value)) {
          if (value[key] !== null && value[key] !== "" && typeof value[key] !== "undefined") {
            let params = propName + "[" + key + "]";
            var subPart = encodeURIComponent(params) + "=";
            result += subPart + encodeURIComponent(value[key]) + "&";
          }
        }
      } else {
        result += part + encodeURIComponent(value) + "&";
      }
    }
  }
  return result;
}

/**
 * @description对象格式化为Query语法
 * @param { Object } params
 * @return {string} Query语法
 */
export function objectToQuery(params: Record<string, any>): string {
  let query = "";
  for (const props of Object.keys(params)) {
    const value = params[props];
    const part = encodeURIComponent(props) + "=";
    if (!isEmpty(value)) {
      if (isObject(value)) {
        for (const key of Object.keys(value)) {
          if (!isEmpty(value[key])) {
            const params = props + "[" + key + "]";
            const subPart = encodeURIComponent(params) + "=";
            // @ts-ignore
            query += subPart + encodeURIComponent(value[key]) + "&";
          }
        }
      } else {
        query += part + encodeURIComponent(value) + "&";
      }
    }
  }
  return query.slice(0, -1);
}

// 验证是否为blob格式
export function blobValidate(data: any) {
  return data.type !== 'application/json'
}


/**
 * 构造树型结构数据
 * @param {*} data 数据源
 * @param {*} id id字段 默认 'id'
 * @param {*} parentId 父节点字段 默认 'parentId'
 * @param {*} children 孩子节点字段 默认 'children'
 */
export function handleTree(data: any, id: any, parentId?: any, children?: any) {
  const config = {
      id: id || 'id',
      parentId: parentId || 'parentId',
      childrenList: children || 'children',
  };

  const childrenListMap: any = {};
  const nodeIds: any = {};
  const tree: any = [];

  for (const d of data) {
      const parentId = d[config.parentId];
      if (childrenListMap[parentId] == null) {
          childrenListMap[parentId] = [];
      }
      nodeIds[d[config.id]] = d;
      childrenListMap[parentId].push(d);
  }

  for (const d of data) {
      const parentId = d[config.parentId];
      if (nodeIds[parentId] == null) {
          tree.push(d);
      }
  }

  for (const t of tree) {
      adaptToChildrenList(t);
  }

  function adaptToChildrenList(o: any) {
      if (childrenListMap[o[config.id]] !== null) {
          o[config.childrenList] = childrenListMap[o[config.id]];
      }
      if (o[config.childrenList]) {
          for (const c of o[config.childrenList]) {
              adaptToChildrenList(c);
          }
      }
  }
  return tree;
}


export function replaceHttps(url: string) {
  if (!url || typeof url !== 'string') return url;
  return url.replace(/^http:\/\//i, 'https://');
};
