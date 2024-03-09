const { Events } = require("discord.js");

module.exports = {
    name: Events.GuildDelete,
    async run(client, guild){
        try {
            deleteInvite(client, guild)
        } catch (error) {
            console.error("Erreur lors du traitement'':", error);
        }
    }
}

function deleteInvite(client, guild){
    client.invites.delete(guild.id);
}