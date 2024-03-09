const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "playerSkip",
    async run(client, queue, track){
        const embed = new EmbedBuilder()
            .setTitle(`${client.config.info.botName} | Skip`)
            .setColor(client.config.color.blue)
            .setThumbnail(queue.history.nextTrack.thumbnail)
            .setDescription(`
                > - **Musique**: ${queue.history.nextTrack.title},
                > - **Duration**: ${queue.history.nextTrack.duration},
                > - **Source**: ${queue.history.nextTrack.source},

                > - **Ajoutée par**: ${queue.history.nextTrack.requestedBy.username}
            `)
        .setTimestamp()
        .setFooter({
            text: client.config.info.footer,
            iconURL: client.config.info.avatar
        })
        queue.metadata.channel.send({ embeds: [embed]});
    }
}