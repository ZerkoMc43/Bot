const { ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js");

const buttonStart = new ButtonBuilder()
.setCustomId("start")
.setEmoji("⏪")
.setStyle(ButtonStyle.Primary);

const buttonLeft = new ButtonBuilder()
.setCustomId("left")
.setEmoji("◀️")
.setStyle(ButtonStyle.Primary);

const buttonRight = new ButtonBuilder()
.setCustomId("right")
.setEmoji("▶️")
.setStyle(ButtonStyle.Primary);

const buttonEnd = new ButtonBuilder()
.setCustomId("end")
.setEmoji("⏩")
.setStyle(ButtonStyle.Primary);

function createActionRowComponent(...args){
    return new ActionRowBuilder().setComponents(args);
}

module.exports = class Pagination {
    constructor(embeds, embedEditOptions) {
        this.embeds = embeds;
        this.embedEditOptions = embedEditOptions ?? (e => e);
    };

    async reply(interaction){
        await interaction.deferReply();
        let index = 0;
        await interaction.followUp({
            embeds: [this.embedEditOptions(this.embeds[index], index)], 
            components: [createActionRowComponent(buttonStart.setDisabled(this.embeds.length === 1), buttonLeft.setDisabled(this.embeds.length === 1), buttonRight.setDisabled(this.embeds.length === 1), buttonEnd.setDisabled(this.embeds.length === 1))]
        })

        const filter = i => i.user.id === interaction.user.id;
        const collector = (await interaction.fetchReply()).createMessageComponentCollector({filter, time: 120000});

        collector.on("collect", async button => {
            switch(button.customId){
                case "start":
                    index = 0;
                break;

                case "left":
                    if(--index === -1) index = this.embeds.length -1;
                break;

                case "right":
                    if(++index === this.embeds.length) index = 0;
                break;

                case "end":
                    index = this.embeds.length -1
                break;
            };
            await interaction.editReply({embeds: [this.embedEditOptions(this.embeds[index], index)]});
            await button.deferUpdate();
        })

        collector.on("end", async () => {
            await interaction.editReply({embeds: [this.embedEditOptions(this.embeds[index], index)], components: []});
        })

    };
}