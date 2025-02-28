import React, { useState, useRef, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { Commet } from "react-loading-indicators";
import Page from "./Page";
import { useAuthContext } from "./AuthProvider";
import { QRCodeCanvas } from "qrcode.react";
import getBackendUrl from "../utils/url";

const Page2FA = () => {
  const [code, setCode] = useState(new Array(8).fill(""));
  const [message, setMessage] = useState(null);
  const inputsRef = useRef([]);
  const { isLoggedIn, token, logout } = useAuthContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [qrcodeText, setQrcodeText] = useState("");
  const [copied, setCopied] = useState(false); // Nouvel état pour l'affichage "Copié !"

  // Gérer la saisie du code
  const handleChange = (index, event) => {
    const value = event.target.value;
    if (/^[0-9]?$/.test(value)) {
      let newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      if (value && index < 7) {
        inputsRef.current[index + 1].focus();
      }
    }
  };

  // Gestion du clavier (Backspace)
  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && !code[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  // Vérifier automatiquement si tous les inputs sont remplis
  useEffect(() => {
    async function validateCode() {
      if (code.every((char) => char !== "")) {
        let response = await fetch(getBackendUrl() + "validate2fa", {
          method: "POST",
          body: JSON.stringify({ code: code.join("") }),
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": `Bearer ${token}`
          }
        });

        if (response.ok) {
          navigate("/");
        } else if (response.status === 401) {
          logout();
        } else {
          setMessage({ text: "❌ Erreur ! Code incorrect.", color: "red" });
        }

        setTimeout(() => {
          setCode(new Array(8).fill(""));
          inputsRef.current[0]?.focus();
        }, 50);
      }
    }

    validateCode();
  }, [code]);

  useEffect(() => {
    async function fetchData() {
      let response = await fetch(getBackendUrl() + "reset2fa", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Authorization": `Bearer ${token}`
        }
      });

      if (response.ok) {
        const json = await response.json();
        setQrcodeText(json.qr_code);
        setLoading(false);
      } else if (response.status === 401) {
        logout();
      }
    }

    fetchData();
  }, []);

  // Fonction pour copier le texte dans le presse-papier
  const copyToClipboard = () => {
    navigator.clipboard.writeText(qrcodeText);
    setCopied(true);

    // Réinitialiser "Copié !" après 2 secondes
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  if (loading) {
    return (
      <Page>
        <div>
          <Commet color="#1e3a8a" />
        </div>
      </Page>
    );
  }

  return (
    <>
      {!isLoggedIn && <Navigate to="/connexion" replace={true} />}
      <Page>
        <div className="page2fa-container">
          <h2>Authentification à Deux Facteurs</h2>

          {/* QR Code */}
          <div className="qr-container">
            <QRCodeCanvas value={qrcodeText} size={250} />
          </div>

          {/* Bouton pour copier le texte du QR code */}
          <button className="copy-button" onClick={copyToClipboard}>
            {copied ? "✔ Copié !" : "📋 Copier le qr code"}
          </button>

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
    </>
  );
};

export default Page2FA;
