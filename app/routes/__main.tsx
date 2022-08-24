import React from 'react';
import { Outlet } from 'react-router';
import { useLoaderData } from '@remix-run/react';
import axios from 'axios';

// http://t.bomman.com/api/mall-search/keyword?keyword=a
const serverInstance = axios.create({
  baseURL: 'http://t.bomman.com'
});

serverInstance.interceptors.response.use(
  (response) => {
    return response.data.data;
  }
)

export async function loader() {
  const res = await serverInstance.get('/api/mall-base/navigationbar/list/page?queryType=1');
  return {
    NODE_ENV_1: process.env.NODE_DEMO_1,
    data: (res as any).records,
  }
}

export default function main() {
  const { data, NODE_ENV_1 } = useLoaderData();
  return (
    <div>
      <h2> {process.env.NODE_ENV}</h2>
      <h3>{NODE_ENV_1}</h3>
      <h1>
        主页
      </h1>
      <div>
        {
          (data as any).map((v: any) => (
            <div key={v.id}>
              {v.name}
            </div>
          ))
        }
      </div>
      <Outlet />
    </div>
  )
}
