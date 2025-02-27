const sqlite3 = require('sqlite3').verbose();
const bcrypt = require("bcryptjs");
const { createTOTP } = require('../totp/TOTP');

class TOTPDatabase {
    /*
        On initialise la base de donnée.
    */
    constructor() {
        try {
            this.db = new sqlite3.Database('./data/totp.db', (err) => {
                if (err) {
                    console.error('Erreur lors de l’ouverture de la base de données', err);
                } else {
                    this.db.run(`CREATE TABLE IF NOT EXISTS totp (
                        mail TEXT PRIMARY KEY NOT NULL,
                        totp TEXT NOT NULL
                    )`);
                }
            });
        } catch(error){
            console.log(error)
        }
    }

    // Insérer un totp
    async insertTOTP(mail, totp) {
        return new Promise((resolve, reject) => {
            const stmt = this.db.prepare("INSERT INTO totp (mail, totp) VALUES (?, ?)");
            stmt.run(mail, totp, "", function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve({ id: this.lastID });
                }
            });
            stmt.finalize();
        });
    }

    updateTOTP(mail, totp) {
        return new Promise((resolve, reject) => {

            const stmt = this.db.prepare("UPDATE totp SET mail=?, totp=? WHERE mail=?;");
        
            stmt.run(mail, totp, mail, function(err) {
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

    getAllTOTP() {
        return new Promise((resolve, reject) => {
            this.db.all("SELECT * FROM totp", [], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    async getTOTP(mail){
        let totps = await this.getAllTOTP()
        for(let totp of totps){
            if(totp.mail === mail){
                return totp.totp
            }
        }
        let totp = createTOTP(mail)
        await this.insertTOTP(mail, totp.toString())
        return totp.toString()
    }

    async getNewTOTP(mail){
        await this.getTOTP(mail)
        let totp = createTOTP(mail)
        await this.updateTOTP(mail, totp.toString())
        return totp.toString()
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

module.exports = TOTPDatabase