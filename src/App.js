import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./components/auth/loginForm";
import SignUp from "./components/auth/signUp";
import HomePage from "./components/pages/homePage";
import FileUploadPage from "./components/pages/fileUploadPage";

import "./styles/reset.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={LoginForm} />
        <Route path="/SignUp" Component={SignUp} />
        <Route path="/HomePage" Component={HomePage} />
        <Route path="/FileUploadPage" Component={FileUploadPage} />
      </Routes>
    </Router>
  );
}

export default App;
