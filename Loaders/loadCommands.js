const { readdirSync } = require("fs");

module.exports = client => {
    let count = 0;
    const dirsCommands = readdirSync("./Commands/");
    for(const dirs of dirsCommands){
        const filesDirs = readdirSync(`./Commands/${dirs}/`);
        for(const files of filesDirs){
            const command = require(`../Commands/${dirs}/${files}`);
            client.commands.set(command.data.name, command);
            count++;
        };
    };
    console.log(`\x1b[35m[\x1b[mCommandes\x1b[35m]\x1b[m | J'ai enregistrer ${count} commandes.`);
}