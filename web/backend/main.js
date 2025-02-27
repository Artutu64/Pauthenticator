const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const UserDatabase = require("./src/database/UserDatabase");
const inscriptionRoute = require("./src/routes/InscriptionRoute");
const loginRoute = require("./src/routes/loginRoute");
const dashboardRoute = require("./src/routes/DashboardRoute");
const TOTPDatabase = require("./src/database/TOTPDatabase");
const reset2faRoute = require("./src/routes/reset2fa");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 8080;

const corsOptions = {
    origin: '*',
    methods: 'GET, POST, OPTIONS, PUT, DELETE, PATCH',
    allowedHeaders: 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, method',
    maxAge: 3600,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

// Route d'accueil
app.get("/", (req, res) => {
  res.json({ message: "Bienvenue sur le backend de Pauthenticator !" });
});

app.post("/inscription", inscriptionRoute)
app.post("/login", loginRoute)
app.get("/dashboard", dashboardRoute)
app.post("/reset2fa", reset2faRoute)

app.use(function (req, res) {
    res.status(404).json({ message: "Aucune page exposée sur cet URL !" });
});
  

new UserDatabase();
new TOTPDatabase()

// Lancer le serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
