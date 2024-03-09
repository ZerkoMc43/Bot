const { EmbedBuilder, SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { useMainPlayer, useQueue } = require("discord-player");
const { lyricsExtractor } = require("@discord-player/extractor");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("lyrics")
        .setDescription("Permet d'obtenir les paroles de la musique actuelle")
        .setDMPermission(false),
        category: "Musiques",
    async run(interaction)  {
        await interaction.deferReply({ephemeral: true});
        const embed = new EmbedBuilder()
            .setTitle(`${interaction.client.config.info.botName} | Lyrics`)
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
            const paroles = await lyricsExtractor().search(`${queue.currentTrack.title} ${queue.currentTrack.author}`);
            
            const lines = paroles.lyrics.split("\n");
            const pageSize = 1000;
            const pages = [];
            let currentPage = "";

            for(const line of lines){
                if((currentPage + line).length <= pageSize){
                    currentPage += line + "\n";
                }else{
                    pages.push(currentPage);
                    currentPage = line + "\n";
                }
            }
            if(currentPage.length > 0){
                pages.push(currentPage);
            }

            const embedLyrics = pages.map((page, index) => new EmbedBuilder()
                .setColor(interaction.client.config.color.blue)
                .setTitle(`${interaction.client.config.info.botName} | Lyrics ${index + 1}/${pages.length}`)
                .setDescription(page)
                .setTimestamp()
                .setFooter({
                    text: interaction.client.config.info.footer,
                    iconURL: interaction.client.config.info.avatar
                })
            );

            let currentPageIndex = 0;

            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId("previous")
                        .setLabel("Précédent")
                        .setStyle(ButtonStyle.Primary)
                        .setDisabled(true),
                    new ButtonBuilder()
                        .setCustomId("next")
                        .setLabel("Suivant")
                        .setStyle(ButtonStyle.Primary)
                )
            const message = await interaction.followUp({
                embeds: [embedLyrics[currentPageIndex]],
                components: [row]
            });

            const collector = message.createMessageComponentCollector();

            collector.on("collect", async(interaction) => {
                if(interaction.customId === "previous"){
                    currentPageIndex = Math.max(0, currentPageIndex - 1)
                }else if(interaction.customId === "next"){
                    currentPageIndex = Math.min(pages.length - 1, currentPageIndex + 1);
                }
                row.components[0].setDisabled(currentPageIndex === 0);
                row.components[1].setDisabled(currentPageIndex === pages.length - 1);

                await interaction.update({
                    embeds: [embedLyrics[currentPageIndex]],
                    components: [row]
                })
            })
        }catch(err){
            await interaction.followUp({ content: ":x: Le lyrics de cette musique n'existe pas ou je ne la trouve pas !", ephemeral: true});
        }
    }
}
