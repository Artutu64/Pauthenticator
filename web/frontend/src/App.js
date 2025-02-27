import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Inscription from "./components/Inscription";
import Page2FA from "./components/2FA";
import Connexion from "./components/Connexion";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/inscription" element={<Inscription />} />
        <Route path="/page2FA" element={<Page2FA />} />
        <Route path="/connexion" element={<Connexion />} />
      </Routes>
    </Router>
  );
}

export default App;
