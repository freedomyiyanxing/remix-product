import React from 'react';
import { Outlet } from 'react-router';

export default function main() {
  return (
    <div>
      <h1>
        主页
      </h1>
      <Outlet />
    </div>
  )
}
