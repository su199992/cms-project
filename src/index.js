import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "styled-components";
//import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import colorTheme from "./hooks/colorTheme";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider theme={colorTheme}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ThemeProvider>
);

reportWebVitals();
