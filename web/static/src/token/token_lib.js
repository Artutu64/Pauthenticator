require("dotenv").config(); // Charge les variables d'environnement

const crypto = require("crypto");

const SECRET_KEY = Buffer.from(process.env.SECRET_KEY, "utf8"); // Récupère la clé secrète du .env
const IV = Buffer.from(process.env.IV_KEY, "utf8"); // Récupère l'IV du .env

function generatePadding(length) {
    const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let padding = "";
    for (let i = 0; i < length; i++) {
        padding += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return padding;
}

// Chiffrement AES-256-CBC
function encryptAES(text) {
    const cipher = crypto.createCipheriv("aes-256-cbc", SECRET_KEY, IV);
    let encrypted = cipher.update(text, "utf8", "base64");
    encrypted += cipher.final("base64");
    return encrypted;
}

// Déchiffrement AES-256-CBC
function decryptAES(encryptedText) {
    const decipher = crypto.createDecipheriv("aes-256-cbc", SECRET_KEY, IV);
    let decrypted = decipher.update(encryptedText, "base64", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
}

// Créer le token
function createToken(data) {
    let dataString = JSON.stringify(data);
    let diff = 512 - dataString.length;
    let part1 = Math.floor(Math.random() * (diff + 1));
    let part2 = diff - part1;

    let text = generatePadding(part1) + dataString + generatePadding(part2);
    return encryptAES(text);
}


function extractTokenData(text) {
    text = decryptAES(text)
    const jsonStart = text.indexOf("{");
    const jsonEnd = text.lastIndexOf("}");

    if (jsonStart === -1 || jsonEnd === -1) {
        throw new Error("Aucun JSON trouvé dans la chaîne.");
    }

    let textjson = text.substring(jsonStart, jsonEnd + 1);

    try {
        return JSON.parse(textjson);
    } catch (error) {
        throw new Error("Erreur lors du parsing du JSON : " + error.message);
    }
}

module.exports = { extractTokenData, createToken}
