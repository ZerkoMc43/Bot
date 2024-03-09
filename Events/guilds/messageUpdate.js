const { Events, ChannelType, EmbedBuilder } = require("discord.js");

module.exports = {
    name: Events.MessageUpdate,
    async run(client, oldMessage, newMessage){
        if(newMessage.content.match(/(https::discord.gg|.gg|discord.gg|tg|connard|fdp|ntm|nique ta mere|nique ta mère|Pute|pute)/i)){
            if(newMessage.guild.channels.cache.find(c => c.topic === message.author.id)){

            }else{
                if(!newMessage.member.permissions.has(PermissionFlagsBits.Administrator)){
                    newMessage.delete()
                    const ProtectionEmbed = new EmbedBuilder()
                        .setTitle(`${client.config.info.botName} | Protection`)
                        .setDescription(`<@${message.author.id}> Tu utilise des mots interdit !`)
                        .setColor(client.config.color.red)
                        .setFooter({
                            text: client.config.info.footer,
                            iconURL: client.config.info.avatar
                        })
                        .setTimestamp()
                    return newMessage.channel.send({ embeds: [ProtectionEmbed] })
                }
            }
        }
    }
}