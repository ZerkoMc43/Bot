const { EmbedBuilder, SlashCommandBuilder, AttachmentBuilder } = require("discord.js");
const Canvas = require("discord-canvas-easy")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("topxp")
        .setDescription("Classement de l'experience du serveur")
        .setDMPermission(false),
        category: "Informations",
    async run(interaction){
        let embed = new EmbedBuilder()
        .setTitle(`${interaction.client.config.info.botName} | Suggestion`)
        .setTimestamp()
        .setFooter({
            text: interaction.client.config.info.footer,
            iconURL: interaction.client.config.info.avatar
        })
        let db = interaction.client.db;
        db.query(`SELECT * FROM user_xp WHERE guild = '${interaction.guild.id}'`, async(err, req) => {
            if(req.length < 1){
                embed.setColor(interaction.client.config.color.red)
                embed.setDescription(`:x: Ce serveur et inactif, pas d'xp.`);
                return interaction.reply({ embeds: [embed], ephemeral: true})
            }else{
                const calculXp = (xp, level) => {
                    let total = 0;
                    for(let i = 0; i < level + 1; i++) total += i * 1000;
                    total += xp;
                    return total;
                }
                let leaderboard = await req.sort(async(a, b) => calculXp(parseInt(b.xp), parseInt(b.level)) - calculXp(parseInt(a.xp), parseInt(a.level)));
                const lead = await new Canvas.Leaderboard()
                    .setBot(interaction.client)
                    .setGuild(interaction.guild)
                    .setBackground("https://www.science-et-vie.com/wp-content/uploads/scienceetvie/2022/01/la-terre-pourrait-devenir-une-planete-morte-plus-vite-que-prevu-scaled.jpg")
                    .setColorFont("#FFFFFF")
                for(let i = 0; i < (req.length > 10 ? 10 : req.length); i++){
                    
                    let need = (leaderboard[i].level + 1) * 1000;
                    await lead.addUser(await interaction.client.users.fetch(leaderboard[i].user), parseInt(leaderboard[i].level), parseInt(leaderboard[i].xp), (parseInt(leaderboard[i].level) + 1) + 1000) 
                }
                const card = await lead.toLeaderboard();
                await interaction.reply({ files: [new AttachmentBuilder(card.toBuffer(), {name: "lead.png"})]});
            }

        })
    }
}