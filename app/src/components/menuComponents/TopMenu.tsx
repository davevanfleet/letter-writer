import { Box } from '@mui/system';
import DesktopMenu from './DesktopMenu';
import MobileMenu from './MobileMenu';
import React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const TopMenu = () => {
  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up('sm'));
  return desktop ? <DesktopMenu /> : <MobileMenu />;
};

export default TopMenu;
