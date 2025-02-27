const TOTPDatabase = require("../database/TOTPDatabase");
const UserDatabase = require("../database/UserDatabase");
const TokenFactory = require("../token/token");
const { getTOTPfromURI } = require("../totp/TOTP");

async function validate2fa(req, res) {
    try {
        // Récupération du token depuis l'en-tête Authorization
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ error: "Token manquant ou invalide. (1)" });
        }

        // Extraction du token en supprimant "Bearer "
        const token = authHeader.split(" ")[1];

        let tokenFactory = new TokenFactory()
        if(!tokenFactory.isValid(token)){
            return res.status(401).json({ error: "Token manquant ou invalide. (2)" });
        }
        let tokenData = tokenFactory.getUser(token)
        if(!tokenData || !tokenData.mail){
            return res.status(401).json({ error: "Token manquant ou invalide. (3)" });
        }

        let db = new UserDatabase()
        let user = await db.getUser(tokenData.mail)
        if(user === null){
            return res.status(401).json({ error: "Token manquant ou invalide. (4)" });
        }

        const { code } = req.body; // Extraction des données du body

        if (!code) {
            return res.status(400).json({ error: "Tous les champs sont requis." });
        }

        let mail = tokenData.mail
        let totpDB = new TOTPDatabase()
        let codeQR = await totpDB.getTOTP(mail)
        let totp = getTOTPfromURI(codeQR)

        if(totp.getCode() === code) {
            res.status(200).json({message: "Succès !"});
        } else {
            res.status(400).json({message: "Erreur, ce n'est pas le bon code !"});
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Une erreur est survenue." });
    }
}

module.exports = validate2fa;
