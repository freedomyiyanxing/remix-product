import React from 'react';
import { Outlet } from 'react-router';
import { Link } from '@remix-run/react';

export default function () {
  return (
    <div>
      <h1>Container</h1>
      <Link to="/">to home</Link>
      <Outlet />
    </div>
  )
}
