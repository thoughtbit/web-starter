import React, { memo } from 'react';
import type { BrowserRouterProps } from 'react-router-dom';
import MyTeam from './components/my-team';

import styles from 'index.styles.scss';
import MyProjects from './components/my-projects';

const UserInfo: React.FC<BrowserRouterProps> = () => {
  return (
    <div className={styles['page-user-info']}>
      <MyTeam />
      <MyProjects />
    </div>
  );
};

export default memo(UserInfo);
