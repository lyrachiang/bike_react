import React from 'react';
import classNames from 'classnames/bind';

import styles from './container.module.scss';

const cx = classNames.bind(styles);

export const MainFilter = (props) => {
  const { children, className } = props;
  return (
    <div className={cx('main_filter', {[className]: className})}>
      <div>
        <div>
          {children}
        </div>
        <div className={cx('footer_container')}>
          <p>© 2021 我覺得這個才對, Inc. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export const MapResult = (props) => {
  const { children } = props;
  return (
    <div className={cx('map_result')}>
      {children}
    </div>
  );
};

const Container = (props) => {
  const { children, className } = props;

  const customClass = {
    [className]: className,
  };

  return (
    <div className={cx('container', customClass)}>
      {children}
    </div>
  );
};

export default Container;
