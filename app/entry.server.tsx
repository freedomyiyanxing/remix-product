// import { PassThrough } from "stream";
// import { renderToPipeableStream } from "react-dom/server";
// import { RemixServer } from "@remix-run/react";
// import { Response } from "@remix-run/node";
// import type { EntryContext, Headers } from "@remix-run/node";
// import createEmotionServer from '@emotion/server/create-instance';
// import { CacheProvider } from '@emotion/react';
// import { ThemeProvider } from '@mui/material/styles';
// import CssBaseline from '@mui/material/CssBaseline';
// import createEmotionCache from '~/utils/create-emotion-cache';
// import theme from '~/utils/theme';
//
// const ABORT_DELAY = 5000;
//
// export default function handleRequest(
//   request: Request,
//   responseStatusCode: number,
//   responseHeaders: Headers,
//   remixContext: EntryContext
// ) {
//   console.log('url--',request.url);
//   return new Promise((resolve, reject) => {
//     let didError = false;
//
//     const cache = createEmotionCache();
//     const { extractCriticalToChunks } = createEmotionServer(cache);
//
//     const MuiRemixServer = () => (
//       <CacheProvider value={cache}>
//         <ThemeProvider theme={theme}>
//           {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
//           <CssBaseline />
//           <RemixServer context={remixContext} url={request.url} />
//         </ThemeProvider>
//       </CacheProvider>
//     );
//
//     const { pipe, abort } = renderToPipeableStream(
//       <MuiRemixServer />,
//       {
//         onShellReady() {
//           let body = new PassThrough();
//
//           responseHeaders.set("Content-Type", "text/html");
//
//           resolve(
//             new Response(body, {
//               status: didError ? 500 : responseStatusCode,
//               headers: responseHeaders,
//             })
//           );
//           pipe(body);
//         },
//         onShellError(err: unknown) {
//           reject(err);
//         },
//         onError(error: unknown) {
//           didError = true;
//           console.error(error);
//         },
//       }
//     );
//     setTimeout(abort, ABORT_DELAY);
//   });
// }


import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { RemixServer } from '@remix-run/react';
import type { EntryContext } from '@remix-run/server-runtime';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import createEmotionServer from '@emotion/server/create-instance';
import createEmotionCache from '~/utils/create-emotion-cache';
import theme from '~/utils/theme';

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
) {
  const cache = createEmotionCache();
  const { extractCriticalToChunks } = createEmotionServer(cache);

  const MuiRemixServer = () => (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <RemixServer context={remixContext} url={request.url} />
      </ThemeProvider>
    </CacheProvider>
  );

  // Render the component to a string.
  const html = renderToString(<MuiRemixServer />);

  console.log(html);
  // Grab the CSS from emotion
  const { styles } = extractCriticalToChunks(html);

  let stylesHTML = '';

  styles.forEach(({ key, ids, css }) => {
    const emotionKey = `${key} ${ids.join(' ')}`;
    const newStyleTag = `<style data-emotion="${emotionKey}">${css}</style>`;
    stylesHTML = `${stylesHTML}${newStyleTag}`;
  });

  // Add the Emotion style tags after the insertion point meta tag
  const markup = html.replace(
    /<meta(\s)*name="emotion-insertion-point"(\s)*content="emotion-insertion-point"(\s)*\/>/,
    `<meta name="emotion-insertion-point" content="emotion-insertion-point"/>${stylesHTML}`,
  );

  responseHeaders.set('Content-Type', 'text/html');

  return new Response(`<!DOCTYPE html>${markup}`, {
    status: responseStatusCode,
    headers: responseHeaders,
  });
}
