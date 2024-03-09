const { EmbedBuilder } = require("discord.js");
const { Player } = require("discord-player");

const { useMainPlayer } = require("discord-player/dist");

module.exports = async (client) => {

    /*client.player = new Player(client, {
        ytdlOptions: {
            filter: "audioonly",
            quality: "highestaudio",
            highWaterMark: 1 << 25
        }
    });
    client.player.extractors.loadDefault();*/

    const player = new Player(client, {
        ytdlOptions: {
            filter: "audioonly",
            quality: "highestaudio",
            highWaterMark: 1 << 25
        }
    });
    //await player.extractors.loadDefault((ext) => ext !== 'YouTubeExtractor');
    await player.extractors.loadDefault();
    client.player = useMainPlayer()
}