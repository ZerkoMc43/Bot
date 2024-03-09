const { EmbedBuilder, PermissionFlagsBits, SlashCommandBuilder, ChannelType } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("setsuggestion")
    .setDescription("Configure le channel de suggestion.")
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addChannelOption(opt => 
      opt.setName("channel")
      .setDescription("Séléctionne un channel")
      .addChannelTypes(ChannelType.GuildText)
      .setRequired(true)
    ),
    category: "Administrations",
  async run(interaction){
    const db = interaction.client.db;
    const channels = interaction.options.getChannel("channel");
    const config = interaction.client.config;
        
    try {
      db.query(`SELECT * FROM server WHERE guild = '${interaction.guild.id}'`, async (err, req) => {
        if(req.length < 1){
            db.query(`INSERT INTO server (guild, suggestionId) VALUES ('${interaction.guild.id}', '${channels.id}')`)
        }else{
            db.query(`UPDATE server SET suggestionId = '${channels.id}' WHERE guild = '${interaction.guild.id}'`)
        }
      })
      const bienvenueEmbed = new EmbedBuilder()
        .setTitle(`${config.info.botName} | Suggestion`)
        .setThumbnail(interaction.client.user.displayAvatarURL({dynamic: true}))
        .setDescription(`Ce channel est désormais configuré pour recevoir les suggestions`)
        .setTimestamp()
        .setColor(config.color.blue)
        .setFooter({
          text: config.info.footer,
          iconURL: config.info.avatar
        })
        await interaction.reply({ content: 'Configuration en cours !', ephemeral: true})
        await channels.send({embeds: [bienvenueEmbed]})
    } catch (error) {
      console.error("Erreur lors du traitement de la commande 'suggestion':", error);
      interaction.channel.send("Une erreur est survenue lors du traitement de votre demande.");
    }
  }
}