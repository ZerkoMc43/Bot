const { EmbedBuilder, SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { useMainPlayer, useQueue } = require("discord-player");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("save")
        .setDescription("Permet d'enregistrer une musique dans vos DM")
        .setDMPermission(false),
        category: "Musiques",
    async run(interaction)  {
        await interaction.deferReply({ephemeral: true});
        const embed = new EmbedBuilder()
            .setTitle(`${interaction.client.config.info.botName} | Enregistrement`)
            .setTimestamp()
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

        try{
            embed.setColor(interaction.client.config.color.red)
            embed.setThumbnail(queue.history.currentTrack.thumbnail)
            embed.setDescription(`
                > - **Musique**: ${queue.history.currentTrack.title},
                > - **Auteur**: ${queue.history.currentTrack.author},
                > - **Duration**: ${queue.history.currentTrack.duration},
                > - **Source**: ${queue.history.currentTrack.source},
                > - **Lien**: [Lien de la musique](${queue.history.currentTrack.url})

                > - **Ajoutée par**: ${queue.history.currentTrack.requestedBy.username}
            `);
            await interaction.followUp({ content: 'Message envoyée dans cos dm !'})
            await interaction.user.send({ embeds: [embed] })
        }catch(err){
            embed.setColor(interaction.client.config.color.red)
            embed.setDescription(`:x: Vos dm ne sont pas ouvert !`)
            await interaction.followUp({ embeds: [embed], ephemeral: true })
        }
    }
}
