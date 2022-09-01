import React from 'react';
import { Link } from '@remix-run/react';

const a = [1,2,3];

export default function () {
  return (
    <div>
      <h1>首页11</h1>
      {
        a.map((v) => (
          <p key={v}>{v}</p>
        ))
      }
      <Link to="/test">测试页</Link>
      <Link to="/error">测试错误页面</Link>
    </div>
  )
}
