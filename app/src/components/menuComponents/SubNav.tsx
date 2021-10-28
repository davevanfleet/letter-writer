import * as R from 'ramda';
import { Box } from '@mui/material';
import { NavLink } from 'react-router-dom';
import React from 'react';
import { SUB_NAV_ROUTES } from './dashboard.routes';
import { makeStyles } from '@material-ui/core';

interface ISubNavProps {
  page: 'territory' | 'dnc' | 'upload';
}

const useStyles = makeStyles((theme) => ({
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
    borderBottom: `2px solid ${theme.palette.primary.main}`,
    '&:hover': { textDecoration: 'none', color: theme.palette.primary.main },
  },
}));

const SubNav = ({ page }: ISubNavProps): JSX.Element => {
  const classes = useStyles();
  return (
    <Box
      mb={5}
      display="flex"
      flexDirection="row"
      justifyContent="space-around"
      sx={{
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 4,
        paddingBottom: 4,
      }}
    >
      {R.map(
        ({ path, exact, name, desktop }) =>
          desktop ? (
            <NavLink to={path} exact className={classes.link} activeClassName={classes.activeLink}>
              {name}
            </NavLink>
          ) : null,
        R.values(SUB_NAV_ROUTES[page]),
      )}
    </Box>
  );
};
export default SubNav;
