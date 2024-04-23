import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './components/auth/loginForm';
import HomePage from './components/pages/homePage';
import SignUp from './components/auth/signUp'
import './styles/reset.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={LoginForm} />
        <Route path="/HomePage" Component={HomePage} />
        <Route path="/SignUp" Component={SignUp} />
      </Routes>
    </Router>
  );  
}

export default App;
