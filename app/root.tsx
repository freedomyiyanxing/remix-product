import React from 'react';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useTransition,
} from "@remix-run/react";
import { LoaderFunction, LinksFunction, json } from '@remix-run/node';
import { withEmotionCache } from '@emotion/react';
import { unstable_useEnhancedEffect as useEnhancedEffect } from '@mui/material';
import NProgress from 'nprogress';
import nprogressCss from 'nprogress/nprogress.css';
import Layout from '~/common/sht-layout';
import theme from '~/utils/theme';
import ClientStyleContext from '~/utils/client-style-context';

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: nprogressCss }];
};

export let loader: LoaderFunction = async () => {
  return { date: new Date() };
};

interface DocumentProps {
  children: React.ReactNode;
  title?: string;
}

const Document = withEmotionCache(({ children, title }: DocumentProps, emotionCache) => {
  const clientStyleData = React.useContext(ClientStyleContext);
  const transition = useTransition();

  useEnhancedEffect(() => {
    emotionCache.sheet.container = document.head;
    const tags = emotionCache.sheet.tags;
    emotionCache.sheet.flush();
    tags.forEach((tag) => {
      (emotionCache.sheet as any)._insertTag(tag);
    });
    clientStyleData.reset();
  }, []);

  React.useEffect(() => {
    if (transition.state === 'idle') {
      NProgress.done();
    } else {
      NProgress.start();
    }
    console.log(transition.state);
  }, [transition.state])

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="theme-color" content={theme.palette.primary.main} />
        {title ? <title>{title}</title> : null}
        <Meta />
        <Links />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        <meta name="emotion-insertion-point" content="emotion-insertion-point" />
        <title>易炎星</title>
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
});


export default function App() {
  let data = useLoaderData();
  console.log(data);
  console.log(typeof document)
  return (
    <Document>
      <Layout>
        <Outlet />
      </Layout>
    </Document>
  );
}
