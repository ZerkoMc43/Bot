const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const { useQueue, QueueRepeatMode } = require("discord-player");


module.exports = {
    data: new SlashCommandBuilder()
        .setName("loop")
        .setDescription("Mes en boucle une musique ou la fil d'attente")
        .setDMPermission(false)
        .addStringOption(opt => 
            opt.setName("option")
            .setDescription("haha")
            .setRequired(true)
            .addChoices(
                { name: "Queue", value: "queue"},
                { name: "Track", value: "track"}
            )),
        category: "Musiques",
    async run(interaction)  {
        await interaction.deferReply({ephemeral: false});
        const embed = new EmbedBuilder()
            .setTitle(`${interaction.client.config.info.botName} | Loop`).setTimestamp()
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

        if(queue.history.nextTrack){
            embed.setColor(interaction.client.config.color.red)
            embed.setDescription(`:x: Il n'y a pas de musique après cette musique`)
        }

        const option = interaction.options.getString("option");
        if(option !== "track" && option !== "queue"){
            embed.setColor(interaction.client.config.color.red)
            embed.setDescription(`:x: Vous devez indiquer queue d'attente ou track !`)
        }

        switch(option){
            case "track":
                if(queue.repeatMode === 0){
                    queue.setRepeatMode(QueueRepeatMode.TRACK)
                    embed.setColor(interaction.client.config.color.blue)
                    embed.setDescription(`:white_check_mark: La boucle sur la piste a été configurée avec succès !`)
                    //embed.setDescription(`:white_check_mark: La boucle sur la piste a été mise en place avec succès`)
                }else{
                    queue.setRepeatMode(QueueRepeatMode.OFF)
                    embed.setColor(interaction.client.config.color.blue)
                    embed.setDescription(`:white_check_mark: La boucle sur la piste a été supprimée avec succès !`)
                }
            break;

            case "queue":
                if(queue.repeatMode === 0){
                    queue.setRepeatMode(QueueRepeatMode.QUEUE)
                    embed.setColor(interaction.client.config.color.blue)
                    embed.setDescription(`:white_check_mark: La boucle sur la queue a été configurée avec succès !`)
                }else{
                    queue.setRepeatMode(QueueRepeatMode.OFF)
                    embed.setColor(interaction.client.config.color.blue)
                    embed.setDescription(`:white_check_mark: La boucle sur la queue a été supprimée avec succès !`)
                }
            break;
        }


        await interaction.followUp({ embeds: [embed] })
    }
}