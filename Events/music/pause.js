const { ComponentType } = require("discord.js")
const { useQueue } = require("discord-player")

module.exports = {
    name: "pause",
    async run(interaction) {
        console.log("pause");
        await interaction.deferReply({ephemeral: false});
        const embed = new EmbedBuilder()
            .setTitle(`${interaction.client.config.info.botName} | Stop`).setTimestamp()
            .setFooter({
                text: interaction.client.config.info.footer,
                iconURL: interaction.client.config.info.avatar
            })

        const queue = useQueue(interaction.guild.id);
        if (!queue || !queue.isPlaying()){
            embed.setColor(interaction.client.config.color.red)
            embed.setDescription(`:x: Aucune musique et jouez par le bot !`)
            return await interaction.followUp({ embeds: [embed] })
        }

        if(queue.node.isPaused()){
            queue.node.resume();
            embed.setDescription("La musique a bien été reprise.")
        }else{
            queue.node.pause();
            embed.setDescription("La musique a bien été mise en pause.")
        }
        embed.setColor(interaction.client.config.color.blue)
    }
}