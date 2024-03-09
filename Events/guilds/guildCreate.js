const { Events } = require("discord.js");

module.exports = {
    name: Events.GuildCreate,
    async run(client, guild){
        try {
            addMysql(client, guild);
            createInvite(client, guild);
        } catch (error) {
            console.error("Erreur lors du traitement'':", error);
        }
    }
}

function createInvite(client, guild){
    guild.invites.fetch().then(guildInvite => {
        client.invites.set(guild.id, new Map(guildInvite.map((invite) => [invite.code, invite.uses])));
    })
}

function addMysql(client, guild){
    const name = guild.name
    const vip = false
    const db = client.db;
    db.query(`SELECT * FROM server WHERE guild = '${guild.id}' `, async (err, req) => {
        if(req.length < 1) {
            db.query(`INSERT INTO server (guild, name, vip) VALUES ('${guild.id}', '${name}', '${vip}')`)
            console.log(`\x1b[35m[\x1b[mINSERT\x1b[35m]\x1b[m | ${name}`);
        }else{
            db.query(`UPDATE server SET name = '${name}' WHERE guild = '${guild.id}'`)
            console.log(`\x1b[35m[\x1b[mUPDATE\x1b[35m]\x1b[m | ${name}`);
        }
    })
}