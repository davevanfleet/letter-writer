import * as R from 'ramda';
import { Box, Link } from '@mui/material';
import React, { useState } from 'react';
import { ADMIN_ROUTES } from './dashboard.routes';
import { Link as RouterLink } from 'react-router-dom';

const DesktopMenu = (): JSX.Element => (
  <Box
    mb={5}
    display="flex"
    flexDirection="row"
    justifyContent="space-between"
    sx={{
      paddingLeft: 16,
      paddingRight: 16,
      paddingTop: 4,
      paddingBottom: 4,
      backgroundColor: 'grey.200',
    }}
  >
    {R.map(
      ({ path, name, desktop }) =>
        desktop ? (
          <Link component={RouterLink} to={path} underline="none" sx={{ color: 'common.black' }}>
            {name}
          </Link>
        ) : null,
      R.values(ADMIN_ROUTES),
    )}
  </Box>
);
export default DesktopMenu;
