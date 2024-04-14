<<<<<<< HEAD
import React from 'react';

const HomePage = () => {
    return(
        <div>
            안녕하세요.
        </div>
    );
};

export default HomePage;
=======
import React, { useState } from 'react';
import { Box, AppBar, Toolbar, IconButton, Typography, Menu, MenuItem, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import InboxIcon from '@mui/icons-material/Inbox'; // 예제를 위해 추가

const HomePage = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const [drawerOpen, setDrawerOpen] = useState(false); // 사이드바 열림 상태

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    console.log("Logging out...");
    handleMenuClose();
  };

  const handleDrawerOpen = () => {
    setDrawerOpen(!drawerOpen); // 사이드바 열기/닫기 토글
  };

  const drawer = (
    <Drawer
      open={!drawerOpen}
      onClose={handleDrawerOpen}
      variant="temporary"
    >
      <List>
        {['Upload', 'Starred', 'Send email'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {<InboxIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            MyLogo
          </Typography>
          <IconButton
            size="large"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen} // 사이드바 열기/닫기 이벤트
          >
            <MenuIcon />
          </IconButton>
          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      {drawer}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {/* 페이지의 주요 내용이 여기에 포함됩니다. */}
      </Box>
    </Box>
  );
};

export default HomePage;
>>>>>>> b268604 (homePage 메뉴바  추가)
