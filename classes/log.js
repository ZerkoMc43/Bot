const { EmbedBuilder } = require("discord.js");

module.exports = class SendLogs {
    constructor(log, logs) {
        this.log = log;
        this.logs = logs;
    };

    async SendLog(interaction, type, name, log){
        console.log(interaction);
        let logEmbed = new EmbedBuilder()
            .setTitle(`${interaction.client.config.info.botName} | Log`)
            .setColor(interaction.client.config.color.red)
            .setTimestamp()
            .setFooter({
                text: interaction.client.config.info.footer,
                iconURL: interaction.client.config.info.avatar
            })

        switch(type){
            case "Commandes":
                logEmbed.setDescription(`
                    > - Commands: ${log}
                `)
            break;
            
            case "deleteMsg":
                logEmbed.setDescription()
            break;
        }

        await interaction.client.channels.cache.get(interaction.client.config.info.support.logId).send({ embeds: [logEmbed] })
    };
}