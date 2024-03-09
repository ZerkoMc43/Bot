const { EmbedBuilder, SlashCommandBuilder, AttachmentBuilder } = require("discord.js");
const Canvas = require("discord-canvas-easy")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("xp")
        .setDescription("Voir les xp que vous avez")
        .setDMPermission(false)
        .addUserOption(option =>
            option.setName('utilisateur')
                .setDescription("Voir les xp d'un utilisateur")
                .setRequired(false)
        ),
        category: "Informations",
    async run(interaction){

        const user = interaction.options.getUser("utilisateur");
        if(user){
            getUserXp(interaction, user);
        }else{
            getUserXp(interaction, interaction.user)
        }
    }
}

function getUserXp(interaction, user){
    const db = interaction.client.db;
    let embed = new EmbedBuilder()
        .setTitle(`${interaction.client.config.info.botName} | Suggestion`)
        .setTimestamp()
        .setFooter({
            text: interaction.client.config.info.footer,
            iconURL: interaction.client.config.info.avatar
        })
    db.query(`SELECT * FROM user_xp WHERE guild = '${interaction.guild.id}' AND user = '${user.id}'`, async(err, req) => {
        db.query(`SELECT * FROM user_xp WHERE guild = '${interaction.guild.id}'`, async(errs, all) => {
            if(req.length < 1){
                embed.setColor(interaction.client.config.color.red)
                embed.setDescription(`:x: Vous ou l'utilisateur ont pas d'xp`);
                return interaction.reply({ embeds: [embed], ephemeral: true})
            }else{
                const calculXp = (xp, level) => {
                    let total = 0;
                    for(let i = 0; i < level + 1; i++) total += i * 1000;
                    total += xp;
                    return total;
                }
                let leaderboard = await all.sort(async(a, b) => calculXp(parseInt(b.xp), parseInt(b.level)) - calculXp(parseInt(a.xp), parseInt(a.level)));
                let xp = parseInt(req[0].xp);
                let level = parseInt(req[0].level);
                let rank = leaderboard.findIndex(r => r.user === user.id) + 1;
                let need = (level + 1) * 1000;
                let card = await new Canvas.Card()
                    .setBackground("https://cdn.discordapp.com/attachments/717499849301295107/1067062390677577779/image.png?ex=65f8374a&is=65e5c24a&hm=2c781ccac775a66060aa7fe0f1c93a99258df3d9ae3c2830924b255a21a405d4&")
                    .setBot(interaction.client)
                    .setColorFont("#ffffff")
                    .setRank(rank)
                    .setUser(user)
                    .setGuild(interaction.guild)
                    .setXp(xp)
                    .setLevel(level)
                    .setXpNeed(need)
                    .toCard();

                await interaction.reply({
                    files: [new AttachmentBuilder(card.toBuffer(), {name: "rank.png"})]
                })
            }
        })
    })
}