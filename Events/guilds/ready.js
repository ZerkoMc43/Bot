const { useQueue } = require("discord-player");
const { Events, ActivityType, EmbedBuilder } = require("discord.js");
let round = 0;
const minRound = 0;
const maxRound = 3

module.exports = {
    name: Events.ClientReady,
    async run(client){

        try{
            await client.application.commands.set(client.commands.map(command => command.data)).then(() => console.log("Slash Command load"))
        }catch(err){
            console.log(err);
        }
        setInterval(async() => {
            if(round === maxRound) round = minRound;
            switch(round){
                case 0:
                    client.user.setActivity(`Je suis sur ${client.guilds.cache.size} serveurs.`);
                break;
    
                case 1:
                    client.user.setActivity(`${client.commands.size} Commandes`);
                break;
    
                case 2:
                    client.user.setActivity(`${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)} Utilisateurs`);
                break;
            }
            round++
        }, 2000* 3);
        console.log(`Je suis connecer sur le bot: ${client.user.tag}`);
        //client.user.setActivity("Zerkito", {type: ActivityType.Watching})

        // ANTI CRASH DB
        setInterval(() => {
            try{
                const db = client.db;
                db.query(`SELECT 1`, function(err, req){
                    console.log("mise à jours de la base de donnée !");
                })
                
            }catch(err){
                console.log(err);
            }
        }, 3600000);

        //setInterval(async() => {
            const inviteTraker = require("../../Modules/invite");
            try{
                (await inviteTraker)(client);
            }catch(err){
                console.log("Erreur:", err);
            }
        //}, )
    }
}