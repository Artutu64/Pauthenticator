const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const UserDatabase = require("./src/database/UserDatabase");
const inscriptionRoute = require("./src/routes/InscriptionRoute");
const loginRoute = require("./src/routes/loginRoute");
const dashboardRoute = require("./src/routes/DashboardRoute");
const TOTPDatabase = require("./src/database/TOTPDatabase");
const reset2faRoute = require("./src/routes/reset2fa");
const validate2fa = require("./src/routes/validate2fa");
const login2faRoute = require("./src/routes/login2faRoute");
require("dotenv").config();
const path = require('path');

const app = express();
const port = process.env.BACKEND_PORT || 8080;

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
app.post("/validate2fa", validate2fa)
app.post("/login2fa", login2faRoute)

app.use(function (req, res) {
    res.status(404).json({ message: "Aucune page exposée sur cet URL !" });
});
  

new UserDatabase();
new TOTPDatabase()

// Lancer le serveur
app.listen(port, () => {
  console.log(`Serveur backend démarré sur http://localhost:${port}`);
});

const appFrontend = express();
const PORT = process.env.FRONTEND_PORT || 8000;

// Définir le dossier contenant le build React
const buildPath = path.join(__dirname, 'build');
appFrontend.use(express.static(buildPath));

// Servir l'index.html pour toutes les routes non gérées
appFrontend.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

appFrontend.listen(PORT, () => {
  console.log(`Serveur Frontend démarré sur sur http://localhost:${PORT}`);
});