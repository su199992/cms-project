import React from 'react';
//import { auth, db } from '../components/auth/firebaseConfig';
import { AppBar, Toolbar, IconButton, Typography, Switch, FormControlLabel, Button, Avatar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ fontSize: '50px'}}>
          hunet
        </Typography>
        <IconButton
          size="large"
          color="inherit"
          aria-label="open drawer"
          sx={{ marginLeft: 6}} >
          <MenuIcon />
        </IconButton>
        <Button 
          variant="outlined"
          color="error"
          sx={{ marginLeft: 10 }}>관리자</Button>
        <Avatar sx={{fontSize: '12px'}}>송수정</Avatar>
        <FormControlLabel
          value="login"
          control={<Switch onChange={handleLogout} />} 
          sx={{ marginLeft: 'auto' }} />
      </Toolbar>
    </AppBar>
  );
};

export default HomePage;
