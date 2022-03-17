import React from 'react';

import cs from 'classnames';
import styles from './index.styles.scss';

type FooterProps = {
  children?: React.ReactNode;
  className?: any;
};

const Footer: React.FC<FooterProps> = ({ children, className, ...restProps }) => {
  return (
    <div className={cs(styles.footer, className)} {...restProps}>
      {children}
    </div>
  );
};

export default Footer;
