import React, { CSSProperties } from 'react';
import { Outlet } from 'react-router';
import { Link, NavLink, useLoaderData } from '@remix-run/react';
import axios from 'axios';
import { Button, Box, AppBar, Toolbar, IconButton } from '@mui/material'
import Layout from '~/common/sht-layout';

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
  const { data } = useLoaderData();
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              Freedom.yi
            </IconButton>
            <Box
              sx={{
                flexGrow: 1,
                display: {
                  xs: 'flex',
                }
              }}
            >
              {
                (data as any).map((v: any) => (
                  <NavLink
                    key={v.id}
                    to={v.skipUrl}
                    style={({ isActive }) => {
                      return  isActive ? { textDecoration: 'none' } : {} as CSSProperties
                    }}
                  >
                    <Box component="div" sx={{ flexGrow: 1, py: 1, px: 2 }}>
                      {v.name}
                    </Box>
                  </NavLink>
                ))
              }
            </Box>
            <Link to="/login">
              <Button color="inherit">Login</Button>
            </Link>
          </Toolbar>
        </AppBar>
      </Box>
      <Layout>
        <Outlet />
      </Layout>
    </>
  )
}
