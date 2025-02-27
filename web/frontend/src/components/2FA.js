import React, { useState, useRef } from "react";
import Page from "./Page";
import { QRCodeCanvas } from "qrcode.react";

const Page2FA = () => {
  const [code, setCode] = useState(new Array(8).fill(""));
  const inputsRef = useRef([]);

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

        <button type="submit">Valider</button>
      </div>
    </Page>
  );
};

export default Page2FA;
