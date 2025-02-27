const UserDatabase = require("../database/UserDatabase");
const TokenFactory = require("../token/token");

async function dashboardRoute(req, res) {
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

        let data = {
            mail: user.mail,
            nom: user.nom,
            prenom: user.prenom,
            mfa: (user.qrcode !== "")
        }

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: "Une erreur est survenue." });
    }
}

module.exports = dashboardRoute;
