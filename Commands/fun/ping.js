const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const SendLogs = require("../../classes/log");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Voir le ping")
        .setDMPermission(false),
        category: "Autres",
    run: async (interaction) => {
        const embed = new EmbedBuilder()
            .setTitle(`${interaction.client.config.info.botName} | Ping`)
            .setDescription("Calcul en cours.")
            .setTimestamp()
            .setColor(interaction.client.config.color.blue)
            .setFooter({
                text: interaction.client.config.info.footer,
                iconURL: interaction.client.config.info.avatar
            })
        await interaction.reply({ embeds: [embed] }).then((msg) => {
            embed.setDescription(`- Ping: ${interaction.client.ws.ping}`)
            msg.edit({embeds: [embed]});
        })
        //logs.push({name: interaction.guild.name, log: "Commande ping"})
        const log = new SendLogs(interaction, (name, log) => {})
        //await log.SendLog(interaction, interaction.guild.name, "Command ping")
    }
}