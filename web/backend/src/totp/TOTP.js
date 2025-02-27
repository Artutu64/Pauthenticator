const crypto = require("crypto");
const SecretKey = require("./keygen");

class TOTP {
    constructor(timeStep, codeDigits, secretKey, algo, mail) {
        this.timeStep = timeStep;
        this.codeDigits = codeDigits;
        this.algo = algo;
        if(!(this.algo === "SHA1" || this.algo === "SHA512" || this.algo === "SHA256")){
            this.algo = "SHA512"
        }
        this.serviceName = "Pauthenticator";
        this.mail = mail;
        this.secretKey = Buffer.from(secretKey, "base64"); // Décoder la clé secrète en Base64
        this.secretKeyString = secretKey
    }

    toString(){
        return "otpauth://totp/" + this.serviceName + ":" + this.mail + "?secret=" + this.secretKeyString +"&issuer=" + this.serviceName +"&algorithm=" + this.algo + "&digits=" + this.codeDigits + "&period=" + this.timeStep
    }

    getCode() {
        const timestamp = Math.floor(Date.now() / 1000); // Timestamp actuel en secondes
        const counter = Math.floor(timestamp / this.timeStep); // Calcul du compteur de temps

        const counterBuffer = Buffer.alloc(8);
        counterBuffer.writeBigInt64BE(BigInt(counter), 0); // Convertir en 8 octets

        const hash = this.hmac(this.secretKey, counterBuffer); // Appliquer HMAC-SHA512

        const offset = hash[hash.length - 1] & 0x0f; // Récupérer les 4 derniers bits pour l'offset

        const binary = ((hash[offset] & 0x7f) << 24) | // 1er octet (appliquer masque)
                       ((hash[offset + 1] & 0xff) << 16) |
                       ((hash[offset + 2] & 0xff) << 8) |
                       (hash[offset + 3] & 0xff);

        const otp = binary % Math.pow(10, this.codeDigits); // Code OTP avec le bon nombre de chiffres

        return otp.toString().padStart(this.codeDigits, "0"); // Ajouter des zéros devant si besoin
    }

    hmac(key, data) {
        return crypto.createHmac(this.algo, key).update(data).digest();
    }
}

function createTOTP(mail){
    let secretKey = new SecretKey(32)
    return new TOTP(5, 8, secretKey.toString(), "SHA512", mail)
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
        console.log(uri)
        return new TOTP(uri.period, uri.digits, uri.secret, uri.algorithm, uri.email)
    } catch(error){
        throw error
    }
}

module.exports = {TOTP, createTOTP, getTOTPfromURI}
