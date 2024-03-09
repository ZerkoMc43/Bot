const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "playerError",
    async run(error){
        try {
            console.log(error);
        } catch(err){
            console.error('Erreur avec discord-player:', err);
        }
    }
}