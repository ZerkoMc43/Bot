const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("info")
        .setDescription("Vous donne des information sur le serveur du bot et celui-ci.")
        .setDMPermission(false),
        category: "Informations",
    async run(interaction){
        let createdBot = `<t:${Math.floor(interaction.client.user.createdTimestamp / 1000)}:F>`;
        let createdServer = `<t:${Math.floor(interaction.guild.createdTimestamp / 1000)}:F>`;
        let memberallServer = interaction.client.guilds.cache.reduce((a, g) => a + g.memberCount, 0);

        let boost = interaction.guild.premiumSubscriptionCount;
        let bot = interaction.guild.members.cache.filter(member => member.user.bot).size;
        let member = interaction.guild.members.cache.filter(member => !member.user.bot).size;

        let helpEmbed = new EmbedBuilder()
            .setTitle(`${interaction.client.config.info.botName} | Information `)
            .setColor(interaction.client.config.color.blue)
            .setDescription(`
                > **Owner**: <@${interaction.guild.ownerId}>.
                > **Création du serveur**: ${createdServer}.
                > **Nombre(s) de boost**: ${boost}.
                > **Bot**: ${bot}.
                > **Membre(s)**: ${member}.
            `)
            .setTimestamp()
            .setFooter({
                text: interaction.client.config.info.footer,
                iconURL: interaction.client.config.info.avatar
            })
        return await interaction.reply({ embeds: [helpEmbed], ephemeral: true})
    }
}