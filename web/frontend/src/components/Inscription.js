import React, { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import Page from "./Page";
import { useAuthContext } from "./AuthProvider";
import getBackendUrl from "../utils/url";

const Inscription = () => {
  const { isLoggedIn,login } = useAuthContext();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(""); // Stocke le message d'erreur

  // Fonction de validation d'email
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Fonction de validation du mot de passe
  const validatePassword = (password) => {
    return true;
  };

  const inscription = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page

    let nom = document.getElementById("nom").value.trim();
    let prenom = document.getElementById("prenom").value.trim();
    let mail = document.getElementById("mail").value.trim();
    let password = document.getElementById("password").value;
    let confirm = document.getElementById("confirm").value;

    // Vérification des champs vides
    if (!nom || !prenom || !mail || !password || !confirm) {
      setErrorMessage("Tous les champs doivent être remplis.");
      return;
    }

    // Vérification du format de l'email
    if (!validateEmail(mail)) {
      setErrorMessage("Veuillez entrer un email valide.");
      return;
    }

    // Vérification de la complexité du mot de passe
    if (!validatePassword(password)) {
      setErrorMessage("Le mot de passe doit contenir au moins 8 caractères, une majuscule, un chiffre et un caractère spécial.");
      return;
    }

    // Vérification de la confirmation du mot de passe
    if (password !== confirm) {
      setErrorMessage("Les mots de passe ne correspondent pas.");
      return;
    }

    // Simuler une requête d'inscription (remplacer par un appel API si nécessaire)
    try {
      console.log("Inscription réussie avec :", { nom, prenom, mail, password });
      setErrorMessage(""); 
      let response = await fetch(getBackendUrl() + "inscription", {
        method: "POST",
        body: JSON.stringify({
          mail : mail,
          password: password,
          nom: nom,
          prenom: prenom
        }),
        headers : {"Content-Type" : "application/json; charset=utf-8"}
      })
      if (response.ok){
        const json = await response.json()
        login(json.token)
      }
    } catch (error) {
      setErrorMessage("Une erreur est survenue lors de l'inscription.");
    }
  };

  return (
    <>
      {isLoggedIn && <Navigate to="/" replace={true} />}
      <Page>
        <div className="inscription-container">
          <h2>Inscription</h2>
          <p>Remplissez le formulaire pour créer un compte.</p>

          {/* Affichage du message d'erreur */}
          {errorMessage && <p className="error-message" style={{color: "red"}}>{errorMessage}</p>}

          <form className="inscription-form" onSubmit={inscription}>
            <label>Nom :</label>
            <input id="nom" type="text" placeholder="Votre nom" required />

            <label>Prénom :</label>
            <input id="prenom" type="text" placeholder="Votre prénom" required />

            <label>Email :</label>
            <input id="mail" type="email" placeholder="Votre email" required />

            <label>Mot de passe :</label>
            <input id="password" type="password" placeholder="Votre mot de passe" required />

            <label>Confirmer le mot de passe :</label>
            <input id="confirm" type="password" placeholder="Confirmez votre mot de passe" required />

            <button onClick={inscription} type="submit">S'inscrire</button>
          </form>
        </div>
      </Page>
    </>
  );
};

export default Inscription;
