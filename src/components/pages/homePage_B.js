import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ListItemText from "@mui/material/ListItemText";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Switch,
  Button,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Divider,
  Drawer,
  FormControlLabel,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import { ThemeProvider } from "@emotion/react";
import colorTheme from "./colorTheme";

const HomePage = () => {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(true);

  const handleLogout = () => {
    navigate("/");
  };
  return (
    <ThemeProvider theme={colorTheme}>
      <AppBar position="fixed" color="secondary" sx={{ position: "relative" }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ fontSize: "50px", fontWeight: 700 }}>
            hunet
          </Typography>
          <IconButton size="large" color="inherit" sx={{ marginLeft: 6 }} onClick={toggleDrawer}>
            <MenuIcon sx={{ fontSize: 35 }} />
          </IconButton>
          <Button variant="outlined" color="inherit" sx={{ position: "absolute", right: "180px", marginRight: 1 }}>
            담당자 정보
          </Button>
          <Button variant="outlined" color="inherit" sx={{ position: "absolute", right: "100px" }}>
            송수정
          </Button>
          <FormControlLabel
            value="login"
            control={<Switch onChange={handleLogout} />}
            sx={{ position: "absolute", right: "15px" }}
          />
          {/* <Avatar sx={{fontSize: '12px'}}>송수정</Avatar> */}
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={openDrawer} onClose={closeDrawer} BackdropProps={{ invisible: true }}>
        <Box sx={{ width: 200, height: "100%", display: "flex", flexDirection: "column", paddingTop: "80px" }}>
          <List>
            <ListItem>
              <ListItemButton>
                <ListItemIcon>
                  <DriveFolderUploadIcon />
                </ListItemIcon>
                <ListItemText primary="업로드" />
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton>
                <ListItemIcon>
                  <ImportContactsIcon />
                </ListItemIcon>
                <ListItemText primary="과목관리" />
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
        </Box>
      </Drawer>
      <Box sx={{ height: "100vh" }}>{/* Content */}</Box>
    </ThemeProvider>
  );
};

export default HomePage;
