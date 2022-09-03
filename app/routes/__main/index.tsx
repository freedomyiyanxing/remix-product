import React from 'react';
import { Link } from '@remix-run/react';

export default function () {
  return (
    <div>
      <h1>首页222222222222222222222222</h1>
      <div>
        <Link to="/test">测试页</Link>
      </div>
      <div>
        <Link to="/account">account</Link>
      </div>
      <Link to="/error">测试错误页面</Link>
    </div>
  )
}
