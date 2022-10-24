import { useEffect, useRef } from "react";

/** 循环绑定事件的性能优化方案
 * 缓存多个函数的钩子
 * 根据给定的数组，生成对应数量的回调函数并缓存，并当目标数组或依赖数组的长度/成员发生变化时，重新生成
 *
 * @param depArray 需要循环的数组
 * @param callbackMapper 生成对应回调函数的柯里化函数，使用与Array.map方法相同的参数，返回用于绑定事件的函数
 * @param dependencies 外部依赖，如果这里加入了depArray本身，那可能需要尝试其他的优化方案了
 * @returns {function[]} 生成回调函数数组
 */
export default function useCallbackList<ItemType, ItemCallback>(
  depArray: ItemType[],
  callbackMapper: (item: ItemType, index: number, array: ItemType[]) => ItemCallback,
  dependencies: any[]
): ItemCallback[] {
  //用于缓存依赖数组
  const prevArray = useRef<ItemType[]>([]);

  //用于缓存生成的回调列表
  const storedResult = useRef<ItemCallback[]>([]);

  //用于缓存外部依赖的数组
  const prevDependencies = useRef<any[]>(dependencies);
  useEffect(() => {
    return () => {
      // 善后
      prevArray.current = [];
      storedResult.current = [];
      prevDependencies.current = [];
    };
  }, []);
  if (
    //如果依赖数组长度变化
    dependencies.length !== prevDependencies.current.length ||
    //如果依赖数组成员变化
    prevDependencies.current.some((_item, _index) => _item !== dependencies[_index])
  ) {
    //重新生成所有回调
    storedResult.current = depArray.map(callbackMapper);
    //并将新的依赖缓存
    prevDependencies.current = [...dependencies];
  } else {
    //若依赖成员无变化，则按索引逐个比较新旧的目标数组成员
    depArray.forEach((_item, _index) => {
      if (_index > prevArray.current.length - 1 || prevArray.current[_index] !== _item) {
        //目标数组成员发生变化，或者长度变长时
        prevArray.current[_index] = _item;
        storedResult.current[_index] = callbackMapper(_item, _index, depArray);
      }
      //若对应索引下的值相同，否则什么都不用做
      //对于引用类型（数组、对象等）只判断内存地址，内部成员的变化无法感知

      //例如，假设有两个值相等的数组成员[...,13,13,...]
      //当第一个13被删除时（其索引为x），第二个13被提到了前者的位置x上，
      //由于索引相同，值相同，所以之前生成的函数依然可以作用在x位置上的'新'13，
    });
    //当数组变短时，删除多余的
    storedResult.current = storedResult.current.slice(0, depArray.length);
  }
  //无论如何，保存新的对象数组
  prevArray.current = [...depArray];
  return storedResult.current;
}
