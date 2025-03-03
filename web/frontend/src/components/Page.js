import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../logo_blanc.png";
import "../App.css"; // Import du CSS
import { useAuthContext } from "./AuthProvider";

const Page = ({ children }) => {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuthContext();

  // Fonction pour revenir au Dashboard
  const goToDashboard = () => {
    navigate("/");
  };

  return (
    <div className="App">
      {/* Bandeau supérieur */}
      <header className="App-header">
        <div className="App-header-left">
          <img 
            src={logo} 
            alt="Logo" 
            className="App-logo clickable-logo" 
            onClick={goToDashboard} 
          />
          <h1 className="App-title">Pauthenticator</h1>
        </div>

        {/* Navigation centrée */}
        <nav className="App-nav">
          {isLoggedIn ? (
            <>
              <Link to="/">
                <button className="App-button">Dashboard</button>
              </Link>
              <Link to="/page2FA">
                <button className="App-button">2FA</button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/inscription">
                <button className="App-button">Inscription</button>
              </Link>
              <Link to="/connexion">
                <button className="App-button">Connexion</button>
              </Link>
            </>
          )}
        </nav>

        {/* Bouton de déconnexion à droite du header */}
        {isLoggedIn && (
          <div className="App-header-right">
            <button onClick={logout} className="logout-button">
              Se déconnecter
            </button>
          </div>
        )}
      </header>

      {/* Contenu de la page */}
      <main className="App-main">{children}</main>

      {/* Bandeau inférieur */}
      <footer className="App-footer">
        <div className="footer-center">© 2025 RIMAUDIERE BRENOT DEPRETER</div>
        <div className="footer-right">Tous droits réservés</div>
      </footer>
    </div>
  );
};

export default Page;
