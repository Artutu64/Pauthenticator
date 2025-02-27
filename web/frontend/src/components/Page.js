import React from "react";
import { Link } from "react-router-dom";
import logo from "../logo.svg";
import "../App.css"; // Import du CSS

const Page = ({ children }) => {
  return (
    <div className="App">
      {/* Bandeau supérieur */}
      <header className="App-header">
        <div className="App-header-left">
          <img src={logo} alt="Logo" className="App-logo" />
          <h1 className="App-title">Pauthenticator</h1>
        </div>

        {/* Navigation centrée */}
        <nav className="App-nav">
          <Link to="/">
            <button className="App-button">Dashboard</button>
          </Link>
          <Link to="/inscription">
            <button className="App-button">Inscription</button>
          </Link>
          <Link to="/page2FA">
            <button className="App-button">2FA</button>
          </Link>
          <Link to="/connexion">
            <button className="App-button">Connexion</button> 
          </Link>
        </nav>
      </header>

      {/* Contenu de la page */}
      <main className="App-main">{children}</main>

      {/* Bandeau inférieur */}
      <footer className="App-footer">
        <div className="footer-center">© 2025 Rimaudière Brenot Deprêter</div>
        <div className="footer-right">Tous droits réservés</div>
      </footer>
    </div>
  );
};

export default Page;

