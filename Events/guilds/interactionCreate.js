const { InteractionType, Events, ChannelType, PermissionFlagsBits, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js");
const { QueryType } = require("discord-player");
const SendLogs = require("../../classes/log");

module.exports = {
    name: Events.InteractionCreate,
    async run(client, interaction){
        const log = new SendLogs(interaction, (name, log) => {})
        //await log.SendLog(interaction, interaction.guild.name, "Command ping")
        const embed = new EmbedBuilder()
        .setFooter({
            text: client.config.info.footer,
            iconURL: client.config.info.avatar
        })
        .setTimestamp()
        if(interaction.type === InteractionType.ApplicationCommand){
            const commandes = client.commands.get(interaction.commandName)
            //commandes.run(client, interaction, interaction.options)
            commandes.run(interaction)
           
        }
    
        if(interaction.type === InteractionType.ApplicationCommandAutocomplete) {
            let entry = interaction.options.getFocused()
            if(interaction.commandName === "help"){
                let choices = client.commands.filter(cmd => cmd.name.includes(entry))
                await interaction.respond(entry === "" ? client.commands.map(cmd => ({name: cmd.name, value: cmd.name})) : choices.map(async choice => ({ name: choice })))
            }
            
            
            if (interaction.commandName === "play") {
                const resultsSpotify = await client.player.search(entry, { searchEngine: QueryType.SPOTIFY_SEARCH });
                const resultsYouTube = await client.player.search(entry, { searchEngine: QueryType.YOUTUBE });
        
                const tracksSpotify = resultsSpotify.tracks.slice(0, 5).map((track) => ({ name: `Spotify : ${`${track.title} - ${track.author}`.length > 75 ? `${`${track.title} - ${track.author}`.substring(0, 75)}...` : `${track.title} - ${track.author}`}`, value: track.url }));
                const tracksYouTube = resultsYouTube.tracks.slice(0, 5).map((track) => ({ name: `YouTube : ${`${track.title} - ${track.author}`.length > 75 ? `${`${track.title} - ${track.author}`.substring(0, 75)}...` : `${track.title} - ${track.author}`}`, value: track.url }));
                
                const tracks = [];
                tracksSpotify.forEach((t) => tracks.push({ name: t.name, value: t.value }));
                tracksYouTube.forEach((t) => tracks.push({ name: t.name, value: t.value }));   
                    try{
                        return await interaction.respond(tracks);   
                    } catch (err) {
                        if(err.message === 'Unknown interaction') throw err;
                        return console.log(`[Autocomplete ERROR] - ${interaction.commandName}`, err);
                    }
                }
        }

        //Ticket
        if(interaction.customId === "support"){
            const exist = interaction.guild.channels.cache.find(c => c.topic === interaction.user.id);
            if(exist){
                embed.setTitle(":ticket: Ticket")
                embed.setDescription(client.config.color.red)
                embed.setDescription(`:x: Vous avez déjà un d'ouvert sur ce serveur`)
                return interaction.reply({ embeds: [embed] , ephemeral: true})
            }
            const createChannel = await interaction.guild.channels.create({
                name: `ticket-${interaction.user.username}`,
                topic: interaction.user.id,
                parent: interaction.channel.parent.id,
                type: ChannelType.GuildText,
                permissionOverwrites: [
                    {
                        id: interaction.guild.id,
                        deny: [
                            PermissionFlagsBits.ViewChannel,
                        ]
                    },
                    {
                        id: interaction.user.id,
                        allow: [
                            PermissionFlagsBits.ViewChannel,
                            PermissionFlagsBits.SendMessages,
                            PermissionFlagsBits.ReadMessageHistory
                        ]
                    }
                ]
            });
            embed.setTitle(`:ticket: Ticket`)
            embed.setColor(client.config.color.blue)
            embed.setDescription(`Merci d'avoir un ticket. Veuillez bien détailler votre signalement.\nUn staff vas prendre en compte votre ticket au plus vite.`)
            const closeBtn = new ButtonBuilder()
                .setEmoji('🔒')
                .setLabel("Fermer le ticket")
                .setStyle(ButtonStyle.Danger)
                .setCustomId("close")
            const row = new ActionRowBuilder().addComponents(closeBtn);
            await createChannel.send({ embeds: [embed], components: [row]})
            await interaction.reply({ content: `Votre ticket à été crée avec succès: <#${createChannel.id}>`, ephemeral: true})
        }

        if(interaction.customId === "close"){
            let user = interaction.client.users.cache.get(interaction.channel.topic);
            await interaction.channel.delete(interaction.channel.id);
            try{

                embed.setTitle(`:ticket: Ticket`)
                embed.setColor(client.config.color.blue)
                embed.setDescription(`Votre ticket à été fermé par: <@${interaction.user.id}>`)
                await user.send({embeds: [embed]})
            }catch(err){
                console.log(`L'utilisateur: ${user.username} n'accepte pas les message priver !`);
            }
        }
    }
}