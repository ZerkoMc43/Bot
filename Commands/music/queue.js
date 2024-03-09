const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const { useMainPlayer, useQueue, QueueRepeatMode } = require("discord-player");
const Pagination = require("../../classes/Pagination");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("queue")
        .setDescription("Retourner la file d'attente de la musique")
        .setDMPermission(false),
        category: "Musiques",
    async run(interaction)  {
        //await interaction.deferReply({ephemeral: true});
        const embed = new EmbedBuilder()
            //.setTitle(`${interaction.client.config.info.botName} | Queue`)
            .setTimestamp()
            .setFooter({
                text: interaction.client.config.info.footer,
                iconURL: interaction.client.config.info.avatar
            })

        const queue = useQueue(interaction.guild.id)
        if(!queue || !queue.isPlaying()){
            embed.setColor(interaction.client.config.color.red)
            embed.setDescription(`:x: Aucune musique et jouez par le bot !`)
            return await interaction.reply({ embeds: [embed] })
        }
        if(!queue.history.nextTrack){
            embed.setColor(interaction.client.config.color.red)
            embed.setDescription(`:x: Il n'y a pas de musique après celle-ci`)
            return await interaction.reply({ embeds: [embed] })
        }

        const embeds = [];

        for(let i = 0; i < queue.tracks.data.length; i++){
            const CustomEmbed = new EmbedBuilder()
                .setColor(interaction.client.config.color.blue)
                .setTitle(`${interaction.client.config.info.botName} | Musique N°${i+1}/${queue.tracks.data.length}`)
                .setTimestamp()
                .setFooter({
                    text: interaction.client.config.info.footer,
                    iconURL: interaction.client.config.info.avatar
                })
            embeds.push(CustomEmbed);
        }
        
        const loop = queue.repeatMode === QueueRepeatMode.QUEUE ? "queue" : queue.repeatMode === QueueRepeatMode.TRACK ? "track" : "off";

        try{
            const pagination = new Pagination(embeds, (embed, index) => 
            embed.setDescription(`
                **Loop**: ${loop},
                **Musique**: ${queue.tracks.data[index].title ?? "Je n'est pas trouvez le nom !"},
                **Auteur**: ${queue.tracks.data[index].author ?? "Je n'est pas trouvez l'autheur' !"},
                **Duration**: ${queue.tracks.data[index].duration ?? "Je n'est pas trouvez la durée !"},
                **Source**: ${queue.tracks.data[index].source ?? "Je n'est pas trouvez la source de la musique !"},
    
                **Ajoutée par**: ${queue.tracks.data[index].requestedBy.username ?? "!"}
            `)
            .setThumbnail(queue.tracks.data[index].thumbnail));
            await pagination.reply(interaction);
        }catch(err){
            console.log(err);
            await interaction.reply({ content: 'Une erreur est survenue:', err})
        }
    }
}