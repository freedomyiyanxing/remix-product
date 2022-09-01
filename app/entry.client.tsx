// import React from 'react';
// import { RemixBrowser } from '@remix-run/react';
// import { hydrateRoot } from 'react-dom/client';
//
// hydrateRoot(
//   document,
//   <React.StrictMode>
//     <RemixBrowser />
//   </React.StrictMode>
// );
//

import * as React from 'react';
import { useState } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { RemixBrowser } from '@remix-run/react';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import ClientStyleContext from '~/utils/client-style-context';
import createEmotionCache from '~/utils/create-emotion-cache';
import theme from '~/utils/theme';

interface ClientCacheProviderProps {
  children: React.ReactNode;
}
function ClientCacheProvider({ children }: ClientCacheProviderProps) {
  const [cache, setCache] = useState(createEmotionCache());

  function reset() {
    setCache(createEmotionCache());
  }

  return (
    <ClientStyleContext.Provider value={{ reset }}>
      <CacheProvider value={cache}>{children}</CacheProvider>
    </ClientStyleContext.Provider>
  );
}

hydrateRoot(
  document,
  <ClientCacheProvider>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RemixBrowser />
    </ThemeProvider>
  </ClientCacheProvider>,
);
