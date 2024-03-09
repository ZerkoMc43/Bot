const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("botinfo")
    .setDescription("Vous donne des information sur le serveur du bot et celui-ci.")
    .setDMPermission(false),
    category: "Informations",
    async run(interaction) {
        let commands
        if(!commands){
            let categories = [];
            interaction.client.commands.forEach(cmd => {
                if(!categories.includes(cmd.category)) categories.push(cmd.name)
            })
        }
        const embed = new EmbedBuilder()
            .setTitle(`${interaction.client.config.info.botName} | Bot Info`)
            .setColor(interaction.client.config.color.blue)
            .setThumbnail(interaction.client.user.displayAvatarURL({dynamic: true}))
            .setDescription(`
                __Information du bot__
                > **Owner**: ${interaction.client.config.info.owner}
                > **Création du bot**: <t:${Math.floor(interaction.client.user.createdTimestamp / 1000)}:F>
                > **Update**: ${Math.round(interaction.client.uptime / (1000 * 60 * 60)) + "h " + (Math.round(interaction.client.uptime / (1000 * 60)) % 60) + "m " + (Math.round(interaction.client.uptime / 1000) % 60) + "s "}
                > **Support**: [Rejoindre ?](${interaction.client.config.info.support.discord})

                __Autres informations__
                > **Serveurs**: ${interaction.client.guilds.cache.size}
                > **Membres**: ${interaction.client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)}
                > **Commandes**: ${interaction.client.commands.size}
            `)
            .setTimestamp()
            .setFooter({
                text: interaction.client.config.info.footer,
                iconURL: interaction.client.config.info.avatar
            })
        interaction.reply({ embeds: [embed]});
    }
}