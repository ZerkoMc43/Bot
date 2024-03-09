
const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const { useMainPlayer, useQueue, GuildQueue } = require("discord-player");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("stats")
        .setDescription("Stats")
        .setDMPermission(false),
        category: "Musiques",
    async run(interaction)  {
        await interaction.deferReply({ephemeral: false});
        const embed = new EmbedBuilder()
            .setTitle(`${interaction.client.config.info.botName} | Stats`).setTimestamp()
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

        
        let progess = await queue.node.createProgressBar();

        embed.setColor(interaction.client.config.color.blue)
        embed.setThumbnail(queue.history.currentTrack.thumbnail)
        embed.setDescription(`
            > - **Musique ajoutée dans la queues**: ${queue.history.currentTrack.title},
            > - **Auteur**: ${queue.history.currentTrack.title},
            > - **Duration**: ${queue.history.currentTrack.duration},
            > - **Source**: ${queue.history.currentTrack.source},
            > - **Ajoutée par**: ${queue.history.currentTrack.requestedBy.username},
            
            > - ${progess}
        `)
        await interaction.followUp({ embeds: [embed] })
    }
}