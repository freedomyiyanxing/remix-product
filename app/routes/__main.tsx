import React from 'react';
import { Outlet } from 'react-router';
import { useLoaderData } from '@remix-run/react';

export async function loader() {
  return {
    NODE_ENV_1: process.env.NODE_DEMO_1
  }
}

export default function main() {
  const data = useLoaderData();
  console.log(data.NODE_ENV_1);
  return (
    <div>
      <h2> {process.env.NODE_ENV}</h2>
      <h3>{data.NODE_ENV_1}</h3>
      <h1>
        主页
      </h1>
      <Outlet />
    </div>
  )
}
