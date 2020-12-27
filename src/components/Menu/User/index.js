import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ExitToApp from '@material-ui/icons/ExitToApp';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import { useAuth } from 'contexts/auth';
import Storage from 'providers/Storage';

function User() {
  const { user, setUser } = useAuth();

  const [openLogoff, setOpenLogoff] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);

  function handleLogoffOpen() {
    setOpenLogoff(true);
  }

  function handleLogoffClose() {
    setOpenLogoff(false);
    setAnchorEl(null);
  }

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  async function logoff() {
    setUser(null);
    await Storage.removeItem(Storage.tokenKey);
    await Storage.removeItem(Storage.refreshTokenKey);
    await Storage.removeItem(Storage.userKey);
  }

  return (
    <>
      <IconButton onClick={handleProfileMenuOpen}>
        <AccountCircleIcon />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleLogoffOpen}>
          <ExitToApp />
          Sair
        </MenuItem>
      </Menu>

      <Dialog open={openLogoff} onClose={handleLogoffClose}>
        <DialogTitle>Sair</DialogTitle>
        <DialogContent>
          <DialogContentText>Realmente deseja sair</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus color="primary" onClick={handleLogoffClose}>
            Cacelar
          </Button>
          <Button
            color="primary"
            onClick={() => {
              handleLogoffClose();
              logoff();
            }}
          >
            Sair
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default User;
