const crypto = require("crypto");
const base32 = require("thirty-two"); // Bibliothèque pour l'encodage en base32

class SecretKey {
    constructor(size = 32) { // 20 octets (160 bits) pour une clé standard TOTP
        const randomBytes = crypto.randomBytes(size); // Générer des octets sécurisés
        this.secretKey = base32.encode(randomBytes).toString().replace(/=/g, ""); // Encoder en base32 et retirer les "="
    }

    toString() {
        return this.secretKey;
    }

    getSecretKey() {
        return this.secretKey;
    }
}

module.exports = SecretKey;
