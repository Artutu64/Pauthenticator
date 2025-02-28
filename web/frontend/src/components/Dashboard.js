import React, { useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import {Commet } from "react-loading-indicators"; 
import Page from "./Page";
import { useAuthContext } from "./AuthProvider";
import getBackendUrl from "../utils/url";

const Dashboard = () => {
  const {isLoggedIn, token, logout}= useAuthContext()
  const navigate = useNavigate(); // Hook pour la navigation
  const [loading,setLoading] = useState(true)
  // Simuler les données utilisateur (à récupérer plus tard depuis une API)
  const [user, setUser] = useState(null)
  // Fonction pour rediriger vers la page 2FA
  const goTo2FA = () => {
    navigate("/page2FA");
  };

  useEffect(() => {

    async function fetchData(){
      let response = await fetch(getBackendUrl() + "dashboard", {
        method: "GET",
        headers : {
          "Content-Type" : "application/json; charset=utf-8",
          "Authorization": `Bearer ${token}`
        }
      })
      if (response.ok){
        const json = await response.json()
        setUser({
          id: json.nom + " "+ json.prenom,
          mail: json.mail,
          is2FAEnabled: json.mfa
        })
        setLoading(false)
      }
      else if(response.status === 401 ){
        logout();
      }
    }

    fetchData()

  }, [])

  if(!isLoggedIn){
    return (
      <>
        <Navigate to="/connexion" replace={true}/>
      </>
    )
  }
  
  if(loading){
    return (
      <Page>
        <div>
          <Commet color="#1e3a8a" />
        </div>
      </Page>
    )
  }

  return (
    <>
      <Page>
        <div className
      ="dashboard-container">
          <h2>Dashboard</h2>

          <div className="profile-info">
            <p><strong>Identifiant :</strong> {user.id}</p>
            <p><strong>Email :</strong> {user.mail}</p>
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
