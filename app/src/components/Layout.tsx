import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Box } from '@mui/material';
import React from 'react';
import TopMenu from './menuComponents/TopMenu';

interface ILayoutProps {
  children: React.ReactNode;
  flash: string;
}

const theme = createTheme({
  spacing: 4,
  typography: { h1: { fontSize: '4rem' }, h2: { fontSize: '3rem' } },
});

const Layout = ({ children, flash }: ILayoutProps): JSX.Element => (
  <ThemeProvider theme={theme}>
    <div className="layout">
      <TopMenu />
      {flash.length > 0 && <div className="alert alert-primary">{flash}</div>}
      <Box ml="auto" mr="auto" sx={{ maxWidth: 1000 }}>
        {children}
      </Box>
    </div>
  </ThemeProvider>
);

export default Layout;
