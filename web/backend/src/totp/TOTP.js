const crypto = require("crypto");
const base32 = require("thirty-two"); // Pour décoder la clé en Base32

class TOTP {
    constructor(timeStep, codeDigits, secretKey, algo, mail) {
        this.timeStep = timeStep || 30; // Authy utilise une période de 30 secondes
        this.codeDigits = codeDigits || 6; // Authy utilise 6 chiffres par défaut
        this.algo = algo || "SHA1"; // SHA1 est l'algo par défaut dans Authy
        this.serviceName = "Pauthenticator";
        this.mail = mail;
        
        // Décodage de la clé secrète en Base32 (Authy l'utilise)
        this.secretKey = base32.decode(secretKey); 
        this.secretKeyString = secretKey;
    }

    toString() {
        return `otpauth://totp/${this.serviceName}:${this.mail}?secret=${this.secretKeyString}&issuer=${this.serviceName}&algorithm=${this.algo}&digits=${this.codeDigits}&period=${this.timeStep}`;
    }

    getCode() {
        const timestamp = Math.floor(Date.now() / 1000);
        const counter = Math.floor(timestamp / this.timeStep);

        const counterBuffer = Buffer.alloc(8);
        counterBuffer.writeBigInt64BE(BigInt(counter), 0);

        const hash = this.hmac(this.secretKey, counterBuffer);

        const offset = hash[hash.length - 1] & 0x0f;

        const binary = ((hash[offset] & 0x7f) << 24) |
                       ((hash[offset + 1] & 0xff) << 16) |
                       ((hash[offset + 2] & 0xff) << 8) |
                       (hash[offset + 3] & 0xff);

        const otp = binary % Math.pow(10, this.codeDigits);
        return otp.toString().padStart(this.codeDigits, "0");
    }

    hmac(key, data) {
        return crypto.createHmac(this.algo, key).update(data).digest();
    }
}



function createTOTP(mail){
    let secretKey = new SecretKey(32)
    return new TOTP(30, 8, secretKey.toString(), "SHA512", mail)
}

function parseTotpUri(uri) {
    if (!uri.startsWith("otpauth://totp/")) {
        throw new Error("URI invalide : doit commencer par 'otpauth://totp/'.");
    }

    // Extraire la partie après "otpauth://totp/"
    const uriWithoutPrefix = uri.replace("otpauth://totp/", "");

    // Séparer le label (nom d'utilisateur et émetteur) et les paramètres
    const [labelPart, queryString] = uriWithoutPrefix.split("?");
    if (!queryString) {
        throw new Error("URI invalide : paramètres manquants.");
    }

    // Extraire l'issuer et le username depuis le label
    const [issuerAndUser, email] = labelPart.split(":");
    const issuerDecoded = decodeURIComponent(issuerAndUser);
    const emailDecoded = decodeURIComponent(email);

    // Extraire les paramètres
    const params = new URLSearchParams(queryString);
    const algorithm = params.get("algorithm") || "SHA1"; // Par défaut SHA1
    const digits = parseInt(params.get("digits") || "6", 10);
    const issuer = decodeURIComponent(params.get("issuer") || issuerDecoded);
    const period = parseInt(params.get("period") || "30", 10);
    const secret = params.get("secret");

    if (!secret) {
        throw new Error("URI invalide : clé secrète manquante.");
    }

    return {
        issuer,
        email: emailDecoded,
        algorithm,
        digits,
        period,
        secret,
    };
}

function getTOTPfromURI(uri){
    try {
        uri = parseTotpUri(uri)
        return new TOTP(uri.period, uri.digits, uri.secret, uri.algorithm, uri.email)
    } catch(error){
        throw error
    }
}

module.exports = {TOTP, createTOTP, getTOTPfromURI}
