import React, { useState } from 'react';
import { Box, AppBar, Toolbar, IconButton, Typography, Menu, MenuItem, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import InboxIcon from '@mui/icons-material/Inbox';

const HomePage = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const [drawerOpen, setDrawerOpen] = useState(true); // 사이드바 열림 상태를 true로 초기화

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

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen); // 사이드바 열기/닫기 토글
  };

  const drawer = (
    <Drawer
      open={drawerOpen}
      onClose={toggleDrawer}
      variant="persistent"
      sx={{
        width: 240, 
        flexShrink: 0,
        top: '64px',
        height: 'calc(100vh - 80px)', // 전체 높이에서 앱바 높이를 뺀 만큼 설정
        '& .MuiDrawer-paper': { width: 240, top: '80px', height: 'calc(100vh - 64px)' } // 여기도 동일하게 적용
      }}
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
          <Typography variant="h6" component="div" sx={{ fontSize: '50px'}}>
            hunet
          </Typography>
          <IconButton
            size="large"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer} // 사이드바 열기/닫기 이벤트
            sx={{ marginLeft: 6}}  // 'hunet' 오른쪽 30px에 위치
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
            sx={{ marginLeft: 'auto' }}  // 가장 오른쪽에 위치
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
