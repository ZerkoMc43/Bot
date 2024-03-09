const { SlashCommandBuilder, PermissionFlagsBits, ChannelType, EmbedBuilder, ButtonStyle, ButtonBuilder, ActionRowBuilder } = require("discord.js");


module.exports = {
    data: new SlashCommandBuilder()
    .setName("ticket")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .setDescription("Evoie l'embed des ticket dans le channel séléctionnée.")
    .setDMPermission(false)
    .addChannelOption(opt => 
        opt.setName("channel")
        .setDescription("Séléctionne un salon.")
        .addChannelTypes(ChannelType.GuildText)
        .setRequired(true)
    ),
    category: "Ticket",
    async run(interaction){
        const channel = interaction.options.getChannel("channel");
        if(!channel) return;
        const embed = new EmbedBuilder()
            .setTitle(`:ticket: Ouvrir un ticket`).setTimestamp()
            .setColor(interaction.client.config.color.blue)
            .setDescription(`Cliquez sur les bouttons ci-dessous pour créer un ticket\n**Note :** Tout création de ticket jugé inutile sera fermé et l\'auteur sera sanctionné`)
            .setFooter({
                text: interaction.client.config.info.footer,
                iconURL: interaction.client.config.info.avatar
            })
        const supportBtn = new ButtonBuilder()
            .setCustomId("support")
            .setLabel("Support")
            .setEmoji("☎")
            .setStyle(ButtonStyle.Primary)

        const row = new ActionRowBuilder().addComponents(supportBtn);
        await channel.send({embeds: [embed], components: [row]});
        embed.setDescription(`Les ticket son disponible dans le channel: ${channel.name}`)
        embed.setColor(interaction.client.config.color.blue)
        await interaction.reply({ embeds: [embed]})
    }
}