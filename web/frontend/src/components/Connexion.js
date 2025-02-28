import React, { useState, useRef, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import getBackendUrl from "../utils/url";
import Page from "./Page";
import { useAuthContext } from "./AuthProvider";

const Connexion = () => {
  const [connect, setConnect] = useState(false); // Passe à true pour afficher 2FA
  const [code, setCode] = useState(new Array(8).fill("")); // Tableau des chiffres du code
  const [message, setMessage] = useState(null); // Stocke le message de validation
  const inputsRef = useRef([]); 
  const {isLoggedIn, login}= useAuthContext()
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [mail, setMail] = useState("")
  const [password, setPassword] = useState("")


  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return true;
  };

  
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

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && !code[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  useEffect(() => {
    async function validateCode() {
      if (code.every((char) => char !== "")) {
        let response = await fetch(getBackendUrl() + "login2fa", {
          method: "POST",
          body: JSON.stringify({
            mail : mail,
            password : password,
            code: code.join("")
          }),
      
          headers: {
            "Content-Type": "application/json; charset=utf-8"
          }
        });
        const json = await response.json()
        if (response.ok){
          login(json.token)
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

  const connexionFunction = async (e) => {
    e.preventDefault(); 
    let mail = document.getElementById("mail").value.trim();
    let password = document.getElementById("password").value;

    if ( !mail || !password) {
      setErrorMessage("Tous les champs doivent être remplis.");
      return;
    }

    if (!validateEmail(mail)) {
      setErrorMessage("Veuillez entrer un email valide.");
      return;
    }

    if (!validatePassword(password)) {
      setErrorMessage("Le mot de passe doit contenir au moins 8 caractères, une majuscule, un chiffre et un caractère spécial.");
      return;
    }
    try {
      console.log("Connexion réussie avec :", { mail, password });
      setErrorMessage(""); 
      let response = await fetch(getBackendUrl() + "login", {
        method: "POST",
        body: JSON.stringify({
          mail : mail,
          password: password
        }),
        headers : {"Content-Type" : "application/json; charset=utf-8"}
      })
      const json = await response.json()
      if (response.ok){
        if(json.need2fa){
          setMail(mail)
          setPassword(password)
          setConnect(true)
        } else {
          login(json.token)
        }
      } else {
        setErrorMessage(json.error)
      }
    } catch (error) {
      setErrorMessage("Une erreur est survenue lors de la connexion.");
    }
  }

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


                {errorMessage && <p className="error-message" style={{color: "red"}}>{errorMessage}</p>} 

                <form className="connexion-form">
                  <label>Email :</label>
                  <input id="mail" type="email" placeholder="Votre email" required />

                  <label>Mot de passe :</label>
                  <input id="password" type="password" placeholder="Votre mot de passe" required />

                  <button type="button" onClick={connexionFunction}>
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
