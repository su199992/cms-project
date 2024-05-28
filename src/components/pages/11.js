import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { styled, useTheme } from "@mui/material/styles";
import { Box, CssBaseline, AppBar, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import FolderIcon from "@mui/icons-material/Folder";
import FileUploadPage from "./fileUploadPage";
import HomePageContent from "./HomePageContent"; // 예를 들어 홈 페이지의 기본 콘텐츠를 나타내는 컴포넌트

const drawerWidth = 240;

// 기존 스타일링 코드는 생략

function HomePage() {
  const theme = useTheme();
  const [open, setOpen] = useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Router>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <IconButton color="inherit" aria-label="open drawer" onClick={handleDrawerOpen} edge="start" sx={{ marginRight: "36px", ...(open && { display: "none" }) }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Persistent drawer
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <List>
            <ListItem button key="Home" component={Link} to="/">
              <ListItemIcon>
                <FolderIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem button key="Upload" component={Link} to="/upload">
              <ListItemIcon>
                <UploadFileIcon />
              </ListItemIcon>
              <ListItemText primary="File Upload" />
            </ListItem>
          </List>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          <Routes>
            <Route path="/" element={<HomePageContent />} />
            <Route path="/upload" element={<FileUploadPage />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

export default HomePage;
