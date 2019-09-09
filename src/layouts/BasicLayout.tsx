/**
 * Ant Design Pro v4 use `@ant-design/pro-layout` to handle Layout.
 * You can view component api by:
 * https://github.com/ant-design/ant-design-pro-layout
 */

import { connect } from 'dva';
import { formatMessage } from 'umi-plugin-react/locale';
import Link from 'umi/link';
import ProLayout, {
  MenuDataItem,
  BasicLayoutProps as ProLayoutProps,
  Settings,
} from '@ant-design/pro-layout';
import React, { useEffect, useState, useCallback } from 'react';
import styles from './BasicLayout.less';

import { ConnectState, Dispatch } from '@/models/connect';
import { isAntDesignPro } from '@/utils/utils';
import Authorized from '@/utils/Authorized';
import NavRightContent from '@/components/GlobalHeader/NavRightContent';
import authProvider from '@/services/authProvider';
import { AUTH_CHECK } from '@/core/authFetchActions';
import { router } from 'umi';
import { Button } from 'antd';

// import logo from '../assets/logo.svg';

export interface BasicLayoutProps extends ProLayoutProps {
  breadcrumbNameMap: {
    [path: string]: MenuDataItem;
  };
  settings: Settings;
  dispatch: Dispatch;
}
export type BasicLayoutContext = { [K in 'location']: BasicLayoutProps[K] } & {
  breadcrumbNameMap: {
    [path: string]: MenuDataItem;
  };
};

/**
 * use Authorized check all menu item
 */
const menuDataRender = (menuList: MenuDataItem[]): MenuDataItem[] =>
  menuList.map(item => {
    const localItem = {
      ...item,
      children: item.children ? menuDataRender(item.children) : [],
    };
    return Authorized.check(item.authority, localItem, null) as MenuDataItem;
  });

const footerRender: BasicLayoutProps['footerRender'] = (_, defaultDom) => {
  if (!isAntDesignPro()) {
    return defaultDom;
  }
  return (
    
    <>
      {defaultDom}
      <div
        style={{
          padding: '0px 24px 24px',
          textAlign: 'center',
        }}
      >
        <a
          href="https://www.netlify.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://www.netlify.com/img/global/badges/netlify-color-bg.svg"
            width="82px"
            alt="netlify logo"
          />
        </a>
      </div>
    </>
  );
};

const BasicLayout: React.FC<BasicLayoutProps> = props => {
  const { dispatch, children, location } = props;
  const headerRender = null;
  const settings = { ...props.settings, headerRender };
  /**
   * constructor
   */
  const [isLoggedIn, updateIsLoggedIn] = useState(true);

  const checkAuth = useCallback(async () => {
    try {
      await authProvider(AUTH_CHECK);
      updateIsLoggedIn(true);
    } catch (error) {
      updateIsLoggedIn(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace('/login');
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'user/fetchCurrent',
      });
      dispatch({
        type: 'settings/getSetting',
      });
    }
  }, [dispatch]);

  /**
   * init variables
ig */
  const handleMenuCollapse = (payload: boolean): void =>
    dispatch &&
    dispatch({
      type: 'global/changeLayoutCollapsed',
      payload,
    });

  return (
    <div className={styles.layOutWithNavHeader}>
      <ProLayout
        title="NEWS AI ADMIN"
        logo="https://scontent.fhan2-1.fna.fbcdn.net/v/t1.0-9/57750951_840007249672139_8925037840333537280_n.png?_nc_cat=106&_nc_oc=AQli91INBWo2TvNUz1OENOakxLlvMPsU6rurkWq3cx4Vg9wpWFEPYKQU02CSzJLJwQw&_nc_ht=scontent.fhan2-1.fna&oh=ff0e2b633e713390da78ce659f938ee2&oe=5DE22B5A"
        sliderWidth={254}
        onCollapse={handleMenuCollapse}
        menuItemRender={(menuItemProps, defaultDom) => {
          if (menuItemProps.isUrl) {
            return defaultDom;
          }
          return <Link to={menuItemProps.path}>{defaultDom}</Link>;
        }}
        breadcrumbRender={(routers = []) => [
          {
            path: '/',
            breadcrumbName: formatMessage({
              id: 'menu.home',
              defaultMessage: 'Home',
            }),
          },
          ...routers,
        ]}
        itemRender={(route, params, routes, paths) => {
          const first = routes.indexOf(route) === 0;
          return first ? (
            <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
          ) : (
            <span>{route.breadcrumbName}</span>
          );
        }}
        footerRender={() => <div />}
        menuDataRender={menuDataRender}
        formatMessage={formatMessage}
        rightContentRender={rightProps => (
          <NavRightContent {...rightProps} location={location} />
        )}
        {...props}
        {...settings}
      >
        {children}
       
      </ProLayout>
      

    </div>
  );
};

export default connect(({ global, setting }: ConnectState) => ({
  collapsed: global.collapsed,
  setting,
}))(BasicLayout);
