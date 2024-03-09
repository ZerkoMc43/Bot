const { Events, ChannelType, EmbedBuilder } = require("discord.js");

module.exports = {
    name: Events.MessageDelete,
    async run(client, message){
        if(message.channel.type === ChannelType.DM || message.author.bot) return;
        if(client.snipes.get(message.channel.id)){
            const messages = client.snipes.get(message.channel.id);
            if(messages.length >= 10){
                messages.shift()
            }
            messages.push(message);
            await client.snipes.set(message.channel.id, messages)
        }else{
            await client.snipes.set(message.channel.id, [message])
        }
        client.db.query(`SELECT * FROM server WHERE guild = '${message.guild.id}'`, async (err, req) => {
            if(req[0].logsId < 1){
                console.log("Aucun salon log définie !");
            }else{
                const channelId = client.channels.cache.get(req[0].logsId);
                if(channelId){
                    const content = message.attachments.size > 0 ? message.attachments.first().url : message.content;
                    let embed = new EmbedBuilder()
                        .setTitle(`${client.config.info.botName} | Log`)
                        
                        .setColor(client.config.color.blue)
                        .setTimestamp()
                        .setDescription(`
                            > - Salon: ${message.channel}
                            > - Date: <t:${parseInt(message.createdAt / 1000)}:F> (<t:${parseInt(message.createdAt / 1000)}:R>)

                            > - Contenu: ${content}
                            > - Supprimer par: ${message.author}
                        `)
                        .setFooter({
                            text: client.config.info.footer,
                            iconURL: client.config.info.avatar
                        })
                    await channelId.send({ embeds: [embed]})
                }
            }
        })
    }
}