const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const { useMainPlayer, useQueue } = require("discord-player");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("pause")
        .setDescription("Pause ou reprise de la musique")
        .setDMPermission(false),
        category: "Musiques",
    async run(interaction)  {
        await interaction.deferReply({ephemeral: false});
        const embed = new EmbedBuilder()
            .setTitle(`${interaction.client.config.info.botName} | Pause ou Reprise`).setTimestamp()
            .setFooter({
                text: interaction.client.config.info.footer,
                iconURL: interaction.client.config.info.avatar
            })
        
        const voiceChannelMember = interaction.member.voice.channel;
        const voiceChannelBot = (await interaction.guild.members.fetchMe()).voice.channel;
        if(!voiceChannelMember) {
            embed.setColor(interaction.client.config.color.red)
            embed.setDescription(":x: Vous devez êtres dans un salon vocal !")
            return await interaction.followUp({ embeds: [embed] })
        }
        if(voiceChannelBot && voiceChannelBot.id !== voiceChannelMember.id){
            embed.setColor(interaction.client.config.color.red)
            embed.setDescription(":x: Le bot joue de la musique dans un autre salon !")
            return await interaction.followUp({ embeds: [embed] })
        }

        const queue = useQueue(interaction.guild.id)
        if(!queue || !queue.isPlaying()){
            embed.setColor(interaction.client.config.color.red)
            embed.setDescription(`:x: Aucune musique et jouez par le bot !`)
            return await interaction.followUp({ embeds: [embed] })
        }

        if(queue.node.isPaused()){
            queue.node.resume();
            embed.setDescription(`**La musique a reprend !**`)
        }else{
            queue.node.pause();
            embed.setDescription(`**La musique est mise en pause**`)
        }

        embed.setColor(interaction.client.config.color.blue)

        await interaction.followUp({ embeds: [embed] })
    }
}