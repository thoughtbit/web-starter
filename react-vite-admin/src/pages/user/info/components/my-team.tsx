import React from 'react';
import styles from './my-team.styles.scss';

const MyTeam = () => {
  return <div className={styles['team-wrapper']}>我的团队组件</div>;
};

export default React.memo(MyTeam);
