const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("suggestion")
        .setDescription("Crée des suggestion")
        .setDMPermission(false)
        .addStringOption(option =>
            option.setName('suggestion')
                .setDescription('Veuillez saisir votre suggestion.')
                .setRequired(false)
        ),
        category: "Informations",
    async run(interaction){
        const sugg = interaction.options.getString("suggestion")
        let embed = new EmbedBuilder()
            .setTitle(`${interaction.client.config.info.botName} | Suggestion`)
            .setTimestamp()
            .setFooter({
                text: interaction.client.config.info.footer,
                iconURL: interaction.client.config.info.avatar
            })

        if(!sugg){
            embed.setColor(interaction.client.config.color.red)
            embed.setDescription(`
                > - :x: Merci de saisir une suggestion !
            `);
            return await interaction.reply({ embeds: [embed] })
        }

        interaction.client.db.query(`SELECT * FROM server WHERE guild = '${interaction.guild.id}'`, async (err, req) => {
            if(req[0].suggestionId < 1){
                console.log("Aucun salon log définie !");
                await interaction.reply({ content: `:x: Les suggestion n'ont pas été configurée !`, ephemeral: true})
            }else{
                const channelId = interaction.client.channels.cache.get(req[0].suggestionId);
                if(channelId){
                embed.setColor(interaction.client.config.color.blue)
                    embed.setDescription(`
                        > - **Ajouter par**: ${interaction.user.username}
                        > - **Suggestion**: ${sugg}
                    `)
                    channelId.send({ embeds: [embed]}).then(msg => {
                        msg.react(`✅`);
                        msg.react(`❎`);
                        msg.startThread({
                            name: `Suggestion de: ${interaction.user.username}`
                        })
                    })
                    await interaction.reply({ content: `:white_check_mark: Envoi de votre suggestion.`, ephemeral: true})
                }else{
                    await interaction.reply({ content: `:x: Les suggestion n'ont pas été configurée !`, ephemeral: true})
                }
            }
        })
    }
}