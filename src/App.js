import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Breakout from "./games/breakout";
import PlayerProvider from "./games/breakout/contexts/player";

function App() {
  return (
    <PlayerProvider>
      <Breakout />
    </PlayerProvider>
    
  );
}

export default App;
