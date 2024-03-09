const { PermissionFlagsBits } = require("discord-api-types/v10");
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Ban un utilisateur")
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
    .addUserOption(option =>
        option.setName('utilisateur')
            .setDescription('Le membre à bannir')
            .setRequired(true)
    )
    .addStringOption(option =>
        option.setName('raison')
            .setDescription('La raison du bannissement')
            .setRequired(false)
    ),
    category: "Informations",
    async run(interaction) {
        const embed = new EmbedBuilder()
            .setTitle(`${interaction.client.config.info.botName} | Ban`)
            .setThumbnail(interaction.client.user.displayAvatarURL({dynamic: true}))
            .setTimestamp()
            .setFooter({
                text: interaction.client.config.info.footer,
                iconURL: interaction.client.config.info.avatar
            })
        const user = interaction.options.getUser("utilisateur");
        const member =  interaction.guild.members.cache.get(user.id);

        if(interaction.user.id === user.id) {
            embed.setColor(interaction.client.config.color.red)
            embed.setDescription(":x: Vous pouvez pas faire ceci !")
            return await interaction.reply({ embeds: [embed], ephemeral: true})
        }

        if(interaction.user.ownerId === user.id) {
            embed.setColor(interaction.client.config.color.red)
            embed.setDescription(":x: Vous pouvez pas ban le cette utilisateur car elle posséde la courrone !")
            return await interaction.reply({ embeds: [embed], ephemeral: true})
        }

        if(member && !member.bannable){
            embed.setColor(interaction.client.config.color.red)
            embed.setDescription(":x: Je ne peux pas bannir cette utilisateur !")
            return await interaction.reply({ embeds: [embed], ephemeral: true})
        }

        if(member && interaction.member.roles.highest.comparePositionTo(member.roles.highest) <= 0){
            embed.setColor(interaction.client.config.color.red)
            embed.setDescription(":x: Vous ne pouvez pas bannir cette utilisateur, car il à un rôle supérieur !")
            return await interaction.reply({ embeds: [embed], ephemeral: true})
        }

        if((await interaction.guild.bans.fetch()).get(user.id)){
            embed.setColor(interaction.client.config.color.red)
            embed.setDescription(":x: Cette utilisateur est déjà banni !")
            return await interaction.reply({ embeds: [embed], ephemeral: true})
        }

        const reason = interaction.options.getString("raison") || "Pas de raison fournie !";
        embed.setColor(interaction.client.config.color.blue)
        embed.setDescription(`
            > - Vous avez banni:
            > - **Utilisateur**: <@${user.id}>
            > - **Banni par**: ${interaction.user.tag},
            > - **Raison**: ${reason}.
        `)
        interaction.reply({embeds: [embed]})
        try{
            embed.setColor(interaction.client.config.color.blue)
            embed.setDescription(`
                > - Vous avez été banni:
                 > - **Serveur**: ${interaction.guild.name},
                 > - **Banni par**: ${interaction.user.tag},
                 > - **Raison**: ${reason}.
            `)
            await user.send({ embeds: [embed] })
        }catch(err){
        }
        //interaction.guild.bans.create(user.id, { reason: `Ban par: ${interaction.user.tag}. Raison: ${reason}`})
    }
}