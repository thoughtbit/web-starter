import { useRef } from 'react';
import { isObject } from '@/utils';
import useCreation from './useCreation';
import useUpdate from './useUpdate';

// k:v 原对象:代理过的对象
const proxyMap = new WeakMap();
// k:v 代理过的对象:原对象
const rawMap = new WeakMap();

function observer<T extends Record<string, any>>(initialVal: T, cb: () => void): T {
  const existingProxy = proxyMap.get(initialVal);

  // 添加缓存 防止重新构建proxy
  if (existingProxy) {
    return existingProxy;
  }

  // 防止代理已经代理过的对象
  // https://github.com/alibaba/hooks/issues/839
  if (rawMap.has(initialVal)) {
    return initialVal;
  }

  const proxy = new Proxy<T>(initialVal, {
    get(target, key, receiver) {
      const res = Reflect.get(target, key, receiver);
      return isObject(res) ? observer(res, cb) : res;
    },
    set(target, key, val) {
      const ret = Reflect.set(target, key, val);
      cb();
      return ret;
    },
    deleteProperty(target, key) {
      const ret = Reflect.deleteProperty(target, key);
      cb();
      return ret;
    },
  });

  proxyMap.set(initialVal, proxy);
  rawMap.set(proxy, initialVal);

  return proxy;
}

function useReactive<S extends Record<string, any>>(initialState: S): S {
  const update = useUpdate();
  const stateRef = useRef<S>(initialState);

  const state = useCreation(() => {
    return observer(stateRef.current, () => {
      update();
    });
  }, []);

  return state;
}

export default useReactive;

/*
export default () => {
  const state = useReactive({
    bug: '',
    bugs: ['feat', 'fix', 'chore'],
    addBug(bug) {
      this.bugs.push(bug);
    },
    get bugsCount() {
      return this.bugs.length;
    },
  });

  return (
    <div>
      <p>state.bugsCount: {state.bugsCount}</p>

      <form
        onSubmit={(e) => {
          state.addBug(state.bug);
          state.bug = '';
          e.preventDefault();
        }}
      >
        <input type="text" value={state.bug} onChange={(e) => (state.bug = e.target.value)} />
        <button type="submit" style={{ marginLeft: '10px' }}>
          Add
        </button>
        <button type="button" style={{ marginLeft: '10px' }} onClick={() => state.bugs.pop()}>
          Delete
        </button>
      </form>

      <br />

      <ul>
        {state.bugs.map((bug) => (
          <li key={bug}>{bug}</li>
        ))}
      </ul>
    </div>
  );
};
*/