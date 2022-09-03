import React from 'react';
import { Link } from '@remix-run/react';

const Error404: React.FC = () => {
  return (
    <div>
      <h1>404</h1>
      <Link to="/">回到首页</Link>
    </div>
  )
}

export default Error404;
