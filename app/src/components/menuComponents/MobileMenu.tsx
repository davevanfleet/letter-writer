import * as R from 'ramda';
import { AppBar, IconButton, Menu, MenuItem, Toolbar } from '@mui/material';
import React, { useState } from 'react';
import { ADMIN_ROUTES } from './dashboard.routes';
import { Box } from '@mui/system';
import MenuIcon from '@mui/icons-material/Menu';
import { useHistory } from 'react-router';
import { useTheme } from '@mui/material/styles';

const MobileMenu = (): JSX.Element => {
  const history = useHistory();
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
  const theme = useTheme();
  return (
    <Box mb={5} sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
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
            {R.map(
              ({ path, name, desktop }) =>
                desktop ? <MenuItem onClick={() => handleNav(path)}>{name}</MenuItem> : null,
              R.values(ADMIN_ROUTES),
            )}
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default MobileMenu;
