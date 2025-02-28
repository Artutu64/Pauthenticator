import React, { useState, useRef, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";

import Page from "./Page";
import { useAuthContext } from "./AuthProvider";

const Connexion = () => {
  const [connect, setConnect] = useState(false); // Passe à true pour afficher 2FA
  const [code, setCode] = useState(new Array(8).fill("")); // Tableau des chiffres du code
  const [message, setMessage] = useState(null); // Stocke le message de validation
  const inputsRef = useRef([]); // Références pour les inputs
  const {isLoggedIn}= useAuthContext()
  const navigate = useNavigate();
  // Gérer la saisie du code 2FA
  const handleChange = (index, event) => {
    const value = event.target.value;
    if (/^[0-9]?$/.test(value)) {
      let newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // Déplacer le focus automatiquement au champ suivant
      if (value && index < 7) {
        inputsRef.current[index + 1].focus();
      }
    }
  };

  // Gestion du clavier (Backspace pour revenir en arrière)
  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && !code[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  // Vérifier si tous les inputs sont remplis
  useEffect(() => {
    if (code.every((char) => char !== "")) {
      const success = Math.random() < 0.5;

      if (success) {
        setMessage({ text: "✅ Succès ! Code valide.", color: "green" });
      } else {
        setMessage({ text: "❌ Erreur ! Code incorrect.", color: "red" });
      }

      setTimeout(() => {
        setCode(new Array(8).fill(""));
        inputsRef.current[0]?.focus();
      }, 50);
    }
  }, [code]);

  return (
    <>
        {
          isLoggedIn && <>
          <Navigate to="/" replace={true}/>
          </>
        }
        <Page>
          <div className="connexion-container">
            {connect ? (
              // Affichage de la validation 2FA
              <div className="page2fa-container">
                <h2>Validation 2FA</h2>
                <p>Veuillez entrer le code à huit chiffres :</p>

                <div className="code-inputs">
                  {code.map((char, index) => (
                    <input
                      key={index}
                      ref={(el) => (inputsRef.current[index] = el)}
                      type="text"
                      maxLength="1"
                      value={char}
                      onChange={(e) => handleChange(index, e)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className="digit-input"
                    />
                  ))}
                </div>

                {/* Affichage du message de validation */}
                {message && <p className="message-validation" style={{ color: message.color }}>{message.text}</p>}
              </div>
            ) : (
              // Affichage du formulaire de connexion normal
              <div className="connexion-container">
                <h2>Connexion</h2>
                <p>Veuillez entrer vos identifiants pour vous connecter.</p>

                <form className="connexion-form">
                  <label>Email :</label>
                  <input type="email" placeholder="Votre email" required />

                  <label>Mot de passe :</label>
                  <input type="password" placeholder="Votre mot de passe" required />

                  <button type="button" onClick={() => setConnect(true)}>
                    Se connecter
                  </button>
                </form>
              </div>
            )}
          </div>
        </Page>
    </>
  );
};

export default Connexion;
