import React from 'react';
import { Button } from '@mui/material';
import Layout from '~/common/sht-layout';
import axios from 'axios';

const clientInstance = axios.create({
  baseURL: 'http://t.bomman.com',
})

export default function () {
  const handleLogin = async () => {
    const res = await clientInstance.post('/api/mall-auth/mall/token');
    console.log('login', res);
  }

  return (
    <Layout>
      <h1>登录页面</h1>

      <Button variant="contained" onClick={handleLogin}>点击登录</Button>
    </Layout>
  )
}
