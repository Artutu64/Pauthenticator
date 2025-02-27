import React from "react";
import Page from "./Page";

const Connexion = () => {
  return (
    <Page>
      <div className="form-container">
        <h2>Connexion</h2>
        <p>Veuillez entrer vos identifiants pour vous connecter.</p>

        <form className="form">
          <label>Email :</label>
          <input type="email" placeholder="Votre email" required />

          <label>Mot de passe :</label>
          <input type="password" placeholder="Votre mot de passe" required />

          <button type="submit">Se connecter</button>
        </form>
      </div>
    </Page>
  );
};

export default Connexion;
