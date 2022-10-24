import React from 'react';
import PropTypes from 'prop-types';

import cs from 'classnames';
import styles from './index.module.scss';

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

Footer.defaultProps = {
  children: null,
}

Footer.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
}

export default Footer;
