import * as React from "react";
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import "./App.css";
import Player from "./Player";
import Playlists from "./Playlists";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Playlists />} />
          <Route path="/player/:gamertag" element={<Player />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;