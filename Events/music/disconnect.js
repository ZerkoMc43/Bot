const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "disconnect",
    async run(client, queue, track){
        const embed = new EmbedBuilder()
            .setTitle(`${client.config.info.botName} | Musique`)
            .setColor(client.config.color.blue)
            .setDescription(`
                > - Plus de chansons dans la file d'attente :x:
            `)
        .setTimestamp()
        .setFooter({
            text: client.config.info.footer,
            iconURL: client.config.info.avatar
        })
        queue.metadata.channel.send({ embeds: [embed]});
    }
}