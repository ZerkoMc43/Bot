const { EmbedBuilder, PermissionFlagsBits, SlashCommandBuilder, ChannelType } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("setlogs")
    .setDescription("Configure le channel de log.")
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
    const name = interaction.guild.name;
    const guildId = interaction.guild.id;
    const config = interaction.client.config;
    const logsId = channels.id;
    const vip = false;
        
    try {
      db.query(`SELECT * FROM server WHERE guild = '${guildId}'`, async (err, req) => {
        if(req.length < 1){
          db.query(`INSERT INTO server (name, guild, logsId, vip) VALUES ('${name}', '${guildId}', '${logsId}', '${vip}')`)
          console.log("Log create");
        }else{
          db.query(`UPDATE server SET logsId = '${logsId}' WHERE guild = '${guildId}'`)
          console.log("Log update");
        }
      })
      const logEmbed = new EmbedBuilder()
        .setTitle(`${config.info.botName} | Logs`)
        .setThumbnail(interaction.client.user.displayAvatarURL({dynamic: true}))
        .setDescription(`Ce channel est désormais configuré pour recevoir les logs`)
        .setTimestamp()
        .setColor(config.color.blue)
        .setFooter({
          text: config.info.footer,
          iconURL: config.info.avatar
        })
        await interaction.reply({ content: 'Configuration en cours !', ephemeral: true})
        await channels.send({embeds: [logEmbed]})
    } catch (error) {
      console.error("Erreur lors du traitement de la commande 'setbienvenue':", error);
      interaction.channel.send("Une erreur est survenue lors du traitement de votre demande.");
    }
  }
}