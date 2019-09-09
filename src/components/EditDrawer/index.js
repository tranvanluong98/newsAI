import { Button, Drawer, Icon, Tabs } from 'antd';
import React, { useCallback, useState, useMemo, useEffect } from 'react';
import classnames from 'classnames';

import theme from '@/common.less';
import styles from './index.less';

const EditDrawerTabs = ({
  visible,
  children,
  resource,
  id,
  basePath,
  redirectOnSuccess,
  ...rest
}) => <Drawer width={520} visible={visible} {...rest} />;

EditDrawerTabs.whyDidYouRender = true;

export default React.memo(EditDrawerTabs);
