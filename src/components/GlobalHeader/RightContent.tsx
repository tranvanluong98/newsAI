import {  Button,Modal,Icon} from 'antd';
import React from 'react';
import { connect } from 'dva';
import { ConnectProps, ConnectState } from '@/models/connect';

import Avatar from './AvatarDropdown';
import styles from './index.less';
import { router } from 'umi';

export type SiderTheme = 'light' | 'dark';
export interface GlobalHeaderRightProps extends ConnectProps {
  theme?: SiderTheme;
  layout: 'sidemenu' | 'topmenu';
}

const GlobalHeaderRight: React.SFC<GlobalHeaderRightProps> = props => {
  const { theme, layout } = props;
  let className = styles.right;
  const {confirm} = Modal;
  const handleLogout = ()=>{
    confirm({
      
      title:'Bạn đã chắc chắn muốn đăng xuất ?',
      onOk(){
        localStorage.clear();
        router.replace('/login')
      }
    })
   
  }
  if (theme === 'dark' && layout === 'topmenu') {
    className = `${styles.right}  ${styles.dark}`;
  }

  return (
    <div className={className}>

      <Avatar />
      <Button className={styles.action} style={{marginRight:'20px'}} onClick={handleLogout} ><Icon type="logout" /> Đăng Xuất </Button>
    </div>
  );
};

export default connect(({ setting }: ConnectState) => ({
  theme: setting.navTheme,
  layout: setting.layout,
}))(GlobalHeaderRight);
