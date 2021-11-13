import * as R from 'ramda';
import { Avatar, Box, IconButton, Menu, MenuItem } from '@mui/material';
import React, { useState } from 'react';
import { ADMIN_ROUTES, PUBLISHER_ROUTES } from './dashboard.routes';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import { useHistory } from 'react-router';
import { useUserContext } from '../../contexts/UserContext';

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
    paddingRight: 6,
    paddingLeft: 6,
    '&:hover': { textDecoration: 'none', color: theme.palette.primary.main },
  },
  activeLink: {
    color: theme.palette.primary.main,
    paddingRight: 6,
    paddingLeft: 6,
    '&:hover': { textDecoration: 'none', color: theme.palette.primary.main },
  },
}));

const DesktopMenu = (): JSX.Element => {
  const { currentUser, logout } = useUserContext();

  const classes = useStyles();
  const history = useHistory();

  const isAdmin = () => currentUser?.role === 'Admin';

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleNav = (path: string) => {
    history.push(path);
    handleClose();
  };
  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 4,
        paddingBottom: 4,
        backgroundColor: 'grey.50',
        boxShadow: '0 1px 4px 0 #c5c6c6',
      }}
    >
      <Box>
        {R.map(
          ({ path, exact, name, desktop, authenticated }) =>
            desktop && (!authenticated || currentUser) ? (
              <NavLink
                key={path}
                to={path}
                exact={exact}
                className={classes.link}
                activeClassName={classes.activeLink}
              >
                {name}
              </NavLink>
            ) : null,
          R.values(isAdmin() ? ADMIN_ROUTES : PUBLISHER_ROUTES),
        )}
      </Box>
      <Box>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          sx={{ mr: 2, padding: 0 }}
        >
          <Avatar sx={{ width: 36, height: 36 }}>{currentUser?.name[0]}</Avatar>
        </IconButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          {currentUser
            ? [
                <MenuItem key="logout" onClick={logout}>
                  Logout
                </MenuItem>,
              ]
            : [
                <MenuItem key="login" onClick={() => handleNav('/login')}>
                  Login
                </MenuItem>,
              ]}
        </Menu>
      </Box>
    </Box>
  );
};
export default DesktopMenu;
