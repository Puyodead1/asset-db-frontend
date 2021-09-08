import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import "react-image-gallery/styles/css/image-gallery.css";
import "./index.css";

const darkTheme = createTheme({
  palette: {
    type: "dark",
    background: {
      default: "#202225",
      secondary: "#2f3136",
      paper: "#36393f",
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
