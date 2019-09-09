import { Icon, Button, Tabs } from 'antd';
import React, { useState, useMemo, useEffect } from 'react';
import classnames from 'classnames';

import usePrevious from '@/hooks/usePrevious';
import checkIfNotNullOrUnd from '@/utils/checkIfNotNullOrUnd';
import theme from '@/common.less';

import styles from './index.less';

const DrawerContent = ({
  children,
  goTo,
  back,
  className,
  passProps,
  version,
  initActiveTab,
  ...rest
}) => {
  const childrenArray = useMemo(
    () =>
      Array.isArray(children) ? children : React.Children.toArray(children),
    [children],
  );

  const previousVersion = usePrevious(version);

  const [activeTab, updateActiveTab] = useState(
    checkIfNotNullOrUnd(initActiveTab)
      ? initActiveTab
      : childrenArray[0] && childrenArray[0].props.name,
  );

  useEffect(() => {
    if (
      checkIfNotNullOrUnd(initActiveTab) &&
      activeTab !== initActiveTab &&
      version !== previousVersion
    ) {
      updateActiveTab(initActiveTab);
    }
  }, [activeTab, initActiveTab, previousVersion, version]);

  const tabsContent = useMemo(() => {
    const tC = {};
    childrenArray.forEach(child => {
      if (child.props.name) {
        tC[child.props.name] = child;
      }
    });
    return tC;
  }, [childrenArray]);

  const title = useMemo(() => {
    if (!children) {
      return null;
    }
    if (childrenArray.length === 1 && children.props.hasBack) {
      return (
        <div className={styles.header}>
          <Button
            className={classnames(theme.flex, theme.iconBtn)}
            onClick={back}
          >
            <Icon type="arrow-left" />
          </Button>
          <div className={classnames(theme.inlineBlock, styles.title)}>
            {children.props.title}
          </div>
        </div>
      );
    }
    console.log('rerender drawerContent');
    return (
      <Tabs activeKey={activeTab} onChange={key => updateActiveTab(key)}>
        {childrenArray.map(
          tab =>
            tab.props.name && (
              <Tabs.TabPane tab={tab.props.title} key={tab.props.name} />
            ),
        )}
      </Tabs>
    );
  }, [activeTab, back, children, childrenArray]);
  if (!children) {
    return null;
  }
  return (
    <div
      className={classnames(
        {
          [styles.multiTabs]:
            childrenArray.length === 1 && children.props.hasBack,
        },
        className,
      )}
      {...rest}
    >
      {title}
      <div className={styles.mainContent}>
        {activeTab &&
          tabsContent[activeTab] &&
          React.cloneElement(tabsContent[activeTab], {
            goTo,
            back,
            passProps: {
              ...passProps,
              goTo,
              back,
            },
          })}
      </div>
    </div>
  );
};

export default DrawerContent;
