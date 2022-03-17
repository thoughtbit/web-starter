import React from 'react';
import styles from './my-projecs.styles.scss';

const MyProjects = () => {
  return <div className={styles['project-wrapper']}>我的项目组件</div>;
};

export default React.memo(MyProjects);
