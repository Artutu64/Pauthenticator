import React from "react";
import { useNavigate, Navigate } from "react-router-dom";

import Page from "./Page";
import { useAuthContext } from "./AuthProvider";

const Dashboard = () => {
  const {isLoggedIn}= useAuthContext()
  const navigate = useNavigate(); // Hook pour la navigation

  // Simuler les données utilisateur (à récupérer plus tard depuis une API)
  const user = {
    id: "USR12345",
    email: "utilisateur@example.com",
    is2FAEnabled: false, // Statut de la double authentification
  };

  // Fonction pour rediriger vers la page 2FA
  const goTo2FA = () => {
    navigate("/page2FA");
  };

  return (
    <>
    {
      !isLoggedIn && <>
      <Navigate to="/connexion" replace={true}/>
      </>
    }
      <Page>
        <div className="dashboard-container">
          <h2>Dashboard</h2>

          <div className="profile-info">
            <p><strong>Identifiant :</strong> {user.id}</p>
            <p><strong>Email :</strong> {user.email}</p>
            <p>
              <strong>Double authentification :</strong>{" "}
              <span className={user.is2FAEnabled ? "status-enabled" : "status-disabled"}>
                {user.is2FAEnabled ? "Activée ✅" : "Désactivée ❌"}
              </span>
            </p>

            {/* Bouton pour aller à la page 2FA */}
            <button className="toggle-2fa-button" onClick={goTo2FA}>
              Gérer 2FA
            </button>
          </div>
        </div>
      </Page>
    </>
  );
};

export default Dashboard;
