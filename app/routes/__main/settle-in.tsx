import React from 'react';
import { useParams, useLocation } from 'react-router';

export default function () {
  const params = useParams();
  const location  = useLocation();
  console.log(params, location);
  return (
    <div>{location.pathname}</div>
  )
}
