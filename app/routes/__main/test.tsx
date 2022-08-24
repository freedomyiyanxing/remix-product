import React from 'react';
import { Link } from '@remix-run/react';

export default function () {
  return (
    <div>
      <h1>测试页面</h1>
      <Link to="/">回到首页</Link>
    </div>
  )
}
