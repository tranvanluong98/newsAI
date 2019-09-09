import { withRouter } from 'umi';
import React from 'react';
import classnames from 'classnames';

import RightContent from '@/components/GlobalHeader/RightContent';
import commonStyles from '@/common.less';
import headerNavs from '@/components/GlobalHeader/headerNav';

import styles from './index.less';

const NavRightContent = ({ ...rightProps }) => {
  const { pathname } = rightProps.location;
  const { history } = rightProps;
  const headerNav = headerNavs.find(nav => nav.regex.test(pathname)) || {};
  const { navs = [] } = headerNav;
  return (
    <div
      className={classnames(styles.fullRight, commonStyles.flexSpaceBetween)}
    >
      <div className={commonStyles.flex}>
        {navs.map(nav => (
          <div
            className={classnames(styles.navHeaderItem, {
              [styles.active]: pathname === nav.path,
            })}
            onClick={() => history.push(nav.path)}
          >
            {nav.name}
          </div>
        ))}
      </div>
      <RightContent {...rightProps} />
    </div>
  );
};

export default withRouter(NavRightContent);
