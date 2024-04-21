import React, { useState } from 'react';
import { Box, AppBar, Toolbar, IconButton, Typography, Switch, FormControlLabel, Tab, Tabs } from '@mui/material';
import { TabPanel, TabContext }  from '@mui/lab'; // TabContext import 추가
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState(0);

  const handleLogout = () => {
    navigate('/')
  };

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
      <Box sx={{ display: 'flex' }}>
        <Box sx={{ flexGrow: 1 }}>
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
              <FormControlLabel
                value="login"
                control={<Switch onChange={handleLogout} />} 
                sx={{ marginLeft: 'auto' }} />
            </Toolbar>
          </AppBar>
        </Box>
        <TabContext value={value}> {/* TabContext 제공 */}
        <Box sx={{ display: 'flex', bgcolor: 'background.paper', marginTop: '80px'}}>
          <Tabs
            orientation="vertical"
            value={value}
            onChange={handleTabChange}
            aria-label="Vertical tabs example"
            sx={{ borderRight: 1, borderColor: 'divider' }}
          >
            <Tab label="Item One" value={0}/>
            <Tab label="Item Two" value={1}  />
            <Tab label="Item Three" value={2} />
          </Tabs>
          <Box sx={{ }}>
            <TabPanel value={0}> Item One </TabPanel>
            <TabPanel value={1}> Item Two </TabPanel>
            <TabPanel value={2}> Item Three </TabPanel>
          </Box>
        </Box>
        </TabContext>
      </Box>
    
  );
};

export default HomePage;