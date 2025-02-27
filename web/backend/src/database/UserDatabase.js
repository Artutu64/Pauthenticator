const sqlite3 = require('sqlite3').verbose();
const bcrypt = require("bcryptjs");

class UserDatabase {
    /*
        On initialise la base de donnée.
    */
    constructor() {
        try {
            this.db = new sqlite3.Database('./data/users.db', (err) => {
                if (err) {
                    console.error('Erreur lors de l’ouverture de la base de données', err);
                } else {
                    this.db.run(`CREATE TABLE IF NOT EXISTS users (
                        mail TEXT PRIMARY KEY NOT NULL,
                        password TEXT NOT NULL,
                        nom TEXT NOT NULL,
                        prenom TEXT NOT NULL,
                        qrcode TEXT NOT NULL
                    )`);
                }
            });
        } catch(error){
            console.log(error)
        }
    }

    // Insérer un utilisateur
    async insertUser(mail, password, nom, prenom) {
        password = await bcrypt.hash(password, 10);
        return new Promise((resolve, reject) => {
            const stmt = this.db.prepare("INSERT INTO users (mail, password, nom, prenom, qrcode) VALUES (?, ?, ?, ?, ?)");
            stmt.run(mail, password, nom, prenom, "", function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve({ id: this.lastID });
                }
            });
            stmt.finalize();
        });
    }

    updateUser(mail, password, nom, prenom, qrcode) {
        return new Promise((resolve, reject) => {

            const stmt = this.db.prepare("UPDATE users SET mail=?, password=?, nom=?, prenom=?, qrcode=? WHERE mail=?;");
        
            stmt.run(mail, password, nom, prenom, qrcode, mail, function(err) {
                if (err) {
                    reject(err);
                } else {
                    // Renvoie le nombre de lignes modifiées
                    resolve({ changes: this.changes });
                }
            });
        
            stmt.finalize();
        });        
    }

    updateUserQRCode(mail, qrcode) {
        return new Promise((resolve, reject) => {

            const stmt = this.db.prepare("UPDATE users SET mail=?, qrcode=? WHERE mail=?;");
        
            stmt.run(mail, qrcode, mail, function(err) {
                if (err) {
                    reject(err);
                } else {
                    // Renvoie le nombre de lignes modifiées
                    resolve({ changes: this.changes });
                }
            });
        
            stmt.finalize();
        });        
    }

    getUsers() {
        return new Promise((resolve, reject) => {
            this.db.all("SELECT * FROM users", [], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    async getUser(mail){
        let users = await this.getUsers()
        for(let user of users){
            if(user.mail === mail){
                return user
            }
        }
        return null
    }

    // Fermer la connexion à la base de données
    close() {
        this.db.close((err) => {
            if (err) {
                console.error('Erreur lors de la fermeture de la base de données', err);
            } else {
                console.log('Base de données fermée.');
            }
        });
    }
}

module.exports = UserDatabase