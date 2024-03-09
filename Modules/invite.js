const { Collection } = require("discord.js");
const wait = require("timers/promises").setTimeout;

module.exports = async function(client){
    await wait(1000);
    client.guilds.cache.forEach(async (guild) => {
        const firstInvites = await guild.invites.fetch();
        client.invites.set(guild.id, new Collection(firstInvites.map((invite) => [invite.code, invite.uses])));
    });

    return module.exports;
}