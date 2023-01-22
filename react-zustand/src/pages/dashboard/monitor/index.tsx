import { memo } from 'react';

import styles from './index.module.scss';

export const Workplace = () => {
  return <div className={styles.wrapper}>监控</div>;
};
export default memo(Workplace);
