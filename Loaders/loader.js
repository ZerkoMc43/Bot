const { readdirSync } = require("fs");

const Eventes = async client => {
    const dirsEvents = readdirSync("./Events/");
    for(const dirs of dirsEvents){
        const filesDirs = readdirSync(`./Events/${dirs}/`).filter(f => f.endsWith(".js"));
        for(const files of filesDirs){
            const event = require(`../Events/${dirs}/${files}`);
            if(dirs === "music") {
                client.player.events.on(event.name, (...args) => event.run(client, ...args));
                console.log(`[${dirs}] > ${event.name}`);
            }else{
                client.on(event.name, (...args) => event.run(client, ...args));
                console.log(`[${dirs}] > ${event.name}`);
            }
        }
    }
}


module.exports = {
    Eventes
}