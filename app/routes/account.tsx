import React from 'react';
import { Outlet } from 'react-router';
import { Link } from '@remix-run/react';
import Layout from '~/common/sht-layout';

export default function () {
  return (
    <Layout>
      <h1>Container</h1>
      <Link to="/">to home</Link>
      <Outlet />
    </Layout>
  )
}
