import React from 'react';
import { Button } from '@mui/material';
import Layout from '~/common/sht-layout';
import axios from 'axios';

const clientInstance = axios.create({
  headers: {
    Authorization: 'Basic b2tzaHQtbWFsbDpva3NodC1tYWxsX3NlY3JldA==',
    Accept: 'application/json',
  }
});

export default function () {
  const handleLogin = async () => {
    const res = await clientInstance.post('/api/mall-auth/mall/token', {
      'url': 'www.bomman.com/',
      'ip': '220.202.195.128',
      'eventType': 1,
      'clientTime': '2022-09-04 22:32:56',
      'convertLink': 'www.bomman.com/',
      'account': '15116112861',
      'grantType': 'mall-password',
      'password': 'qq1234'
    });
    console.log('login', res);
  }
1
  return (
    <Layout>
      <h1>title 1234</h1>
      <Button variant="contained" onClick={handleLogin}>点击登录</Button>
    </Layout>
  )
}
