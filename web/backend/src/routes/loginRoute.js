const UserDatabase = require("../database/UserDatabase");
const TokenFactory = require("../token/token");
const bcrypt = require("bcryptjs");

async function loginRoute(req, res) {
    try {
        const { mail, password} = req.body; // Extraction des données du body

        if (!mail || !password) {
            return res.status(400).json({ error: "Tous les champs sont requis." });
        }

        let db = new UserDatabase()
        let user = await db.getUser(mail)
        if(user === null){
            return res.status(400).json({ error: "L'utilisateur n'a pas été trouvé'" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(400).json({error: "Le mot de passe n'est pas valide !"})
        }

        let need2fa = user.qrcode !== ""

        let tokenData = {
            mail: mail,
            timestamp: Date.now() + 30 * 60 * 1000
        };
        token = ""
        if(!need2fa){
            let tokenFactory = new TokenFactory()
            token = tokenFactory.create(tokenData)
        }

        res.status(200).json({ 
            need2fa: need2fa,
            token: token
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Une erreur est survenue." });
    }
}

module.exports = loginRoute