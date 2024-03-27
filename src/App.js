import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './components/auth/loginForm';
import HomePage from './pages/homePage';
import './styles/reset.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={LoginForm} />
        <Route path="/HomePage" Component={HomePage} />
      </Routes>
    </Router>
  );  
}

export default App;
