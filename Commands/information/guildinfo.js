const { log } = require("console");
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("guild")
    .setDescription("Cette command seul le createur peux l'executer. List des serveur ou et le bot.")
    .setDMPermission(false),
    category: "Informations",
    async run(interaction) {

        const embed = new EmbedBuilder()
            .setTitle(`${interaction.client.config.info.botName} | Guild`)
            .setThumbnail(interaction.client.user.displayAvatarURL({dynamic: true}))
            
            .setTimestamp()
            .setFooter({
                text: interaction.client.config.info.footer,
                iconURL: interaction.client.config.info.avatar
            })
        if(interaction.user.id === "195954240559120386"){
            let guild = [];
            interaction.client.guilds.cache.forEach(g => {
                guild.push({name: `**${g.name}**`, value: `**Ajoutée le**: <t:${parseInt(g.joinedTimestamp / 1000)}:f> **Il y'a** <t:${parseInt(g.joinedTimestamp / 1000)}:R>`})
            })

            embed.addFields(guild)
            embed.setColor(interaction.client.config.color.blue)
        }else{
            embed.setColor(interaction.client.config.color.red)
            embed.setDescription(":x: Seul le createur du bot peux éxécutée cette commandes.")
        }
        
        interaction.reply({ embeds: [embed], ephemeral: true });
    }
}