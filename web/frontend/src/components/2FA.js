import React, { useState, useRef, useEffect } from "react";
import Page from "./Page";
import { QRCodeCanvas } from "qrcode.react";

const Page2FA = () => {
  const [code, setCode] = useState(new Array(8).fill("")); // Tableau pour stocker le code
  const [message, setMessage] = useState(null); // Message de succès ou d'erreur
  const inputsRef = useRef([]); // Références des inputs

  // Gérer la saisie du code
  const handleChange = (index, event) => {
    const value = event.target.value;
    if (/^[0-9]?$/.test(value)) {
      let newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // Déplacer le focus automatiquement
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

  // Vérifier automatiquement si tous les inputs sont remplis
  useEffect(() => {
    if (code.every((char) => char !== "")) {
      // Une chance sur deux de succès ou d'erreur
      const success = Math.random() < 0.5;

      if (success) {
        setMessage({ text: "✅ Succès ! Code valide.", color: "green" });
      } else {
        setMessage({ text: "❌ Erreur ! Code incorrect.", color: "red" });
      }

      // Effacer immédiatement les inputs après validation
      setTimeout(() => {
        setCode(new Array(8).fill("")); // Réinitialiser les inputs
        inputsRef.current[0]?.focus(); // Remettre le focus sur le premier champ
      }, 50);
    }
  }, [code]);

  return (
    <Page>
      <div className="page2fa-container">
        <h2>Authentification à Deux Facteurs</h2>

        {/* QR Code */}
        <div className="qr-container">
          <QRCodeCanvas value="otpauth://totp/YourApp?secret=YOUR_SECRET_KEY" size={150} />
        </div>

        <p>Entrez votre code de validation reçu par email :</p>

        {/* Saisie du code en 8 champs */}
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
    </Page>
  );
};

export default Page2FA;
