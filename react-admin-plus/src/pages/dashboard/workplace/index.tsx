import { memo } from 'react';

import styles from './index.module.scss';

export const Workplace = () => {
  return <div className={styles.wrapper}>工作台</div>;
};
export default memo(Workplace);
