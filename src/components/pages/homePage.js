import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../auth/firebaseConfig";
import { styled, useTheme } from "@mui/material/styles";
// prettier-ignore
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, Divider, CssBaseline, Button, IconButton, Toolbar, Menu, MenuItem } from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import FolderIcon from "@mui/icons-material/Folder";
import AdminInfoModal from "./adminInfo";
import FileUploadPage from "./fileUploadPage";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== "open" })(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const listIcon = [
  { text: "콘텐츠 업로드", icon: <UploadFileIcon />, component: "fileUpload" },
  { text: "콘텐츠 다운로드", icon: <UploadFileIcon />, component: "ajouUpload" },
  { text: "게시판", icon: <FolderIcon />, component: "board" },
];

const HomePage = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [drawerOpen, setdrawerOpen] = useState(true);
  const [isAdminInfoOpen, setIsAdminInfoOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const userOpen = Boolean(anchorEl);
  const theme = useTheme();
  const [selectedComponent, setSelectedComponent] = useState("home"); // 현재 선택된 페이지 상태 관리

  const handleLogout = () => {
    navigate("/");
  };

  const handleDrawerOpen = () => {
    setdrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setdrawerOpen(false);
  };

  const handleAdminInfoOpen = () => {
    setIsAdminInfoOpen(true);
  };

  const handleAdminInfoClose = () => {
    setIsAdminInfoOpen(false);
  };

  const userHandleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const userHandleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    // Firebase Auth 상태 변경 감지
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // 사용자가 로그인한 경우
        const uid = user.uid;
        // Firestore에서 사용자의 'name' 필드 조회
        const userDocRef = doc(db, "users", uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          // 문서가 존재하는 경우, 'name' 필드 값을 상태에 설정
          setUserName(userDoc.data().name);
        } else {
          console.log("No user data available");
        }
      } else {
        // 사용자가 로그인하지 않은 경우
        setUserName("");
      }
    });

    // 컴포넌트 언마운트 시 구독 해제
    return () => unsubscribe();
  }, []);

  const renderComponent = () => {
    switch (selectedComponent) {
      case "home":
        return <div>홈페이지 콘텐츠</div>;
      case "fileUpload":
        return <FileUploadPage />;
      case "ajouUpload":
        return <div>아주대 업로드 페이지</div>;
      default:
        return <div>홈페이지 콘텐츠</div>;
    }
  };

  return (
    <Box sx={{ display: "flex", overflow: "hidden" }}>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", height: "80px" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={drawerOpen ? handleDrawerClose : handleDrawerOpen}
              edge="start"
              sx={{ marginRight: 1 }}>
              <MenuIcon />
            </IconButton>
            <Button>
              <Typography variant="h3" noWrap component="div" sx={{ color: "#FEFAFA", textTransform: "lowercase" }}>
                hunet
              </Typography>
            </Button>
          </Box>
          <Box>
            <Button variant="outlined" color="inherit" sx={{ marginRight: 0.5 }} onClick={handleAdminInfoOpen}>
              담당자 정보
            </Button>
            <AdminInfoModal open={isAdminInfoOpen} onClose={handleAdminInfoClose} />
            <Button variant="outlined" color="inherit" onClick={userHandleOpen}>
              {userName}
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={userOpen}
              onClose={userHandleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={drawerOpen}>
        <DrawerHeader sx={{ height: "80px", display: "flex", justifyContent: "space-between", paddingLeft: "20px" }}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {listIcon.map((item) => (
            <ListItem key={item.text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: drawerOpen ? "initial" : "center",
                  px: 2.5,
                }}
                onClick={() => setSelectedComponent(item.component)}>
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: drawerOpen ? 3 : "auto",
                    justifyContent: "center",
                  }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} sx={{ opacity: drawerOpen ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {renderComponent()}
      </Box>
    </Box>
  );
};

export default HomePage;
