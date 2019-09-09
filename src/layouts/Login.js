import React, { useState, useEffect, useCallback } from 'react';
import { Form, Icon, Input, Button, Typography } from 'antd';
import { router } from 'umi';
import { connect } from 'dva';
import authProvider from '@/services/authProvider';
import { AUTH_LOGIN, AUTH_CHECK } from '@/core/authFetchActions';

const { Title } = Typography;

const Login = () => {
  const [isLoggedIn, updateIsLoggedIn] = useState(false);

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
    if (isLoggedIn) {
      router.replace('/users');
    }
  }, [isLoggedIn]);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = async () => {
    try {
      await authProvider(AUTH_LOGIN, {
        username,
        password,
      });
      checkAuth();
    } catch (error) {
      console.log('Dang nhap that bai');
    }
  };

  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
      }}
    >
      <Title level={2} style={{ textAlign: 'center' }}>
        NEWS AI ADMIN
      </Title>
      <Form className="login-form" style={{ display: 'block', width: '400px' }}>
        <Form.Item>
          <Input
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Tên tài khoản"
            onChange={e => setUsername(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Input
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            type="password"
            placeholder="Mật khẩu"
            onChange={e => setPassword(e.target.value)}
          />
        </Form.Item>

        <Button
          style={{ textAlign: 'center' }}
          type="primary"
          htmlType="submit"
          className="login-form-button"
          onClick={handleLogin}
        >
          Đăng nhập
        </Button>
      </Form>
    </div>
  );
};
export default connect(state => ({
  isLoggedIn: state.auth.isLoggedIn,
}))(Login);
