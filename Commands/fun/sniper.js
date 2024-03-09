const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("sniper")
        .setDescription("Permet d'afficher la liste des derniers messages supprimés")
        .setDMPermission(false),
        category: "Autres",
    run: async (interaction) => {
        let messages = [];
        interaction.guild.channels.cache.forEach(channel => {
            const channels = interaction.client.snipes.get(channel.id);
            if(channels && channels.length > 0){
                messages.push(...channels);
            }
        })
        if(interaction.length < 1) return await interaction.reply({ text: "Aucun message supprimée récemment sur ce serveur !", ephemeral: true });
        const snipeEmbed = new EmbedBuilder()
        .setTitle(`${interaction.client.config.info.botName} | Snipe `)
        .setColor(interaction.client.config.color.red)
        .setAuthor({
            name: `${interaction.guild.name}`,
            iconURL: interaction.user.displayAvatarURL({dynamic: true})
        })
        .setFooter({
            text: interaction.client.config.info.footer,
            iconURL: interaction.client.config.info.avatar
        })

        messages.sort((a, b) => b.createdAt - a.createdAt)
        for(let i = 0; i < messages.length; i++){
            const msg = messages[i];
            const content = msg.attachments.size > 0 ? msg.attachments.first().url : msg.content;
            snipeEmbed.addFields(
                {
                    name: `Message n°${i + 1}`,
                    value: `\> **Auteur** : ${msg.author} \`${msg.author.username}\` \`(${msg.author.id})\`\n\> **Salon** : ${msg.channel} \`${msg.channel.name}\` \`(${msg.channel.id})\`\n\> **Date** : <t:${parseInt(msg.createdAt / 1000)}:F> (<t:${parseInt(msg.createdAt / 1000)}:R>)\n\> **Contenu** : ${content}`
                }
            )
        }

        interaction.reply({
            embeds: [snipeEmbed],
            ephemeral: true
        })
    }
}