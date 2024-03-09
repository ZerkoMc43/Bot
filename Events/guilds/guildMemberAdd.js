const { EmbedBuilder, Events } = require("discord.js");

module.exports = {
    name: Events.GuildMemberAdd,
    async run(client, member){
        const db = client.db;
        const invites = client.invites;

        const newInvites = await member.guild.invites.fetch()
        let oldInvites = client.invites.get(member.guild.id);
        const invite = newInvites.find(i => {
            return i.uses > oldInvites.get(i.code);
        });
        if(!invite){
            return;
        }
        const inviter = await client.users.fetch(invite.inviter.id);

        const EmbedJoin = new EmbedBuilder()
            .setTitle(`${client.config.info.botName} | Bienvenue`)
            .setColor(client.config.color.blue)
            .addFields(
                {
                    name: "Bienvenue à toi:",
                    value: `**${member}**`,
                    inline: false
                },
                {
                    name: "Nous à rejoint le:",
                    value: `・<t:${parseInt(member.joinedTimestamp / 1000)}:f> - <t:${parseInt(member.joinedTimestamp / 1000)}:R>`,
                    inline: false
                },
                {
                    name: "Création du compte le:",
                    value: `・<t:${parseInt(member.user.createdTimestamp / 1000)}:f> - <t:${parseInt(member.user.createdTimestamp / 1000)}:R>`,
                    inline: false
                },
                {
                    name: "Invitée par:",
                    value: `<@${inviter.id}> avec ${invite.uses} invitation`
                }
            )
            .setThumbnail(member.user.displayAvatarURL({dynamic: true}))
            .setTimestamp()
            .setFooter({
                text: client.config.info.footer,
                iconURL: client.config.info.avatar
            })
        db.query(`SELECT * FROM server WHERE guild = '${member.guild.id}'`, async (err, req) => {
            if(req[0].bienvenueId < 1){
                console.log("Aucun channel définie");
            }else{
                const bienvenueId = client.channels.cache.get(req[0].bienvenueId);
                if(bienvenueId){
                    bienvenueId.send({ embeds: [EmbedJoin]})
                }
            }
        })
    }
}