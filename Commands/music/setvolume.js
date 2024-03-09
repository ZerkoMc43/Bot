const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const ms = require("ms")
const { useMainPlayer, useQueue, Track } = require("discord-player");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("setvolume")
        .setDescription("Régler le volume de la musique")
        .setDMPermission(false)
        .addNumberOption(opt => opt.setName("volume").setDescription("Diminue ou Augment le volume").setMinValue(1).setMaxValue(100).setRequired(true)),
        category: "Musiques",
    async run(interaction)  {
        await interaction.deferReply({ephemeral: false});
        const embed = new EmbedBuilder()
            .setTitle(`${interaction.client.config.info.botName} | Volume`).setTimestamp()
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

        const volume = interaction.options.getNumber("volume");

        if(queue.node.volume === volume){
            embed.setColor(interaction.client.config.color.red)
            embed.setDescription(`:x: Le volume est déjà de ${queue.node.volume}%`)
            return await interaction.followUp({ embeds: [embed] })
        }

        queue.node.setVolume(volume);
        embed.setColor(interaction.client.config.color.blue)
        embed.setDescription(`:white_check_mark: Le volume est maintenant à ${queue.node.volume}%`)
        return await interaction.followUp({ embeds: [embed] })
    }
}