import * as React from 'react';
import Container from '@mui/material/Container';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Container maxWidth="xl">
      {children}
    </Container>
  );
}
