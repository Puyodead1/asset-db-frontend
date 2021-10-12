import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "react-image-gallery/styles/css/image-gallery.css";
import "./index.css";
import { grey } from "@mui/material/colors";

const darkTheme = createTheme({
  palette: {
    type: "dark",
    background: {
      default: "#202225",
      secondary: "#2f3136",
      paper: "#36393f",
    },
    text: {
      primary: "#fff",
      secondary: grey[500],
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
