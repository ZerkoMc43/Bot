const { ChannelType, Events, EmbedBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    name: Events.InviteDelete,
    async run(client, invite){
        client.invites.get(invite.guild.id).delete(invite.code);
    }
}