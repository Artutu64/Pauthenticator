import React from "react";
import Page from "./Page";

const Inscription = () => {
  return (
    <Page>
      <div className="inscription-container">
        <h2>Inscription</h2>
        <p>Remplissez le formulaire pour créer un compte.</p>

        <form className="inscription-form">
          <label>Nom d'utilisateur :</label>
          <input type="text" placeholder="Votre nom" required />

          <label>Email :</label>
          <input type="email" placeholder="Votre email" required />

          <label>Mot de passe :</label>
          <input type="password" placeholder="Votre mot de passe" required />

          <label>Confirmer le mot de passe :</label>
          <input type="password" placeholder="Confirmez votre mot de passe" required />

          <button type="submit">S'inscrire</button>
        </form>
      </div>
    </Page>
  );
};

export default Inscription;
