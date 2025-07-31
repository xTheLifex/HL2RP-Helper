const { SlashCommandBuilder, Client, Events, GatewayIntentBits } = require('discord.js');
const { PermissionFlagsBits } = require('discord-api-types/v10');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('deny')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
        .setDescription('Formats your message into an rejection format')
        .addStringOption(option =>
            option.setName('reason')
                .setDescription("The reason for denial.")
                .setRequired(true)
        )
    ,
    async execute(interaction) {
        const reason = interaction.options.getString('reason');
        const embeds = [];
        
        await interaction.reply({
            "content": "",
            "tts": false,
            "embeds": [
                {
                    "description": "# Denied\n\n**Your submission has been reviewed and denied by our staff team.**\n\nSpecified Reason:\n```" + reason + "```",
                    "color": 16711680,
                    "fields": [],
                    "thumbnail": {
                        "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Cross_red_circle.svg/512px-Cross_red_circle.svg.png"
                    },
                    "footer": {
                        "text": "Denied by Staff Team"
                    },
                    "timestamp": new Date().toISOString()
                }
            ],
        });
    }
};