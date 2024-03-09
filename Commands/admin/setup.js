const { EmbedBuilder, SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("setup")
        .setDescription("Configure le serveur")
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
        category: "Administrations",
    async run(interaction){
        const guild = interaction.guild;
        const config = interaction.client.config;
        const name = guild.name;
        const vip = false;
        const db = interaction.client.db;

        try {
            db.query(`SELECT * FROM server WHERE guild = '${interaction.guild.id}' `, async (err, req) => {
                if(req.length < 1) {
                    db.query(`INSERT INTO server (guild, name, vip) VALUES ('${interaction.guild.id}', '${name}', '${vip}')`)
                    const messageActivé = new EmbedBuilder()
                        .setTitle(`${config.info.botName}`)
                        .setThumbnail(interaction.client.user.displayAvatarURL({dynamic: true}))
                        .setDescription(`Enregistrement de votre server`)
                        .addFields({ name: `**ID**:`, value: `- ${interaction.guild.id}` }, { name: "**VIP**:", value: `- Non`})
                        .setTimestamp()
                        .setColor(config.color.blue)
                        .setFooter({
                            text: interaction.client.config.info.footer,
                            iconURL: interaction.client.config.info.avatar
                        })
                    await interaction.reply({embeds: [messageActivé], ephemeral: true})
                } else {
                    interaction.reply({ content: `:x: Votre serveur est déjà enregistrée, si le problème perciste contact le support.`, ephemeral: true});
                }
            })
            
          } catch (error) {
            console.error("Erreur lors du traitement de la commande 'modevacance':", error);
            interaction.channel.send("Une erreur est survenue lors du traitement de votre demande.");
          }
    }
}