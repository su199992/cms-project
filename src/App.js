import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './components/auth/loginForm';
import HomePage from './pages/homePage';
import ChangePassword from './pages/changePassword'
import './styles/reset.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={LoginForm} />
        <Route path="/HomePage" Component={HomePage} />
        <Route path="/ChangePassword" Component={ChangePassword} />
      </Routes>
    </Router>
  );  
}

export default App;
