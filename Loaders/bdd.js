const mysql = require("mysql");

module.exports = async(client) => {
    let db = await mysql.createConnection(client.config.database);

    client.db = db;

    client.db.connect(() => {
        console.log("Base de donnée connectée avec succès");
    });

    
}