const { ChannelType, Events, EmbedBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    name: Events.MessageCreate,
    async run(client, message){
        if (message.author.bot || message.channel.type === ChannelType.DM) return;
        addXp(client, message);
        lock(client, message);
        
    }
}

function addXp(client, message){
    const db = client.db;
    db.query(`SELECT * FROM user_xp WHERE guild = '${message.guild.id}' AND user = '${message.author.id}'`, async (err, req) => {
        if(req.length < 1){
            db.query(`INSERT INTO user_xp (guild, user, xp, level) VALUES ('${message.guild.id}', '${message.author.id}', '0', '0')`);
        }else{
            let level = parseInt(req[0].level);
            let xp = parseInt(req[0].xp);
            if((level + 1) * 1000 <= xp){
                db.query(`UPDATE user_xp SET xp = '${xp - ((level + 1) * 1000)}' WHERE guild = '${message.guild.id}' AND user = '${message.author.id}'`);
                db.query(`UPDATE user_xp SET level = '${level + 1}' WHERE guild = '${message.guild.id}' AND user = '${message.author.id}'`);
                await message.channel.send({ content: `Félicitations ${message.user.id} vous venez de passer un niveau, Vous êtes maintenant level ${level + 1} :tada:` })
            }else{
                let xpToGive = Math.floor(Math.random() * 25) + 1;
                db.query(`UPDATE user_xp SET xp = '${xp + xpToGive}' WHERE guild = '${message.guild.id}' AND user = '${message.author.id}'`);
            }
        }
    })
}

function lock(client, message){
    if(message.content.match(/(https::discord.gg|.gg|discord.gg|tg|connard|fdp|ntm|nique ta mere|nique ta mère|Pute|pute)/i)){
        if(!message.member.permissions.has(PermissionFlagsBits.Administrator)){
            message.delete()
            const ProtectionEmbed = new EmbedBuilder()
                .setTitle(`${client.config.info.botName} | Protection`)
                .setDescription(`<@${message.author.id}> Tu utilise des mots interdit !`)
                .setColor(client.config.color.red)
                .setFooter({
                    text: client.config.info.footer,
                    iconURL: client.config.info.avatar
                })
                .setTimestamp()
            return message.channel.send({ embeds: [ProtectionEmbed] })
        }    
    }
}