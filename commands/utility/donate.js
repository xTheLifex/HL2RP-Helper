const { SlashCommandBuilder, Client, Events, GatewayIntentBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('donate')
        .setDescription('Replies with donation information'),
    async execute(interaction) {
        await interaction.reply({
            "content": "",
            "tts": false,
            "embeds": [
                {
                    "id": 652627557,
                    "title": "Interested in donating?",
                    "description": "*We appreciate our donors, and reward them.*\n\nView our [Donation Page](https://ko-fi.com/undetermined/shop) to view all items available for purchase.\nYou can buy **all whitelists**, or specific whitelists **without applying** for anything!\n\nBy donating, you help keeping the server alive.",
                    "color": 11215851,
                    "fields": []
                }
            ],
            "components": [],
            "actions": {}
        });
    },
};