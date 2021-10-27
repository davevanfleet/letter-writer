import * as R from 'ramda';
import { makeStyles, useTheme } from '@material-ui/core';
import { ADMIN_ROUTES } from './dashboard.routes';
import { Box } from '@mui/material';
import { NavLink } from 'react-router-dom';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  navBar: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 4,
    paddingBottom: 4,
    backgroundColor: 'grey.50',
    boxShadow: '0 1px 4px 0 #c5c6c6',
  },
  link: {
    color: theme.palette.common.black,
    paddingRight: 4,
    paddingLeft: 4,
    '&:hover': { textDecoration: 'none', color: theme.palette.primary.main },
  },
  activeLink: {
    color: theme.palette.primary.main,
    paddingRight: 4,
    paddingLeft: 4,
    '&:hover': { textDecoration: 'none', color: theme.palette.primary.main },
  },
}));

const DesktopMenu = (): JSX.Element => {
  const classes = useStyles();
  return (
    <Box
      mb={5}
      display="flex"
      flexDirection="row"
      sx={{
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 4,
        paddingBottom: 4,
        backgroundColor: 'grey.50',
        boxShadow: '0 1px 4px 0 #c5c6c6',
      }}
    >
      {R.map(
        ({ path, exact, name, desktop }) =>
          desktop ? (
            <NavLink to={path} exact className={classes.link} activeClassName={classes.activeLink}>
              {name}
            </NavLink>
          ) : null,
        R.values(ADMIN_ROUTES),
      )}
    </Box>
  );
};
export default DesktopMenu;
