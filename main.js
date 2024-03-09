const { Client, IntentsBitField, Collection } = require("discord.js");
const { Player } = require("discord-player");
const { Eventes} = require("./Loaders/loader");
const database = require("./Loaders/bdd");
const mysql = require("mysql");
const loadCommands = require("./Loaders/loadCommands");
const client = new Client({ intents: new IntentsBitField(3276799)});

client.config = require("./Config/bot");
client.commands = new Collection();
client.snipes = new Map()
client.invites = new Collection();

client.player = new Player(client, {
    ytdlOptions: {
        filter: "audioonly",
        quality: "highestaudio",
        highWaterMark: 1 << 25
    }
});

client.player.extractors.loadDefault();

//client.player.extractors.loadDefault((ext) => ext !== 'YouTubeExtractor');

loadCommands(client)
database(client);
Eventes(client).then(r => {});
client.login(client.config.token).then(async (err) => {
}).catch((err) => console.log(err))
client.on('error', (err) => {
    console.log(err)
});