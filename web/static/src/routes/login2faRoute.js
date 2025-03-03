const UserDatabase = require("../database/UserDatabase");
const TokenFactory = require("../token/token");
const bcrypt = require("bcryptjs");
const { getTOTPfromURI } = require("../totp/TOTP");

async function login2faRoute(req, res) {
    try {
        const { mail, password, code} = req.body; // Extraction des données du body

        if (!mail || !password || !code) {
            return res.status(400).json({ error: "Tous les champs sont requis." });
        }

        let db = new UserDatabase()
        let user = await db.getUser(mail)
        if(user === null){
            return res.status(400).json({ error: "Utilisateur ou mot de passe incorrect.'" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(400).json({error: "Utilisateur ou mot de passe incorrect."})
        }

        let codeQR = user.qrcode
        let totp = getTOTPfromURI(codeQR)
        let goodGood = totp.getCode()

        if(code !== goodGood){
            res.status(400).json({error: "Le code n'est pas valide !"})
            return
        }

        let tokenData = {
            mail: mail,
            timestamp: Date.now() + 30 * 60 * 1000
        };

        let tokenFactory = new TokenFactory()
        token = tokenFactory.create(tokenData)

        res.status(200).json({ 
            token: token
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Une erreur est survenue." });
    }
}

module.exports = login2faRoute