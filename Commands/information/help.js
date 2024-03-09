const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("Information concernant les commands")
        .setDMPermission(true),
        category: "Informations",
    async run(interaction){
        if(interaction.options.getString("commande")){
            let command = interaction.client.commands.get(message.options.getString("commande"));
            let helpEmbeds = new EmbedBuilder()
                .setTitle(`${interaction.client.config.info.botName} | Information concernant la command`)
                .setColor(interaction.client.config.color.blue)
                .setDescription(`
                    > **Nom de la commande**: ${command.name},
                    > **Description de la command**: ${command.description},
                    > **Categorie**: ${command.category}.
                `)
                .setTimestamp()
                .setFooter({
                    text: interaction.client.config.info.footer,
                    iconURL: interaction.client.config.info.avatar
                })
                await interaction.reply({ embeds: [helpEmbeds]})
        }else{
            let cat = [];
            interaction.client.commands.forEach(command => {
                if(!cat.includes(command.category)) cat.push(command.category);
            });
            let helpEmbed = new EmbedBuilder()
                .setTitle(`${interaction.client.config.info.botName} | Information des commandes`)
                .setColor(interaction.client.config.color.blue)
                .setTimestamp()
                .setFooter({
                    text: interaction.client.config.info.footer,
                    iconURL: interaction.client.config.info.avatar
                })
                for(CmdCat of cat){
                    helpEmbed.addFields(
                        {
                            name: `**${CmdCat}**:`,
                            value: `\`\`\`${interaction.client.commands.filter(cc => cc.category === CmdCat).map(cmd => cmd.data.name + ` - ` + cmd.data.description).join(`\n`)}\`\`\``
                        }
                    )
                }
            await interaction.reply({ embeds: [helpEmbed]})
        }
    }
}