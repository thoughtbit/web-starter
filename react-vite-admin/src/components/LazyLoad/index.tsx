import loadable from '@loadable/component';
import { Spin } from 'antd';
import styles from './index.module.scss';

// https://github.com/gregberge/loadable-components/pull/226
function load(fn: any, options: any) {
  const Component = loadable(fn, options);

  Component.preload = fn.requireAsync || fn;

  return Component;
}

function LoadingComponent(props: { error: boolean; timedOut: boolean; pastDelay: boolean }) {
  if (props.error) {
    console.error(props.error);
    return null;
  }
  return (
    <div className={styles.spin}>
      <Spin />
    </div>
  );
}

export default (loader: any) =>
  load(loader, {
    fallback: LoadingComponent({
      pastDelay: true,
      error: false,
      timedOut: false,
    }),
  });


// 使用
// lazyload(() => import('./pages/exception/403'))

