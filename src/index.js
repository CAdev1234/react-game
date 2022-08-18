import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import PlayerProvider from "./games/breakout/contexts/player";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
