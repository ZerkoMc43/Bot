const { Events, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js")

module.exports = {
    name: "playerStart",
    async run(client, queue, track){
        try{
            const embed = new EmbedBuilder()
            .setTitle(`${client.config.info.botName} | Musique`)
            .setTimestamp()
            .setFooter({
                text: client.config.info.footer,
                iconURL: client.config.info.avatar
            })

            embed.setColor(client.config.color.blue)
            embed.setThumbnail(track.thumbnail)
            embed.setDescription(`
                > - **Musique **: ${track.title},
                > - **Auteur**: ${track.author},
                > - **Duration**: ${track.duration},
                > - **Source**: ${track.source},

                > - **Ajoutée par**: ${track.requestedBy.username}
            `)
            await queue.metadata.channel.send({ embeds: [embed]})
        }catch(err){
            console.log(err);
        }
    }
}