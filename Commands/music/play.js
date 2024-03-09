const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const { useMainPlayer } = require("discord-player");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("play")
        .setDescription("Ecoutée de la musique")
        .setDMPermission(false)
        .addStringOption(opt => opt.setName("song").setDescription("Nom de musique").setRequired(true).setAutocomplete(true)),
        category: "Musiques",
    async run(interaction)  {
        await interaction.deferReply({ephemeral: true});

        const embed = new EmbedBuilder()
            .setTitle(`${interaction.client.config.info.botName} | Musique`).setTimestamp()
            .setFooter({
                text: interaction.client.config.info.footer,
                iconURL: interaction.client.config.info.avatar
            })

        const song = interaction.options.getString("song");
        const voiceChannelMember = interaction.member.voice.channel;
        const voiceChannelBot = (await interaction.guild.members.fetchMe()).voice.channel;
        if(!voiceChannelMember) {
            embed.setColor(interaction.client.config.color.red)
            embed.setDescription(":x: Vous devez êtres dans un salon vocal !")
            return await interaction.followUp({ embeds: [embed], ephemeral: true})
        }
        if(voiceChannelBot && voiceChannelBot.id !== voiceChannelMember.id){
            embed.setColor(interaction.client.config.color.red)
            embed.setDescription(":x: Le bot joue de la musique dans un autre salon !")
            return await interaction.followUp({ embeds: [embed], ephemeral: true })
        }
        
        try{
            const { track } = await interaction.client.player.play(voiceChannelMember, song, {
                requestedBy: interaction.user,
                nodeOptions: {
                    metadata: interaction,
                    volume: 50
                }
            });
            embed.setColor(interaction.client.config.color.blue)
            embed.setThumbnail(track.thumbnail)
            embed.setDescription(`
                > - **Musique ajoutée dans la queues**: ${track.title},
                > - **Auteur**: ${track.author},
                > - **Duration**: ${track.duration},
                > - **Source**: ${track.source},

                > - **Ajoutée par**: ${track.requestedBy.username}
            `)
        await interaction.followUp({ embeds: [embed], ephemeral: false })

        } catch(err){
            embed.setColor(interaction.client.config.color.red)
            embed.setDescription(`:x: Une erreur et survenue`, err)
            interaction.channel.send({ embeds: [embed], ephemeral: true })
            console.error('Erreur avec discord-player:', err);
        }
    }
}