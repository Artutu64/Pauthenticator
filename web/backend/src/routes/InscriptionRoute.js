const UserDatabase = require("../database/UserDatabase");
const TokenFactory = require("../token/token");

async function inscriptionRoute(req, res) {
    try {
        const { mail, password, nom, prenom } = req.body; // Extraction des données du body

        if (!mail || !password || !nom || !prenom) {
            return res.status(400).json({ error: "Tous les champs sont requis." });
        }

        let db = new UserDatabase()
        let user = await db.getUser(mail)
        if(user !== null){
            return res.status(400).json({ error: "Le mail fournit par l'utilisateur est déjà utilisé !" });
        }

        await db.insertUser(mail, password, nom, prenom)

        let tokenData = {
            mail: mail,
            timestamp: Date.now() + 30 * 60 * 1000 // Ajoute 30 minutes en millisecondes
        };

        let tokenFactory = new TokenFactory()
        let token = tokenFactory.create(tokenData)

        res.status(200).json({ 
            token: token
        });
    } catch (error) {
        res.status(500).json({ error: "Une erreur est survenue." });
    }
}

module.exports = inscriptionRoute