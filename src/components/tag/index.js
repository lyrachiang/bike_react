import React from 'react';
import classNames from 'classnames/bind';

import styles from './tag.module.scss';

const cx = classNames.bind(styles);

// type: normal, pause, stop
// theme: status, service
const Tag = (props) => {
  const {
    type,
    theme,
    children,
    className,
  } = props;

  const customClass = {
    [`tag_${type}`]: type,
    [`tag_${theme}`]: theme,
    [className]: className,
  };

  return (
    <div className={cx('tag', customClass)}>
      {children}
    </div>
  );
};

export default Tag;
